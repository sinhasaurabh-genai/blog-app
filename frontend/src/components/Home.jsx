import {useState, useEffect} from "react"
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
    const fetchPosts = async () => {
        try {
            const result = await api.getPosts()
            setPosts(result)
        } catch (error) {
            console.error(error.message)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    fetchPosts()
}, [])

  if (loading) return <p className="status">Loading posts…</p>;
  if (error) return <p className="error">{error}</p>;


    return (
        <div>
            <h2>Published Posts</h2>
            {posts.length === 0 ? (
                <div className="empty-state">
                    <h4>No Post Published Yet.</h4>
                    <Link to="/posts/new" className="btn btn-primary">
                        Create a New Post
                    </Link>
                </div>
            ) : (
                <div className="post-grid">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}            
        </div>
    )
}