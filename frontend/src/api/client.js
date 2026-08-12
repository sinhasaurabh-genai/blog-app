// const API_BASE = 'http://127.0.0.1:8000/api';
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Error message"}))
      throw new Error(error.detail || "Error Found")
  }

  if (response.status === 204) return null 
  return response.json();
}

export const api = {
    createPost: (data) => request("/posts", {method: "POST", body: JSON.stringify(data)}),
    deletePost: (id) => request(`/posts/${id}`, { method: "DELETE" }),
    getPost: (id) => request(`/posts/${id}`),
    getPosts: () => request("/posts"),
    updatePost: (id, data) => request(`/posts/${id}`, {method: "PUT", body: JSON.stringify(data)}),
    generateDraftContent: (data) => request("/llm/generate", {method: "POST", body: JSON.stringify(data)})

}