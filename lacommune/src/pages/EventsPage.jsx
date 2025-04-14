import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/apiService';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Erreur lors du chargement des événements.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des événements</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;