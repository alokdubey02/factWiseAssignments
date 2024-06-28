import React from "react";
import "../css/PopupComponent.css";

export default function PopupComponent({ onDelete, onCancel }) {
  const handleDelete = () => {
    onDelete();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="popup-container">
      <div className="popup-box">
        <div style={{ display: "flex" }}>
          <div>
            <p className="popup-message">Are you sure you want to delete?</p>
          </div>
          <div className="popup-button-x-parent">
            <button className="popup-button-x" onClick={handleCancel}>
              X
            </button>
          </div>
        </div>
        <div className="popup-buttons">
          <button className="popup-button-no" onClick={handleCancel}>
            Cancel
          </button>
          <button className="popup-button-yes" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
