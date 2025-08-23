// api/room.js
export default async function handler(req, res) {
  // CORS (nếu bạn sẽ gọi từ domain khác)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const hoten = (req.query.hoten || '').toString();
  if (!hoten) return res.status(400).json({ ok: false, error: 'Thiếu họ tên' });

  const url = `${process.env.GAS_URL}?action=room&hoten=${encodeURIComponent(hoten)}`;

  try {
    const r = await fetch(url, { method: 'GET' });
    // Apps Script của bạn trả JSON khi KHÔNG có callback
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Proxy error: ' + e.message });
  }
}
