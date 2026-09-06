export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) return new Response(JSON.stringify({error:'no file'}), {status:400});

  const ext = file.name.split('.').pop();
  const key = `blog/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  await env.ASSETS.put(key, file.stream(), {
    httpMetadata: { contentType: file.type }
  });

  const url = `https://img.titansportgear.com/${key}`;
  return new Response(JSON.stringify({ url }), {
    headers: { 'Content-Type': 'application/json' }
  });
}