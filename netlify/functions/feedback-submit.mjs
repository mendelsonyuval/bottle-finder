import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  try {
    const { message, email } = await req.json();
    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: 'Message required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }
    const store = getStore('feedback');
    const ts = Date.now();
    const id = `${ts}-${Math.random().toString(36).slice(2, 8)}`;
    await store.set(id, JSON.stringify({
      id, message: message.trim(), email: email?.trim() || '', ts, read: false,
    }));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/feedback' };
