import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">À Propos de REMACTO</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl opacity-90 text-center">
                Le Réseau Marocain des Collectivités Territoriales Ouvertes (REMACTO) est une initiative 
                nationale visant à promouvoir la transparence et la bonne gouvernance au niveau local.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Notre Mission</h3>
                <p className="text-gray-600 text-center">
                  Promouvoir l'excellence dans la gouvernance locale et faciliter 
                  la collaboration entre les collectivités territoriales.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Notre Vision</h3>
                <p className="text-gray-600 text-center">
                  Devenir le catalyseur principal de l'innovation et de la 
                  modernisation de l'administration locale au Maroc.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Nos Valeurs</h3>
                <p className="text-gray-600 text-center">
                  Transparence, Innovation, Collaboration, Excellence et 
                  Engagement communautaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Notre Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">50+</div>
                <p className="text-gray-600">Collectivités Partenaires</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">1000+</div>
                <p className="text-gray-600">Fonctionnaires Formés</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">100+</div>
                <p className="text-gray-600">Projets Réalisés</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-700 mb-2">25K+</div>
                <p className="text-gray-600">Citoyens Impactés</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;