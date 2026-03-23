import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'PATCH') return new Response('Method Not Allowed', { status: 405 });
  try {
    const { id, read } = await req.json();
    const store = getStore('feedback');
    const val = await store.get(id);
    if (!val) {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404, headers: { 'Content-Type': 'application/json' },
      });
    }
    const item = { ...JSON.parse(val), read };
    await store.set(id, JSON.stringify(item));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/feedback-update' };
