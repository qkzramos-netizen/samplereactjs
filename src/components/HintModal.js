import React from 'react';
import referenceImg from '../treble-clef-reference.png';

export default function HintModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card hint-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">TREBLE CLEF CHART</h3>
        <img 
          src={referenceImg} 
          alt="Treble Clef Notes on the Staff" 
          className="hint-image"
        />
        <button type="button" className="retry-btn" onClick={onClose}>
          CLOSE HINT
        </button>
      </div>
    </div>
  );
}