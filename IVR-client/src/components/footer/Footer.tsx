

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <a
                className="text-gray-600 hover:text-blue-600 text-sm transition"
                href="#"
              >
                Conditions d'utilisation
              </a>
              <a
                className="text-gray-600 hover:text-blue-600 text-sm transition"
                href="#"
              >
                Politique de confidentialité
              </a>
              <a
                className="text-gray-600 hover:text-blue-600 text-sm transition"
                href="#"
              >
                Contactez-nous
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 Admin Utilisateur. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer