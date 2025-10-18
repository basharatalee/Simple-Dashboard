// src/components/UsersList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              width: "250px",
              background: "#f8f8f8",
            }}
          >
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p>{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
