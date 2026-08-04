import { useState } from 'react';
import { api } from '../api/client';

export default function GenerateDraftForm({ onGenerated }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(e) {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    try {
      const draft = await api.generateDraftContent({
        topic: topic.trim(),
      });
      console.log("generated draft......", draft)
      onGenerated(draft);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-container">
      <h3>Generate Draft Content from LLM</h3>
      <form onSubmit={handleGenerate} className="ai-form">
        <div className="form-row">
            <label>Topic</label>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter Topic"
                required
            />
            <button type="submit" disabled={loading}>
            {loading ? 'Generating…' : 'Generate Draft'}
            </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
