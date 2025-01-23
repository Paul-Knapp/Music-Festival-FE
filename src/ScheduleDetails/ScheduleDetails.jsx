import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ScheduleDetails.css';

function ScheduleDetails() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getDetails();
    }, [id]);

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
        .then((schedulesdetails) => {
            const { data, included } = schedulesdetails;
            setDetails(data);

            const shows = data.relationships.shows.data;
            const includedShows = included.filter((item) => item.type === "show");

            const showsWithDetails = shows.map((showRef) =>
                includedShows.find((includedShow) => includedShow.id === showRef.id)
            );

            setDetails((prevDetails) => ({
                ...prevDetails,
                shows: showsWithDetails,
            }));
        })
        .catch((error) => setError(error.message)); 
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!details) {
        return <p className="loading-message">Loading schedule...</p>;
    }
    
    {console.log("details", details)}
    const user = details.included;
    const shows = details.shows;

    return (
        <div className="scheduledetails">
            <h2>{details.attributes.title}</h2>
            <p>Date: {details.attributes.date}</p>
            {console.log("user", user)}
            {user && (
                <div>
                    <h3>User Information:</h3>
                    <p>Name: {user.attributes.first_name} {user.attributes.last_name}</p>
                    <p>Email: {user.attributes.email}</p>
                </div>
            )}

            <h3>Shows:</h3>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>
                        <p>Artist: {show.attributes.artist}</p>
                        <p>Location: {show.attributes.location}</p>
                        <p>Date: {show.attributes.date}</p>
                        <p>Time: {show.attributes.time} PM</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleDetails;