interface Env {
  WALL_KV?: KVNamespace;
}

// In-memory fallback for local development or before KV binding is configured in Cloudflare
const memoryStore = new Map<string, string>();

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const room = (url.searchParams.get('room') || 'DEFAULT').toUpperCase().trim();

  try {
    let rosterJson = '[]';
    if (context.env.WALL_KV) {
      rosterJson = (await context.env.WALL_KV.get(`room:${room}`)) || '[]';
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
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as { room?: string; element?: any };
    const room = (body.room || 'DEFAULT').toUpperCase().trim();
    const newElement = body.element;

    if (!newElement || !newElement.id) {
      return new Response(JSON.stringify({ error: 'Missing element payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let roster: any[] = [];
    if (context.env.WALL_KV) {
      const existing = await context.env.WALL_KV.get(`room:${room}`);
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

    // Upsert element (by id)
    const existingIndex = roster.findIndex((e) => e.id === newElement.id);
    if (existingIndex >= 0) {
      roster[existingIndex] = newElement;
    } else {
      roster.unshift(newElement);
    }

    // Limit to 200 elements per room for clean performance and storage
    if (roster.length > 200) {
      roster = roster.slice(0, 200);
    }

    const rosterString = JSON.stringify(roster);
    if (context.env.WALL_KV) {
      await context.env.WALL_KV.put(`room:${room}`, rosterString);
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
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as { room?: string; elementId?: string };
    const room = (body.room || 'DEFAULT').toUpperCase().trim();
    const elementId = body.elementId;

    if (!elementId) {
      return new Response(JSON.stringify({ error: 'Missing elementId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let roster: any[] = [];
    if (context.env.WALL_KV) {
      const existing = await context.env.WALL_KV.get(`room:${room}`);
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

    if (context.env.WALL_KV) {
      await context.env.WALL_KV.put(`room:${room}`, rosterString);
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
};
