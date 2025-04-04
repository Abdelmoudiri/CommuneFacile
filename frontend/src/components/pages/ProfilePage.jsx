import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  c_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
});

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // Only include password in the update if it's not empty
    const userData = {
      name: values.name,
      email: values.email
    };

    if (values.password) {
      userData.password = values.password;
      userData.c_password = values.c_password;
    }

    setIsSubmitting(true);
    try {
      await updateProfile(userData);
      toast.success('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.errors) {
        setErrors(error.errors);
      } else {
        toast.error(error.message || 'Erreur lors de la mise à jour du profil. Veuillez réessayer.');
      }
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Cette fonction serait implémentée pour supprimer le compte utilisateur
    toast.error("Cette fonctionnalité n'est pas encore implémentée.");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Profile header */}
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profil</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Ces informations seront affichées publiquement, alors soyez prudent avec ce que vous partagez.
                </p>
              </div>
            </div>

            {/* Profile form */}
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white shadow sm:rounded-lg">
                <Formik
                  initialValues={{
                    name: currentUser?.name || '',
                    email: currentUser?.email || '',
                    password: '',
                    c_password: ''
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom
                          </label>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.name && touched.name ? 'border-red-500' : ''}`}
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic mt-1" />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.email && touched.email ? 'border-red-500' : ''}`}
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic mt-1" />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Nouveau mot de passe (laisser vide pour ne pas changer)
                          </label>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.password && touched.password ? 'border-red-500' : ''}`}
                          />
                          <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic mt-1" />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="c_password" className="block text-sm font-medium text-gray-700">
                            Confirmer le nouveau mot de passe
                          </label>
                          <Field
                            id="c_password"
                            name="c_password"
                            type="password"
                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.c_password && touched.c_password ? 'border-red-500' : ''}`}
                          />
                          <ErrorMessage name="c_password" component="div" className="text-red-500 text-xs italic mt-1" />
                        </div>

                        {/* User role information (non-editable) */}
                        <div className="col-span-6 sm:col-span-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Rôle
                          </label>
                          <div className="mt-1 block w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm">
                            {currentUser?.role === 'admin' ? 'Administrateur' : 
                             currentUser?.role === 'employee' ? 'Employé' : 'Citoyen'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          {/* Google Account linking section */}
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>

          <div className="mt-10 md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Comptes liés</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Liez vos comptes de réseaux sociaux pour une connexion simplifiée.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                        <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                        <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04" />
                        <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                      </svg>
                      <span className="ml-4 text-sm font-medium text-gray-900">Google</span>
                    </div>
                    {currentUser?.google_id ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Connecté
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/google`;
                        }}
                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Connecter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>

          <div className="mt-10 md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Zone de danger</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Ces actions sont irréversibles. Soyez prudent.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Supprimer votre compte</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Une fois votre compte supprimé, toutes vos données seront définitivement effacées.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                    >
                      Supprimer le compte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Supprimer le compte
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront définitivement effacées.
                        Cette action ne peut pas être annulée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  onClick={handleDeleteAccount}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Supprimer
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;