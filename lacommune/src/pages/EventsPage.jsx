// import React, { useEffect, useState } from 'react';
// import { fetchEvents } from '../services/apiService';
// import axios from 'axios';

// const EventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/evenments',
//           {
//             headers:{
//               Authorization:`Bearer ${localStorage.getItem('token')}`
//             }
//           }
//         );
//        console.log(response.data.data)
//         setEvents(response.data.data);
//       } catch (err) {
//         setError('Erreur lors du chargement des événements.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEvents();
//   }, []);

//   if (loading) return <p>Chargement des événements...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Liste des événements</h1>
//       <ul>
//         {events.map((event) => (
//           <li key={event.id}>{event.title}</li> 
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EventsPage;
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Événements</h1>
            <p className="text-xl opacity-90 text-center max-w-3xl mx-auto">
              Découvrez tous les événements et activités organisés par votre commune
            </p>
          </div>
        </section>

        {/* Events List Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <p className="text-center">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {event.image && (
                      <div className="aspect-video">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm font-medium text-red-700 mb-2">
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      {event.location && (
                        <div className="flex items-center text-gray-500 mb-4">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}
                      <button className="inline-block border border-red-700 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                        Plus d'informations
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );





};



export default EventsPage;