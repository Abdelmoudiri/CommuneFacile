import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import GoogleLogin from './GoogleLogin';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nom requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .required('Mot de passe requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  c_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Confirmation du mot de passe requise')
});

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsSubmitting(true);
    try {
      await register(values);
      toast.success('Inscription réussie ! Bienvenue !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.errors) {
        setErrors(error.errors);
      } else {
        toast.error(error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
        </div>
        <Formik
          initialValues={{ name: '', email: '', password: '', c_password: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="name" className="sr-only">Nom</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Nom complet"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic mt-1" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic mt-1" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">Mot de passe</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Mot de passe"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic mt-1" />
                </div>
                
                <div>
                  <label htmlFor="c_password" className="sr-only">Confirmer le mot de passe</label>
                  <Field
                    id="c_password"
                    name="c_password"
                    type="password"
                    autoComplete="new-password"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.c_password && touched.c_password ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Confirmer le mot de passe"
                  />
                  <ErrorMessage name="c_password" component="div" className="text-red-500 text-xs italic mt-1" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        
        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continuez avec</span>
            </div>
          </div>
          
          <div className="mt-6">
            <GoogleLogin />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;