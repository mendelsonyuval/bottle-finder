import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
  try {
    const store = getStore('feedback');
    const { blobs } = await store.list();
    const items = await Promise.all(
      blobs.map(async ({ key }) => {
        const val = await store.get(key);
        try { return JSON.parse(val); } catch { return null; }
      })
    );
    const sorted = items.filter(Boolean).sort((a, b) => b.ts - a.ts);
    return new Response(JSON.stringify(sorted), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/feedback-list' };
