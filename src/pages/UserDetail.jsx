// src/components/UserDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/users" style={{ textDecoration: "none", color: "blue" }}>
        ← Back to Users
      </Link>
      <h2>{user.name}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <p><strong>Address:</strong> {user.address?.city}, {user.address?.street}</p>
    </div>
  );
};

export default UserDetail;
