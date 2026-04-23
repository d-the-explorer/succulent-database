import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SucculentList from './components/SucculentList';
import SucculentForm from './components/SucculentForm';
import './index.css';

function App() {
  const [succulents, setSucculents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Fetch all succulents
  const fetchSucculents = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (categoryFilter) params.category = categoryFilter;
      if (tagFilter) params.tag = tagFilter;

      const response = await axios.get('/api/succulents', { params });
      setSucculents(response.data);
      
      // Extract categories and tags
      const cats = [...new Set(response.data.map(s => s.category).filter(Boolean))];
      const tgs = [...new Set(response.data.flatMap(s => s.tags ? s.tags.split(',').map(t => t.trim()) : []))];
      setCategories(cats);
      setTags(tgs);
    } catch (err) {
      setError('Failed to fetch succulents: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSucculents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categoryFilter, tagFilter]);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this succulent?')) {
      try {
        await axios.delete(`/api/succulents/${id}`);
        setSucculents(succulents.filter(s => s.id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete succulent: ' + err.message);
      }
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  // Handle form submit
  const handleFormSubmit = () => {
    setEditingId(null);
    setShowForm(false);
    fetchSucculents();
  };

  // Handle form close
  const handleFormClose = () => {
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🌵 Succulent Database</h1>
        <p>Catalog your succulent collection</p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Succulent
        </button>
      </div>

      {showForm && (
        <SucculentForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          editingId={editingId}
        />
      )}

      {loading ? (
        <div className="loading">Loading your succulents...</div>
      ) : (
        <SucculentList
          succulents={succulents}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
