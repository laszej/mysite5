import { useState, useEffect } from 'react';
import styles from './simplechat.module.css';

function SimpleChatApp() {

  useEffect(() => {
    const storedNickname = JSON.parse(localStorage.getItem('nickname'));
    if (storedNickname) {
      setAuthor(storedNickname);
      
    }
  }, []);

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/posts");
        if (!response.ok) {
          throw new Error(`An error has occured: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setPosts(data.posts);
        console.log(posts)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  const addPost = async () => {
    if (author.trim() === '' || content.trim() === '') {
      setContent('Proszę wypełnić wszystkie pola');
      return;
    }
  
    try {
      const obj = {
        id: `${Math.floor(Math.random() * 1000000000000000)}`,
        author,
        content,
      };
      const response = await fetch("api/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        setAuthor(author);
        setContent('');
        localStorage.setItem('nickname', JSON.stringify(author));
        setNickname(author);
        setPosts([...posts, obj]);
      } else {
        setContent('Nie udało się dodać posta, spróbuj ponownie.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`api/post${id}`, {
        method: 'DELETE',
      });
      const filteredPosts = posts.filter((post) => post.id !== id);
      setPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <h1 style={{textAlign: "center", color: "steelblue"}}>Simple Chat App</h1>
    <div className={styles.main}>
      
    
        <div className={styles.container}>
          <p style={{padding: "0.5rem", marginLeft: "15px", fontWeight:"bold", border: "none"}}>Podaj swój nick</p>
          <input
            type="text"
            className={styles.author}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <p style={{padding: "0.5rem", marginLeft: "15px", fontWeight:"bold"}}>wpisz wiadomość</p>
          <textarea
            type="text"
            className={styles.content}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addPost();
              }
            }}
          />
          <button className={styles.button} onClick={addPost}>
            <p style={{margin: "auto"}}>Dodaj komentarz</p>
          </button>
        </div>

       

        <div className={styles.posts}>
          {posts.map((post) => (
            <div className={styles.pudełko} key={post.id}>
              <p>Id: {post.id}</p>
              <p className>Autor wiadomości:</p>
              <p className>{post.author}</p>
              <p className>Treść wiadomości:</p>
              <p className>{post.content}</p>
              {nickname === "laszej" && (
                <button
                  className={styles.deleteButton}
                  onClick={() => deletePost(post.id)}
                >
                  Usuń
                </button>
              )}
            </div>
          ))}
          </div>
        
      
    </div>
    </>
  );
}

export default SimpleChatApp;
