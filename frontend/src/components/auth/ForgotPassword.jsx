import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../services/api';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis')
});

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsSubmitting(true);
    try {
      await api.post('/forgot-password', values);
      setSuccess(true);
      toast.success('Un lien de réinitialisation a été envoyé à votre adresse email');
    } catch (error) {
      console.error('Forgot password error:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
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
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>
        
        {success ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Email envoyé
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      to="/login"
                      className="px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Retour à la connexion
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      placeholder="exemple@domaine.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic mt-1" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                  </button>
                </div>

                <div className="text-sm text-center">
                  <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Retour à la connexion
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;