import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-700 to-red-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">Nos Services</h1>
            <p className="text-xl text-white text-center max-w-3xl mx-auto opacity-90">
              Découvrez notre gamme complète de services conçus pour améliorer la gouvernance locale et le service aux citoyens
            </p>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Réseau et Collaboration</h3>
              <p className="text-gray-600">Favoriser les échanges et la collaboration entre les collectivités territoriales pour un développement plus harmonieux.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Gouvernance Ouverte</h3>
              <p className="text-gray-600">Promouvoir la transparence, la participation citoyenne et l'innovation dans la gestion des affaires publiques locales.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Formation et Renforcement</h3>
              <p className="text-gray-600">Développer les capacités des élus et fonctionnaires locaux pour une gestion plus efficace des collectivités.</p>
            </div>
          </div>
        </section>

        {/* Services Administratifs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Services Administratifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-red-700 text-4xl mb-4">📄</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Documents Administratifs</h3>
                <p className="text-gray-600 mb-4">Demandez vos documents administratifs en ligne : extraits de naissance, certificats de résidence, etc.</p>
                <button className="text-red-700 hover:text-red-800 font-medium">
                  En savoir plus →
                </button>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-red-700 text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Urbanisme</h3>
                <p className="text-gray-600 mb-4">Gérez vos demandes de permis de construire et autres autorisations d'urbanisme.</p>
                <button className="text-red-700 hover:text-red-800 font-medium">
                  En savoir plus →
                </button>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-red-700 text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Services aux Entreprises</h3>
                <p className="text-gray-600 mb-4">Accompagnement dans vos démarches administratives et développement économique.</p>
                <button className="text-red-700 hover:text-red-800 font-medium">
                  En savoir plus →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;