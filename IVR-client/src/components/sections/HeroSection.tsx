
import { FaKey, FaFileAlt } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { MdOutlineSecurity } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import FeatureCard from '../cards/FeatureCard'



const HeroSection = () => {

const features = [
    {
      title:"Gestion des Utilisateurs",
      description: "Créez, mettez à jour et supprimez des utilisateurs en quelques clics.",
      icon:<HiOutlineUserAdd size={25} />
    },
    {
      title:"Gestion des Rôles",
      description: "Définissez et gérez les rôles et responsabilités des utilisateurs.",
      icon:<MdOutlineSecurity size={25} />
    },
    {
      title:"Gestion des Permissions",
      description: "Attribuez et révoquez des permissions de manière granulaire.",
      icon: <FaKey size={25} />
    },
    {
      title:"Gestion des MSISDN",
      description: "Blacklister, Whitelister ou réinitializer le nombre d'appels d'un MSISDN",
      icon:<FiPhoneCall size={25} />
    },
    {
      title:"Suivi des Activités",
      description: "Surveillez les attributions d'utilisateurs et l'accès au système.",
      icon:<FaFileAlt  size={25} />
    },

  ]

  return (
    <main className="flex-grow">
        <section className="bg-white h-[90vh] py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-9xl md:text-6xl mt-30 font-extrabold text-gray-900 mb-6 leading-tight">
                Simplifiez la Gestion des Utilisateurs
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Gérez sans effort les utilisateurs, les rôles et les permissions
                avec notre système intuitif. Simplifiez l'administration et
                améliorez la sécurité.
              </p>
              <NavLink
                to={"/login"}
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-blue-600 text-white font-bold text-base shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Gérer les Utilisateurs
              </NavLink>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Fonctionnalités Clés
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour prendre le contrôle de votre
                administration utilisateur, en un seul endroit.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {features.map(feature => <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon}/>)}
            </div>
          </div>
        </section>
      </main>
  )
}

export default HeroSection