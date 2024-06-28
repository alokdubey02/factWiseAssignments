import React, { useState, useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

export default function UserEditForm({ user, onSave, onCancel }) {
  const [editedUser, setEditedUser] = useState(user);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    setIsSaveEnabled(
      editedUser.age !== user.age ||
        editedUser.gender !== user.gender ||
        editedUser.country !== user.country ||
        (editedUser.description !== user.description &&
          editedUser.age !== "" &&
          editedUser.gender !== "" &&
          editedUser.country !== "" &&
          editedUser.description !== "")
    );
  }, [editedUser, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age" && (isNaN(value) || value.trim() === "")) {
      return;
    }
    if (name === "country" && /\d/.test(value)) {
      return;
    }

    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setIsSaveEnabled(
      (editedUser.age !== user.age ||
        editedUser.gender !== user.gender ||
        editedUser.country !== user.country ||
        editedUser.description !== user.description) &&
        editedUser.age !== "" &&
        editedUser.gender !== "" &&
        editedUser.country !== "" &&
        editedUser.description !== ""
    );
  };

  const calculateDobFromAge = (age) => {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    const birthDate = new Date(today.setFullYear(birthYear));
    return birthDate.toISOString().split("T")[0];
  };

  const handleSaveClick = () => {
    const updatedUser = {
      ...editedUser,
      dob: calculateDobFromAge(editedUser.age),
    };
    onSave(updatedUser);
  };

  return (
    <div className="edit-form">
      <div className="edit-form-child">
        <label>
          Age
          <input
            type="text"
            name="age"
            value={editedUser.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender
          <select
            name="gender"
            value={editedUser.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="rather not say">Rather not say</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={editedUser.country}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="edit-form-child2">
        <div>
          Description
          <textarea
            name="description"
            value={editedUser.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="toggle-button-edit-parent">
        <button
          className="toggle-button-edit"
          style={{ color: "red", fontSize: "25px", marginRight: 0 }}
          onClick={onCancel}
        >
          <RxCrossCircled />
        </button>
        <button
          className="toggle-button-edit"
          style={{ color: "green", fontSize: "23px", marginRight: 0 }}
          onClick={handleSaveClick}
          disabled={!isSaveEnabled}
        >
          <FaRegCircleCheck />
        </button>
      </div>
    </div>
  );
}
