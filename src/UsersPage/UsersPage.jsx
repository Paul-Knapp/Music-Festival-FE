import { useEffect, useState } from "react";
import "./UsersPage.css";

function UsersPage() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers(); 
  }, []);

  function getUsers() {
    fetch("http://localhost:3000/api/v1/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.data); 
        console.log(data)
      })
      .catch((error) => setError(error.message)); 
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!users) {
    return <p className="loading-message">Loading users...</p>; 
  }

  return (
    <div className="homepage">
      <h2 className="title">Users</h2>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="schedule-item">
            <p>First Name: {user.attributes.first_name}</p>
            <p>Last Name: {user.attributes.last_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;