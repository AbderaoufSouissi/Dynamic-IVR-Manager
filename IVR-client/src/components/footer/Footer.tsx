const Footer = () => {
  return (
    <footer className="flex-shrink-0 bg-white/80 backdrop-blur-lg shadow-sm border-t border-gray-200">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-800 text-sm font-semibold text-center sm:text-left">
            © 2024 Admin Utilisateur. Tous droits réservés.
          </p>

          <nav
            className="flex items-center gap-6 text-sm"
            aria-label="Footer Navigation"
          >
            <a
              href="#"
              className="text-gray-800 hover:text-blue-600 transition-colors font-semibold"
            >
              Conditions d'utilisation
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-blue-600 transition-colors font-semibold"
            >
              Politique de confidentialité
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-blue-600 transition-colors font-semibold"
            >
              Contactez-nous
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
