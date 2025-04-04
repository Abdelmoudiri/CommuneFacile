import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../common/Navbar';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1581891647233-c54431f9bd3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80"
                  alt="Mairie"
                />
                <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Gestion Communale</span>
                  <span className="block text-indigo-200">Proche de vos besoins</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Simplifiez vos démarches administratives et restez connecté à votre commune grâce à
                  notre plateforme de gestion communale.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  {!isAuthenticated ? (
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <Link
                        to="/register"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                      >
                        Créer un compte
                      </Link>
                      <Link
                        to="/login"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 sm:px-8"
                      >
                        Se connecter
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <Link
                        to="/dashboard"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                      >
                        Mon espace
                      </Link>
                      <Link
                        to="/requests/new"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 sm:px-8"
                      >
                        Nouvelle requête
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Services</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Une meilleure gestion de votre commune
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Découvrez les avantages de notre plateforme de gestion communale pour les citoyens, les employés et les administrateurs.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Simplifier vos démarches</p>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    Effectuez vos démarches administratives en ligne, suivez leur avancement et soyez notifié à chaque étape.
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Gagner du temps</p>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    Plus besoin de vous déplacer ou d'attendre en file d'attente. Tout se fait en ligne, 24h/24 et 7j/7.
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Rester informé</p>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    Soyez informé des événements, des actualités et des décisions importantes de votre commune.
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Transparence administrative</p>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    Accédez à une administration plus transparente et plus proche des citoyens.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Gestion Communale
              </h3>
              <p className="text-gray-300 text-base">
                Une solution moderne pour une administration efficace et transparente.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Liens rapides
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link to="/" className="text-base text-gray-300 hover:text-white">
                        Accueil
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="text-base text-gray-300 hover:text-white">
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="text-base text-gray-300 hover:text-white">
                        Inscription
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Ressources
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white">
                        Guide d'utilisation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Juridique
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white">
                        Conditions d'utilisation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white">
                        Politique de confidentialité
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; {new Date().getFullYear()} Gestion Communale. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;