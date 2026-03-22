import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'DELETE') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const store = getStore('events');
    const { blobs } = await store.list();
    await Promise.all(blobs.map(({ key }) => store.delete(key)));
    return new Response(JSON.stringify({ ok: true, deleted: blobs.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/clear' };
