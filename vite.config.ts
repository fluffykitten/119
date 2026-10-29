import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// Development server middleware simulating the Cloudflare Pages Function (/api/wall) during 'npm run dev'
function localCloudflareWallMock(): Plugin {
  const devStorageFile = path.resolve(process.cwd(), '.dev-wall-storage.json');

  const loadStorage = (): Record<string, any[]> => {
    try {
      if (fs.existsSync(devStorageFile)) {
        return JSON.parse(fs.readFileSync(devStorageFile, 'utf-8'));
      }
    } catch {}
    return {};
  };

  const saveStorage = (data: Record<string, any[]>) => {
    try {
      fs.writeFileSync(devStorageFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch {}
  };

  return {
    name: 'local-cloudflare-wall-mock',
    configureServer(server) {
      server.middlewares.use('/api/wall', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const parsedUrl = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const room = (parsedUrl.searchParams.get('room') || 'DEFAULT').toUpperCase().trim();

        if (req.method === 'GET') {
          const store = loadStorage();
          const roomRoster = store[room] || [];
          res.statusCode = 200;
          res.end(JSON.stringify(roomRoster));
          return;
        }

        if (req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const targetRoom = (body.room || 'DEFAULT').toUpperCase().trim();
              const element = body.element;

              if (!element || !element.id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing element payload' }));
                return;
              }

              const store = loadStorage();
              let roster = store[targetRoom] || [];
              const idx = roster.findIndex((e: any) => e.id === element.id);
              if (idx >= 0) {
                roster[idx] = element;
              } else {
                roster.unshift(element);
              }
              if (roster.length > 200) {
                roster = roster.slice(0, 200);
              }
              store[targetRoom] = roster;
              saveStorage(store);

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, count: roster.length }));
            } catch (err: unknown) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Internal Server Error' }));
            }
          });
          return;
        }

        if (req.method === 'DELETE') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const targetRoom = (body.room || 'DEFAULT').toUpperCase().trim();
              const elementId = body.elementId;

              if (!elementId) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing elementId' }));
                return;
              }

              const store = loadStorage();
              let roster = store[targetRoom] || [];
              roster = roster.filter((e: any) => e.id !== elementId);
              store[targetRoom] = roster;
              saveStorage(store);

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, count: roster.length }));
            } catch (err: unknown) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Internal Server Error' }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      });
    },
  };
}

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
    plugins: [react(), localCloudflareWallMock(), localCloudflareVisionMock(apiKey)],
  };
});
