export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    'authToken=; HttpOnly; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
  res.status(200).json({ message: 'Wylogowano pomyślnie' });
}
