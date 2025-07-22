import { useState, useRef } from 'react';

export default function PostEditor({ onSuccess = () => {} }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      
      // Jeśli wybrano zdjęcie, przesyłamy je do Cloudinary
      if (fileInputRef.current.files[0]) {
        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);
        formData.append('upload_preset', 'twoj_upload_preset'); // Zastąp swoim presetem
        
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/twoj_cloud_name/image/upload`, // Zastąp swoim cloud name
          {
            method: 'POST',
            body: formData,
          }
        );
        
        if (!cloudinaryResponse.ok) {
          throw new Error('Błąd przesyłania obrazu');
        }
        
        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url;
      }

      // Zapis posta z URL zdjęcia w MongoDB
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          slug, 
          content, 
          imageUrl 
        }),
      });

      if (!res.ok) throw new Error('Błąd zapisu posta');

      onSuccess(slug);
      // Reset formularza
      setTitle('');
      setSlug('');
      setContent('');
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert('Błąd podczas zapisu posta: ' + err.message);
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

      <label>Obrazek (opcjonalnie):</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      
      {previewImage && (
        <div style={{ marginBottom: '1rem' }}>
          <img 
            src={previewImage} 
            alt="Podgląd" 
            style={{ maxWidth: '100%', maxHeight: '200px' }} 
          />
        </div>
      )}

      <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Zapisuję...' : 'Zapisz artykuł'}
      </button>
    </form>
  );
}