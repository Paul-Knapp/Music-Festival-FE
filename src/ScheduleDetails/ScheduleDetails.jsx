import './ScheduleDetails.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ScheduleDetails() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null); // make sure setError is defined here
    const { id } = useParams(); // Extracting the schedule ID from the URL

    // Refetch details whenever `id` changes
    useEffect(() => {
        getDetails();
    }, [id]); // Adding `id` as a dependency

    function getDetails() {
        fetch(`http://localhost:3000/api/v1/schedules/${id}/schedule_shows`, {
            method: "GET",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch schedule. Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setDetails(data.data); // Assuming `data.data` contains the schedule details
        })
        .catch((error) => setError(error.message)); 
    }

    // Error handling
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    // Loading state
    if (!details) {
        return <p className="loading-message">Loading schedule...</p>; 
    }

    // Rendering the schedule details
    return (
        <div className="scheduledetails">
            <h2>{details.attributes.name}</h2>
            <p>Time: {details.attributes.time}</p>
            {/* Display other details here, for example: */}
            {details.relationships.user && (
                <p>User: {details.relationships.user.data.id}</p>
            )}
            <h3>Shows:</h3>
            {details.relationships.shows.data.length > 0 ? (
                <ul>
                    {details.relationships.shows.data.map((show) => (
                        <li key={show.id}>{show.type}</li>
                    ))}
                </ul>
            ) : (
                <p>No shows available</p>
            )}
        </div>
    );
}

export default ScheduleDetails;