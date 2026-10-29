import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

// Development server middleware simulating the Cloudflare Pages Function during 'npm run dev'
function localCloudflareVisionMock(apiKey?: string): Plugin {
  return {
    name: 'local-cloudflare-vision-mock',
    configureServer(server) {
      server.middlewares.use('/api/analyze-vision', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        const key = apiKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
        if (!key) {
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'GEMINI_API_KEY not set in local environment' }));
          return;
        }

        // Collect request body
        let bodyStr = '';
        req.on('data', (chunk) => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          try {
            const parsedBody = JSON.parse(bodyStr || '{}');
            const { imageBase64, studentName } = parsedBody;

            if (!imageBase64) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing imageBase64' }));
              return;
            }

            const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

            const promptText = `You are an official IUPAC laboratory synthesis inspector and IGCSE / AS-Level Chemistry teacher.
A student named "${studentName || 'Student'}" has just been synthesized into a new superheavy chemical element (Z >= 119).
Look at their portrait photo. Write exactly 1-2 witty, curriculum-grounded observational field notes reacting to their visual appearance (e.g., spectacles, facial expression, posture, lighting) combined with authentic Cambridge chemistry terms (e.g., optical refraction index, meniscus alignment, exothermic enthalpy, Le Chatelier shifts, lone pairs, flame emission spectra).
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
              const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
              const apiRes = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiPayload),
              });

              if (apiRes.ok) {
                const resJson = (await apiRes.json()) as {
                  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
                };
                const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (rawText) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(rawText);
                  return;
                }
              } else {
                lastError = await apiRes.text();
              }
            }

            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Gemini API call failed across candidate models', details: lastError }));
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Internal Server Error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: message }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;

  return {
    plugins: [react(), localCloudflareVisionMock(apiKey)],
  };
});
