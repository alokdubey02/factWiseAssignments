import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import UserEditForm from "./UserEditForm";
import PopupComponent from "./PopupComponent";

export default function UserAccordion({
  user,
  isActive,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEditClick = () => {
    if (user.age >= 18) {
      setIsEditing(true);
    } else {
      alert("Cannot edit details of a minor.");
    }
  };

  const handleSave = (updatedUser) => {
    onEdit(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsPopupOpen(true);
  };

  const handleDelete = () => {
    onDelete(user.id);
    setIsPopupOpen(false);
  };

  const handleCancelDelete = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={`user-accordion ${isActive ? "active" : ""}`}>
      <div className="accordion-header" onClick={onToggle}>
        <img src={user.picture} alt={`${user.first} ${user.last}`} />
        <span>
          {user.first} {user.last}
        </span>
        <button className="toggle-button">
          {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      {isActive && !isEditing && (
        <div className="accordion-content">
          <div className="accordion-content-child">
            <div>
              <p>
                <strong style={{ color: "grey" }}>Age</strong>
              </p>
              <p>{user.age} Years</p>
            </div>
            <div>
              <p>
                <strong style={{ color: "grey" }}>Gender</strong>
              </p>
              <p>{user.gender}</p>
            </div>
            <div>
              <p>
                <strong style={{ color: "grey" }}>Country</strong>
              </p>
              <p>{user.country}</p>
            </div>
          </div>
          <div>
            <p
              style={{
                marginBottom: "-10px",
              }}
            >
              <strong style={{ color: "grey" }}>Description</strong>
            </p>
            <p>{user.description}</p>
          </div>
          <div className="toggle-button-edit-parent">
            <button
              className="toggle-button-edit"
              style={{ color: "red" }}
              onClick={handleDeleteClick}
            >
              <RiDeleteBin6Line />
            </button>
            <button
              className="toggle-button-edit"
              style={{ color: "#00ccff" }}
              onClick={handleEditClick}
            >
              <MdOutlineModeEditOutline />
            </button>
          </div>
        </div>
      )}
      {isActive && isEditing && (
        <UserEditForm user={user} onSave={handleSave} onCancel={handleCancel} />
      )}
      {isPopupOpen && (
        <PopupComponent onDelete={handleDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  );
}
