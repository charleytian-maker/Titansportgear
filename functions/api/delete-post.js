export async function onRequestPost(context) {
  const { request, env } = context;
  const { slug, password } = await request.json();

  if (password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ success: false, error: 'Wrong password' }), { status: 401 });
  }

  if (!slug) {
    return new Response(JSON.stringify({ success: false, error: 'Missing slug' }), { status: 400 });
  }

  await env.DB.prepare('DELETE FROM posts WHERE slug = ?').bind(slug).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}