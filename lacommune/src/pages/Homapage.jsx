import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Caroussel";

const HomePage = () => {
  const carouselSlides = [
    {
      id: 1,
      image: "/images/slide1.png",
      alt: "Slide 1"
    },
    {
      id: 2,
      image: "/images/slide2.png",
      alt: "Slide 2"
    },
    {
      id: 3,
      image: "/images/slide3.png", 
      alt: "Slide 3"
    }
  ];

  const availableServices = [
    {
      title: "Extrait de naissance",
      description: "Obtenez votre extrait de naissance en ligne",
      icon: "📋",
      path: "/citoyen/demandes/nouveau",
    },
    {
      title: "Certificat de résidence",
      description: "Faites une demande de certificat de résidence",
      icon: "🏠",
      path: "/citoyen/demandes/nouveau",
    },
    {
      title: "Légalisation de documents",
      description: "Service de légalisation de documents administratifs",
      icon: "✅",
      path: "/citoyen/demandes/nouveau",
    },
    {
      title: "Certificat de vie",
      description: "Demande d'attestation de vie pour retraités",
      icon: "👵",
      path: "/citoyen/demandes/nouveau",
    },
  ];

  const featuredEvents = [
    {
      id: "1",
      title: "Festival Culturel de la Ville",
      date: "15 juin 2025",
      description: "Venez célébrer notre patrimoine culturel avec de la musique, des expositions et de la gastronomie locale.",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "2",
      title: "Journée Portes Ouvertes",
      date: "10 juillet 2025",
      description: "Une opportunité pour les citoyens de rencontrer les élus et de découvrir les services municipaux.",
      image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const featuredAnnouncements = [
    {
      id: "1",
      title: "Technicien(ne) en urbanisme",
      deadline: "30 juin 2025",
      department: "Service Urbanisme",
      description: "Nous recherchons un(e) technicien(ne) en urbanisme pour rejoindre notre équipe.",
    },
    {
      id: "2",
      title: "Assistant(e) administratif(ve)",
      deadline: "15 juillet 2025",
      department: "Direction des Ressources Humaines",
      description: "Poste d'assistant(e) administratif(ve) pour la DRH.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <main className="flex-grow w-full">
        <section className="w-full py-10 bg-gradient-to-r from-red-700 to-red-900">
          <div className="w-full px-4 max-w-[2000px] mx-auto">
            <div className="text-white text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Bienvenue sur la plateforme de services de la commune
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Accédez à tous les services administratifs en ligne et restez informé des actualités de votre commune
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/inscription"
                  className="bg-white text-red-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
                >
                  S'inscrire
                </Link>
                <Link
                  to="/connexion"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800"
                >
                  Se connecter
                </Link>
              </div>
            </div>
            <Carousel slides={carouselSlides} />
          </div>
        </section>

        <section className="w-full py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Services disponibles</h2>
              <Link to="/services" className="text-red-700 hover:text-red-800">
                Voir tous les services →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to={service.path}
                    className="text-red-700 hover:text-red-800 font-medium"
                  >
                    Faire une demande →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Événements à venir</h2>
              <Link to="/evenements" className="text-red-700 hover:text-red-800">
                Voir tous les événements →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-video">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-red-700 text-sm font-medium mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <Link
                      to={`/evenements/${event.id}`}
                      className="inline-block border border-red-700 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                      Plus d'informations
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Annonces d'emploi</h2>
              <Link to="/annonces" className="text-red-700 hover:text-red-800">
                Voir toutes les annonces →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredAnnouncements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-sm font-medium text-red-700 mb-2">{announcement.department}</div>
                  <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                  <p className="text-gray-500 mb-2">Date limite: {announcement.deadline}</p>
                  <p className="text-gray-600 mb-4">{announcement.description}</p>
                  <Link
                    to={`/annonces/${announcement.id}`}
                    className="inline-block border border-red-700 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50"
                  >
                    Voir l'annonce
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
