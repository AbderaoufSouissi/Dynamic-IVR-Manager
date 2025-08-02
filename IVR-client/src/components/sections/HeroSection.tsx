import { FaKey, FaFileAlt } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { MdOutlineSecurity } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import FeatureCard from '../cards/FeatureCard'

const HeroSection = () => {
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
    <main className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Simplifiez la Gestion des Utilisateurs
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Gérez sans effort les utilisateurs, les rôles et les MSISDN
              avec notre système intuitif. Simplifiez l'administration et
              améliorez la sécurité.
            </p>
            <NavLink
              to={"/login"}
              className="inline-flex items-center justify-center h-12 px-8 bg-blue-600 text-base hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              Gérer les Utilisateurs
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Fonctionnalités Clés
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm">
              Tout ce dont vous avez besoin pour prendre le contrôle de votre
              administration utilisateur, en un seul endroit.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map(feature => 
              <FeatureCard 
                key={feature.title} 
                title={feature.title} 
                description={feature.description} 
                icon={feature.icon}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HeroSection;