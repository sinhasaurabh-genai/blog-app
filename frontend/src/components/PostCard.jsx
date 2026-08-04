import { NavLink } from 'react-router-dom';

function excerpt(content, maxLength = 150) {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trim() + '…';
}

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2>
        <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
      </h2>
      <p className="post-excerpt">{excerpt(post.content)}</p>
      <NavLink to={`/posts/${post.id}`} className="read-more">
        Read more →
      </NavLink>
    </article>
  );
}
