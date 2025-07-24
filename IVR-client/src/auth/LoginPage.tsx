import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../service/AuthService";
import { HiEyeSlash, HiEye } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";
import SpinnerLoader from "../components/spinner/SpinnerLoader";
import { HiXCircle } from "react-icons/hi";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login(username, password)
      navigate("/admin")
      console.log("Logged in:", response);
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
    
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 space-y-8">
          <div className="text-center space-y-2">
          
              <FaCircleUser className="text-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4" size={50} />
          
            <h2 className="text-3xl font-bold text-gray-900">
              Bienvenue
            </h2>
            <p className="text-gray-600 text-sm">
              Connectez-vous à votre compte
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
          
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder="Entrez votre mot de passe"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:text-blue-600"
                  >
                    {showPassword ? (
                      <HiEyeSlash size={20} className="cursor-pointer" />
                    ) : (
                      <HiEye size={20} className="cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            </div>

    
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <HiXCircle size={25} className="text-red-500"/>
                </div>
                <div className="text-sm text-red-700 font-medium">
                  Identifiant ou mot de passe incorrect. Veuillez réessayer.
                </div>
              </div>
            )}

        
            <div className="text-right">
              <NavLink 
                to="/reset-password" 
                className="text-sm cursor-pointer font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Mot de passe oublié ?
              </NavLink>
            </div>

      
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <SpinnerLoader/>
                </div>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;