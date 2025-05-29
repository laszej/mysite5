import { useState } from 'react';

export default function PostEditor({ onSuccess = () => {} }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, slug, content }),
      });

      if (!res.ok) throw new Error('Błąd zapisu');

      onSuccess(slug); // np. przekierowanie albo info, że się udało
      setTitle('');
      setSlug('');
      setContent('');
    } catch (err) {
      alert('Błąd podczas zapisu posta');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <label>Tytuł:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <label>Slug (adres URL):</label>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        placeholder="np. laskowski-prezydent"
      />

      <label>Treść (Markdown lub HTML):</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={10}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Zapisuję...' : 'Zapisz artykuł'}
      </button>
    </form>
  );
}