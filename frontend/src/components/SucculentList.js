import React from 'react';

const SucculentList = ({ succulents, onDelete, onEdit }) => {
  if (succulents.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Art supplies found</h3>
        <p>Add your first art supply to get started!</p>
      </div>
    );
  }

  return (
    <div className="succulents-grid">
      {succulents.map(succulent => (
        <div key={succulent.id} className="succulent-card">
          <div className="succulent-image">
            {succulent.photo ? (
              <img src={succulent.photo} alt={succulent.name} />
            ) : (
              <span className="no-image">No Image</span>
            )}
          </div>
          <div className="succulent-content">
            <h2>{succulent.name}</h2>
            {succulent.quantity && (
              <div className="succulent-scientific">{succulent.quantity}</div>
            )}
            {succulent.category && (
              <div className="succulent-category">{succulent.category}</div>
            )}
            {succulent.tags && (
              <div className="succulent-tags">
                {succulent.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="tag">{tag.trim()}</span>
                ))}
              </div>
            )}
            {succulent.description && (
              <p className="succulent-description">{succulent.description}</p>
            )}
            {( succulent.age) && (
              <div className="succulent-info">
                
                {succulent.age && <div>☀️ {succulent.age}</div>}
              </div>
            )}
            <div className="succulent-actions">
              <button className="btn btn-secondary" onClick={() => onEdit(succulent.id)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(succulent.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SucculentList;
