export interface Env {
  WALL_KV?: KVNamespace;
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
}

const memoryStore = new Map<string, string>();

async function handleWallRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const room = (url.searchParams.get('room') || 'DEFAULT').toUpperCase().trim();
    try {
      let rosterJson = '[]';
      if (env.WALL_KV) {
        rosterJson = (await env.WALL_KV.get(`room:${room}`)) || '[]';
      } else {
        rosterJson = memoryStore.get(`room:${room}`) || '[]';
      }
      return new Response(rosterJson, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (method === 'POST') {
    try {
      const body = (await request.json()) as { room?: string; element?: any };
      const room = (body.room || 'DEFAULT').toUpperCase().trim();
      const newElement = body.element;

      if (!newElement || !newElement.id) {
        return new Response(JSON.stringify({ error: 'Missing element payload' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      let roster: any[] = [];
      if (env.WALL_KV) {
        const existing = await env.WALL_KV.get(`room:${room}`);
        if (existing) {
          try {
            roster = JSON.parse(existing);
          } catch {
            roster = [];
          }
        }
      } else {
        const existing = memoryStore.get(`room:${room}`);
        if (existing) {
          try {
            roster = JSON.parse(existing);
          } catch {
            roster = [];
          }
        }
      }

      const existingIndex = roster.findIndex((e) => e.id === newElement.id);
      if (existingIndex >= 0) {
        roster[existingIndex] = newElement;
      } else {
        roster.unshift(newElement);
      }

      if (roster.length > 200) {
        roster = roster.slice(0, 200);
      }

      const rosterString = JSON.stringify(roster);
      if (env.WALL_KV) {
        await env.WALL_KV.put(`room:${room}`, rosterString);
      } else {
        memoryStore.set(`room:${room}`, rosterString);
      }

      return new Response(JSON.stringify({ success: true, count: roster.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (method === 'DELETE') {
    try {
      const body = (await request.json()) as { room?: string; elementId?: string };
      const room = (body.room || 'DEFAULT').toUpperCase().trim();
      const elementId = body.elementId;

      if (!elementId) {
        return new Response(JSON.stringify({ error: 'Missing elementId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      let roster: any[] = [];
      if (env.WALL_KV) {
        const existing = await env.WALL_KV.get(`room:${room}`);
        if (existing) {
          try {
            roster = JSON.parse(existing);
          } catch {
            roster = [];
          }
        }
      } else {
        const existing = memoryStore.get(`room:${room}`);
        if (existing) {
          try {
            roster = JSON.parse(existing);
          } catch {
            roster = [];
          }
        }
      }

      const filtered = roster.filter((e) => e.id !== elementId);
      const rosterString = JSON.stringify(filtered);

      if (env.WALL_KV) {
        await env.WALL_KV.put(`room:${room}`, rosterString);
      } else {
        memoryStore.set(`room:${room}`, rosterString);
      }

      return new Response(JSON.stringify({ success: true, count: filtered.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/wall') {
      return handleWallRequest(request, env);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
