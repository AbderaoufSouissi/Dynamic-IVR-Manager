import { FaFileAlt, FaKey } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineSecurity } from "react-icons/md";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  

  const features = [
    {
      title: "Gestion des Utilisateurs",
      description: "Créez et gérez facilement les utilisateurs pour un contrôle optimal de votre plateforme.",
      icon: <HiOutlineUserAdd size={25} />
    },
    {
      title: "Gestion des Rôles",
      description: "Définissez clairement les rôles et les responsabilités pour chaque utilisateur afin d'assurer une gouvernance efficace.",
      icon: <MdOutlineSecurity size={25} />
    },
    {
      title: "Gestion des Permissions",
      description: "Attribuez ou retirez des permissions de façon précise pour un contrôle d’accès granulaire et sécurisé.",
      icon: <FaKey size={25} />
    },
    {
      title: "Gestion des MSISDN",
      description: "Blacklistez, whitelistez ou réinitialisez les quotas d’appels des MSISDNs en toute simplicité.",
      icon: <FiPhoneCall size={25} />
    },
    {
      title: "Suivi des Activités",
      description: "Consultez l’historique des actions des utilisateurs et surveillez les accès pour une traçabilité renforcée.",
      icon: <FaFileAlt size={25} />
    },
  ];
  
  return (
      // <div className="bg-gray-50 text-gray-800 h-screen flex flex-col scroll-smooth overflow-hidden">
    //   <Header/>
    //   <HeroSection />
    //   <Footer />
    // </div>
    


    <div className="bg-gray-50">
      {/* <header className="bg-white shadow-sm flex">
      
          <div className="flex justify-between items-center py-4">
          
            <div className="flex items-center space-x-2">
              <span className="material-icons text-blue-600 text-3xl">widgets</span>
              <span className="text-xl font-bold text-gray-800">Dynamic IVR Manager</span>
            </div>

           
            <div className="flex items-center justify-center">
              <a className="text-gray-600 hover:text-blue-600 font-medium text-center" href="#">
                Fonctionnalités
              </a>
            </div>

           
            <div className="flex items-center justify-end">
              <a
                className="flex items-center text-blue-600 font-semibold hover:text-blue-700"
                href="#"
              >
                Log in <span className="material-icons ml-1">arrow_forward</span>
              </a>
            </div>
          </div>
  
      </header> */}
      <header className="relative flex items-center justify-between px-4 py-4">
        <div>
          
    <span className="font-bold text-3xl text-gray-900">Dynamic IVR Manager</span>
  </div>

  <div className="absolute left-1/2 transform -translate-x-1/2">
    <a className="text-gray-600 hover:text-blue-600 font-medium text-center" href="#">
      Fonctionnalités
    </a>
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
        {/* Hero Section */}
        <section className="py-20 md:py-28 text-center bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Simplifiez la Gestion des Utilisateurs
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Gérez sans effort les utilisateurs, les rôles et les MSISDN avec notre système intuitif.
              Simplifiez l'administration et améliorez la sécurité.
            </p>
            <div className="mt-10">
              <NavLink
                to={"/login"}
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Gérer les Utilisateurs
              </NavLink>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Fonctionnalités Clés</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                Tout ce dont vous avez besoin pour prendre le contrôle de votre administration utilisateur, en un seul endroit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center space-y-4"
                >
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="material-icons text-blue-600 text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;