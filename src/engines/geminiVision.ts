/**
 * Mode B: Optional Gemini Flash Vision integration via Cloudflare Pages Function.
 * Includes automatic timeout and seamless client fallback to Mode A.
 */

export interface VisionAnalysisResponse {
  flavorNote?: string;
  recommendedShader?: 'cherenkov' | 'sem' | 'synchrotron' | 'halide';
}

export async function queryGeminiVisionAnalysis(
  imageBase64: string,
  studentName: string,
  elementName?: string
): Promise<VisionAnalysisResponse | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch('/api/analyze-vision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        studentName,
        elementName,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data && typeof data.flavorNote === 'string') {
      // Enforce strict antislop rule: strip any em dashes
      let sanitized = data.flavorNote.replace(/—/g, ', ').replace(/--/g, ', ');

      // Ensure official chemical element name is used for any "Element <Word>" or "Specimen <Word>"
      if (elementName) {
        sanitized = sanitized.replace(/\bElement\s+[A-Za-z]+\b/g, `Element ${elementName}`);
        sanitized = sanitized.replace(/\bSpecimen\s+[A-Za-z]+\b/g, `Specimen ${elementName}`);
      }

      return {
        flavorNote: sanitized,
        recommendedShader: data.recommendedShader,
      };
    }
    return null;
  } catch {
    // Network failure, timeout, or local environment without Cloudflare function
    return null;
  }
}
