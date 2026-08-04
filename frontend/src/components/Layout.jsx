import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="blog-app-container">
      <header className="">
          <nav className="navbar">
            <h3>Blog Application</h3>
            <NavLink to="/" className="">
              Home
            </NavLink>
            <NavLink to="/posts/new" className="">
              New Post
            </NavLink>
          </nav>
      </header>
      <main className="container main">{children}</main>
    </div>
  );
}
