import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import UserAccordion from "./components/UserAccordian";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      const loadedUsers = response.data.map((user) => ({
        ...user,
        age: calculateAge(new Date(user.dob)),
      }));
      setUsers(loadedUsers);
      setFilteredUsers(loadedUsers);
    });
  }, []);

  const calculateAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) =>
      `${user.first} ${user.last}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const handleDelete = (userId) => {
    const remainingUsers = users.filter((user) => user.id !== userId);
    setUsers(remainingUsers);
    setFilteredUsers(remainingUsers);
    saveUsers(remainingUsers);
  };

  const saveUsers = (updatedUsers) => {
    axios
      .post("/api/users/update", updatedUsers)
      .then((response) => {
        if (response.data.success) {
          console.log("Users updated successfully");
        }
      })
      .catch((error) => {
        console.error("Error updating users:", error);
      });
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserAccordion
            key={user.id}
            user={user}
            isActive={activeUserId === user.id}
            onToggle={() =>
              setActiveUserId(activeUserId === user.id ? null : user.id)
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
