import { useState, useEffect } from 'react'

const AdminComments = ({ collection }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/blogs?collection=${collection}`)
      const data = await res.json()
      setBlogs(data)
    }
    fetchData()
  }, [collection, refreshFlag])

  const handleDelete = async (id) => {
    const confirmed = confirm("Czy na pewno chcesz usunąć ten komentarz?")
    if (!confirmed) return

    setLoading(true)

    try {
      const res = await fetch(
        `/api/deleteblog?id=${id}&collection=${collection}`,
        { method: 'DELETE' }
      )

      const data = await res.json()
      console.log('Usunięto:', data)

      setRefreshFlag((prev) => !prev)
    } catch (error) {
      console.error('Błąd przy usuwaniu:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h3 className="text-center my-4">Komentarze ({collection})</h3>
      {loading && <p className="text-center text-muted">Trwa operacja...</p>}
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {blogs.map(blog => (
          <div className="card mb-3" key={blog._id}>
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.content}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(blog._id)}
                disabled={loading}
              >
                🗑️ Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminComments
