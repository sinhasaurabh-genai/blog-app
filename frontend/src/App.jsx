import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from "./components/Home"
import BlogPostForm from './components/BlogPostForm';
import BlogPostDetail from './components/BlogPostDetail';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/new" element={<BlogPostForm />} />
          <Route path="/posts/:id/edit" element={<BlogPostForm />} />
          <Route path="/posts/:id" element={<BlogPostDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
