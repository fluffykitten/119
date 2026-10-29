interface Env {
  GEMINI_API_KEY?: string;
}

interface RequestBody {
  imageBase64: string;
  studentName: string;
  elementName?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Server GEMINI_API_KEY not configured' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = (await context.request.json()) as RequestBody;
    const { imageBase64, studentName, elementName } = body;

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Missing imageBase64' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Strip data URL header if present
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const derivedElementName = elementName || (studentName ? studentName.trim().replace(/[^a-zA-Z]/g, '') + 'ium' : 'Studentium');

    const promptText = `You are an official IUPAC laboratory synthesis inspector and chemistry educator.
A student candidate named "${studentName || 'Student'}" has just been synthesized into a new superheavy chemical element officially named "${derivedElementName}" (Z >= 119).
Look at their portrait photo. Write exactly 1-2 witty, curriculum-grounded observational field notes reacting to their visual appearance (e.g., spectacles, facial expression, posture, lighting) combined with authentic chemistry concepts (e.g., optical refraction index, meniscus alignment, exothermic enthalpy, Le Chatelier shifts, lone pairs, flame emission spectra).
CRITICAL NAMING RULE: You MUST refer to the synthesized chemical element ONLY by its exact official name "Element ${derivedElementName}" (e.g. "Element ${derivedElementName} exhibits..."). Do NOT invent alternative Latin names (e.g. never say "Element Catus", "Element Felis", or "Element Cat"). Use strictly "Element ${derivedElementName}".
MANDATORY RULES:
1. STRICTLY DO NOT use any em dashes ("—") or double dashes ("--") anywhere in your response. Use commas, colons, or parentheses instead.
2. Keep it lighthearted, safe, and academically encouraging.
3. Output valid JSON in the exact format:
{
  "flavorNote": "string",
  "recommendedShader": "cherenkov" | "sem" | "synchrotron" | "halide"
}`;

    const geminiPayload = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: cleanBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    };

    // Primary model: gemini-3.5-flash-lite with fallback cascade
    const candidateModels = [
      'gemini-3.5-flash-lite',
      'gemini-2.5-flash-lite',
      'gemini-2.0-flash-lite',
      'gemini-2.5-flash',
      'gemini-1.5-flash',
    ];
    let lastError = 'No response';

    for (const model of candidateModels) {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const apiRes = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      });

      if (apiRes.ok) {
        const resJson = await apiRes.json();
        const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          try {
            const parsed = JSON.parse(rawText);
            if (parsed && typeof parsed.flavorNote === 'string') {
              // Sanitize em dashes and force correct element name
              let clean = parsed.flavorNote.replace(/—/g, ', ').replace(/--/g, ', ');
              clean = clean.replace(/\bElement\s+[A-Za-z]+\b/g, `Element ${derivedElementName}`);
              clean = clean.replace(/\bSpecimen\s+[A-Za-z]+\b/g, `Specimen ${derivedElementName}`);
              parsed.flavorNote = clean;
              return new Response(JSON.stringify(parsed), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
            }
          } catch {
            // If rawText wasn't pure JSON, return as-is
          }
          return new Response(rawText, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } else {
        lastError = await apiRes.text();
      }
    }

    return new Response(
      JSON.stringify({ error: 'Gemini API call failed', details: lastError }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
