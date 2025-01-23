import { useEffect, useState } from "react";
import "./HomePage.css";
import { data } from "react-router-dom";

function HomePage() {
  const [schedules, setSchedules] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSchedules(); 
  }, []);

  function getSchedules() {
    fetch("http://localhost:3000/api/v1/schedules", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch schedules. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSchedules(data.data); 
        console.log(data)
      })
      .catch((error) => setError(error.message)); 
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!schedules) {
    return <p className="loading-message">Loading schedules...</p>; 
  }

  return (
    <div className="homepage">
      <h2 className="title">Schedules</h2>
      <ul className="schedules-list">
        {schedules.map((schedule) => (
          <ul key={schedule.id} className="schedule-item">
            <p>Date: {schedule.attributes.date}</p>
            <p>Title: {schedule.attributes.title} </p>
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;