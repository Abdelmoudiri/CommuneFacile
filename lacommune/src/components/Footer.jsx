import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8 border-t mt-16">
      <div className="w-full px-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="font-bold text-lg mb-4 text-gray-800">REMACTO</h3>
              <p className="text-gray-600 mb-4">
                Réseau Marocain des Collectivités Territoriales Ouvertes
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-red-600 hover:text-red-800">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-red-600 hover:text-red-800">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-red-600 hover:text-red-800">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-red-600">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-600 hover:text-red-600">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/evenements" className="text-gray-600 hover:text-red-600">
                    Événements
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-red-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/3">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">Rabat, Maroc</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">contact@remacto.ma</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600">+212 5XX-XXXXXX</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} REMACTO. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-red-600 text-sm">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-red-600 text-sm">
                    Conditions d'utilisation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;