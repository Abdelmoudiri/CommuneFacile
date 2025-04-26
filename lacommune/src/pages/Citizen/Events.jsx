import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch events from API
    // For now using mock data
    setEvents([
      {
        id: 1,
        title: "Festival culturel",
        date: "2025-05-15",
        description: "Un festival célébrant la diversité culturelle de notre commune.",
        location: "Place centrale",
      },
      {
        id: 2,
        title: "Journée portes ouvertes",
        date: "2025-05-20",
        description: "Découvrez les services municipaux et rencontrez vos élus.",
        location: "Hôtel de ville",
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Chargement...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center mb-8">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold text-gray-900">Événements à venir</h1>
              <p className="mt-2 text-sm text-gray-700">
                Liste des événements prochains dans votre commune
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <div key={event.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{event.description}</p>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      📅 {new Date(event.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span>
                      📍 {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;