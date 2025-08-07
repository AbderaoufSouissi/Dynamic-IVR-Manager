import { FaFileAlt, FaKey } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineSecurity } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  const features = [
    {
      title: "Gestion des Utilisateurs",
      description: "Créez et gérez facilement les utilisateurs pour un contrôle optimal de votre plateforme.",
      icon: <HiOutlineUserAdd size={28} />
    },
    {
      title: "Gestion des Rôles",
      description: "Définissez clairement les rôles et les responsabilités pour chaque utilisateur afin d'assurer une gouvernance efficace.",
      icon: <MdOutlineSecurity size={28} />
    },
    {
      title: "Gestion des Permissions",
      description: "Attribuez ou retirez des permissions de façon précise pour un contrôle d'accès granulaire et sécurisé.",
      icon: <FaKey size={28} />
    },
    {
      title: "Gestion des MSISDN",
      description: "Blacklistez, whitelistez ou réinitialisez les quotas d'appels des MSISDNs en toute simplicité.",
      icon: <FiPhoneCall size={28} />
    },
    {
      title: "Suivi des Activités",
      description: "Consultez l'historique des actions des utilisateurs et surveillez les accès pour une traçabilité renforcée.",
      icon: <FaFileAlt size={28} />
    },
  ];

  const scrollToFeatures = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Enhanced Header */}
      <header className="flex items-center justify-between px-6 py-6 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          
          <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dynamic IVR Manager
          </span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToFeatures}
            className="text-gray-600 hover:text-blue-600 font-medium text-center transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            Fonctionnalités
          </button>
        </div>

        <div>
          <NavLink
              className="hidden md:flex items-center justify-center rounded-lg h-10 px-5 text-blue-700 font-bold text-sm transition"
              to={"/login"}
            >
              <p className="-mx-3 text-blue-700 rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50 flex items-center">
                Log in <GoArrowRight className="ml-1 mt-1" />
              </p>
            </NavLink>
        </div>
      </header>

      <main>
        {/* Enhanced Hero Section */}
        <section className="py-10 md:py-16 text-center bg-gradient-to-br from-white via-blue-50/50 to-blue-50/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                Nouvelle plateforme de gestion
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-blue-900 bg-clip-text text-transparent leading-tight mb-6">
              Simplifiez la Gestion
              <br />
              <span className="text-blue-600">des Utilisateurs</span>
            </h1>
            
            <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Gérez sans effort les utilisateurs, les rôles et les MSISDN avec notre système intuitif.
              <br className="hidden md:block" />
              Simplifiez l'administration et améliorez la sécurité de votre plateforme.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NavLink
                to={"/login"}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl shadow-xl hover:from-blue-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                <span>Commencer maintenant</span>
                <GoArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
              
              <button 
                onClick={scrollToFeatures}
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                Découvrir les fonctionnalités
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features-section" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                Fonctionnalités principales
              </span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                Tout ce dont vous avez besoin
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
                Une suite complète d'outils pour prendre le contrôle de votre administration utilisateur, 
                le tout dans une interface intuitive et moderne.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center space-y-6 border border-gray-100/50 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 flex-grow text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                  
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <Footer/>
      </main>
    </div>
  );
};

export default HomePage;