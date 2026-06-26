import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SucculentForm = ({ onClose, onSubmit, editingId }) => {
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    category: '',
    tags: '',
    wateringFrequency: '',
    sunlight: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  // Fetch existing succulent if editing
  useEffect(() => {
    if (editingId) {
      const fetchSucculent = async () => {
        try {
          const response = await axios.get(`/api/succulents/${editingId}`);
          setFormData({
            name: response.data.name || '',
            scientificName: response.data.scientificName || '',
            description: response.data.description || '',
            category: response.data.category || '',
            tags: response.data.tags || '',
            wateringFrequency: response.data.wateringFrequency || '',
            sunlight: response.data.sunlight || '',
            photo: null
          });
          if (response.data.photo) {
            setPhotoPreview(response.data.photo);
          }
        } catch (err) {
          setError('Failed to load succulent: ' + err.message);
        }
      };
      fetchSucculent();
    }
  }, [editingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('scientificName', formData.scientificName);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('tags', formData.tags);
      data.append('wateringFrequency', formData.wateringFrequency);
      data.append('sunlight', formData.sunlight);
      if (formData.photo instanceof File) {
        data.append('photo', formData.photo);
      } else if (photoPreview && !formData.photo) {
        data.append('photo', photoPreview);
      }

      if (editingId) {
        await axios.put(`/api/succulents/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('/api/succulents', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setLoading(false);
      onSubmit();
    } catch (err) {
      setError('Failed to save succulent: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingId ? 'Edit Art Supply' : 'Add New Art Supply'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Staedtler color pencils"
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 12 pack "
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about this art supply..."
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Markers, Paint pens, Color pencils"
            />
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., Washable, Permanent"
            />
          </div>

          <div className="form-group">
            <label>Minimum Age </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="e.g., 3+, 5+"
            />
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <img src={photoPreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Saving...' : 'Save Art supply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SucculentForm;
