import { useState, useEffect } from 'react';

const Comments = ({ collection }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [added, setAdded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting blog post', { title, content });
    
    try {
      const response = await fetch('/api/addblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, collection })
      });
    
      setAdded((prev) => !prev);
      setTitle('');
      setContent('');
    } 
      
    finally {
      console.log('Resetting loading state');
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/blogs?collection=${collection}`);
      const data = await res.json();
      console.log("use effect ran")
      setBlogs(data);
    }
    fetchData();
  }, [added]);

  return (
    <>
      <h3 style={{ textAlign: "center", marginTop:"1rem" }}>Zapraszam do komentowania!</h3>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection:"column", marginBottom: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <div>
              <p htmlFor="title">Autor: </p>
              <input style={{ width: "300px" }}
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div>
              <p style={{ marginTop: "1rem" }}>treść wiadomości: </p>
              <textarea style={{ width: "300px" }}
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Ładuje...' : 'Wyślij'}
            </button>
          </form>
        </div>
      </div>

      <div style={{ margin: "0 auto", maxWidth: "70%", display: "flex", flexDirection: "column-reverse" }}>
        {blogs.map((blog) => (
          <div className="card mb-3" key={blog._id}>
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comments;