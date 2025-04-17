import React from "react";
import Header from "../compnents/Header";
import Footer from "../compnents/Footer";
import Carousel from "../compnents/Caroussel";
import { Link } from "react-router-dom";

const HomePage = () => {
  const carouselSlides = [
    {
      image: "../asset/images/slide1.jpg",
      alt: "Conference presentation",
    },
    {
      image: "/images/slide2.jpg",
      alt: "Portrait with Moroccan flag",
    },
    {
      image: "/images/slide3.jpg",
      alt: "Speech at podium",
    },
    {
      image: "/images/slide4.jpg",
      alt: "Meeting room",
    },
    {
      image: "/images/slide5.jpg",
      alt: "Mountain landscape",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <Carousel slides={carouselSlides} />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src="/images/remacto-logo.png"
                  alt="REMACTO Logo"
                  className="max-w-full h-auto mb-6"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  REMACTO
                </h2>
                <p className="text-gray-700 mb-6">
                  Réseau Marocain des Collectivités Territoriales Ouvertes
                </p>
                <p className="text-gray-600">
                  Le réseau marocain pour la collaboration et le développement
                  des collectivités territoriales, favorisant la transparence et
                  la gouvernance ouverte.
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-center">
                      Royaume du Maroc
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      Communes, Provinces, Préfectures et Régions
                    </p>
                  </div>
                  <img
                    src="/images/morocco-map.png"
                    alt="Carte du Maroc"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Réseau et Collaboration
                </h3>
                <p className="text-gray-600">
                  Favoriser les échanges et la collaboration entre les
                  collectivités territoriales pour un développement plus
                  harmonieux.
                </p>
              </div>

              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Gouvernance Ouverte</h3>
                <p className="text-gray-600">
                  Promouvoir la transparence, la participation citoyenne et
                  l'innovation dans la gestion des affaires publiques locales.
                </p>
              </div>

              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Formation et Renforcement
                </h3>
                <p className="text-gray-600">
                  Développer les capacités des élus et fonctionnaires locaux
                  pour une gestion plus efficace des collectivités.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/services"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Découvrir tous nos services
              </Link>
            </div>
          </div>
        </section>

        
        <section className="py-16 bg-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez notre réseau</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Participez à la transformation de la gouvernance locale au Maroc
              et contribuez au développement de votre collectivité.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                S'inscrire
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
