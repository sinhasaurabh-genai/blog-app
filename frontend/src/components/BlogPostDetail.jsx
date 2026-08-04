import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

useEffect(() => {
    const fetchPostById = async () => {
        try {
            const result = await api.getPost(id)
            setPost(result)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    fetchPostById()
}, [id])


  async function handleDelete() {
    setDeleting(true);
    try {
      await api.deletePost(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  if (loading) return <p className="status">Loading post…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p className="error">Post not found.</p>;

  return (
    <article className="post-detail">
      <Link to="/" className="back-link">
        ← Back to posts
      </Link>
      <h1>{post.title}</h1>
      <div className="post-content">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <div className="post-actions">
        <Link to={`/posts/${id}/edit`}>
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </article>
  );
}

