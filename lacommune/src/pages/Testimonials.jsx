import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mohammed Alami",
      position: "Maire de la ville de Fès",
      content: "REMACTO nous a permis d'améliorer significativement notre gouvernance locale et d'optimiser nos services aux citoyens.",
      image: "/images/testimonial1.jpg"
    },
    {
      name: "Fatima Zahra Bennani",
      position: "Présidente de Région",
      content: "Un partenaire incontournable pour la modernisation de nos services. Leur expertise et leur accompagnement sont remarquables.",
      image: "/images/testimonial2.jpg"
    },
    {
      name: "Ahmed Tazi",
      position: "Directeur des Services",
      content: "Les formations et l'assistance technique de REMACTO ont transformé notre approche de la gestion publique locale.",
      image: "/images/testimonial3.jpg"
    },
    {
      name: "Leila Bensouda",
      position: "Conseillère Municipale",
      content: "Grâce à REMACTO, nous avons pu mettre en place des processus plus transparents et participatifs dans notre commune.",
      image: "/images/testimonial4.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Témoignages</h1>
            <p className="text-xl opacity-90 text-center max-w-3xl mx-auto">
              Découvrez ce que nos partenaires et utilisateurs disent de notre plateforme
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-100 overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                      <p className="text-red-600 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                </div>
              ))}
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Partagez votre expérience</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Vous avez collaboré avec REMACTO ? Nous serions ravis d'entendre votre retour d'expérience et de partager votre témoignage avec notre communauté.
              </p>
              <button className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors">
                Ajouter un témoignage
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;