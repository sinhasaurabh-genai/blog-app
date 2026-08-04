import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { api } from "../api/client"
import GenerateDraftForm from '../components/GenerateDraftForm';

export default function BlogPostForm() {
  const { id } = useParams();

  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;

    const fetchPost = async () => {
      try {
          const result = await api.getPost(id)
          console.log("getPost result...", result)
          setTitle(result.title);
          setContent(result.content);
      } catch (error) {
          console.error(error.message)
      }

    }
    fetchPost()
}, [id, isEdit])

  function generateDraftfromLLM(draft) {
    setTitle(draft.title);
    setContent(draft.content);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    setError('');
    try {
      const payload = { title: title.trim(), content: content.trim() };
      if (isEdit) {
        await api.updatePost(id, payload);
        navigate(`/posts/${id}`);
      } else {
        const post = await api.createPost(payload);
        navigate(`/posts/${post.id}`);
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loading) return <p className="status">Loading post…</p>;

  return (
    <div className="">
      <div className="new-edit-post-header">
        <NavLink to={isEdit ? `/posts/${id}` : '/'} className="back-link">
          ← Cancel
        </NavLink>
        <h2>{isEdit ? 'Edit Post' : 'New Post'}</h2>
      </div>

      {!isEdit && <GenerateDraftForm onGenerated={generateDraftfromLLM} />}

      <form onSubmit={handleSubmit} className="blog-form-container">
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
        </div> 
        <div className="form-row">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
            rows={6} 
            cols={100}
            required
          />
        </div> 
        <div className="form-row">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Post' : 'Publish Post'}
          </button>
        </div>                   

        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
}
