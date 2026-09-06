export async function onRequestPost(context) {
  const { request, env } = context;
  const { slug, lang, password } = await request.json();

  if (password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ success: false, error: 'Wrong password' }), { status: 401 });
  }

  if (!slug || !lang) {
    return new Response(JSON.stringify({ success: false, error: 'Missing slug or lang' }), { status: 400 });
  }

  await env.DB.prepare('DELETE FROM posts WHERE slug = ? AND lang = ?').bind(slug, lang).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}