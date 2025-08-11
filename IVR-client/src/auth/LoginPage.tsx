import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../service/AuthService";
import { HiEyeSlash, HiEye } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";
import { HiXCircle } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/admin");
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
   <>
  {/* Back Link */}
  <NavLink
  to="/about"
  className="absolute top-4 left-4 flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors z-10"
>
  <IoIosArrowRoundBack size={20} />
  <span>À propos</span>
</NavLink>
  {/* Background Wrapper */}
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative flex items-center justify-center px-4 py-12 overflow-hidden">
    
    {/* Decorative floating blur circles */}
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    </div>

    {/* Centered card */}
    <div className="w-full max-w-md">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/20 space-y-8 hover:shadow-2xl transition-all duration-300">
        
        {/* Icon + Title */}
        <div className="text-center space-y-0">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
              <FaCircleUser className="text-white" size={40} />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Bienvenue
          </h2>
          <p className="text-gray-600 text-sm">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-2">
          <div className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
            </div>

            {/* Password */}
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
                  className="w-full px-4 py-2 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
                >
                  {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <HiXCircle size={25} className="text-red-600" />
              <span className="text-sm text-red-700 font-medium">
                Identifiant ou mot de passe incorrect. Veuillez réessayer.
              </span>
            </div>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <NavLink
              to="/forget-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Mot de passe oublié ?
            </NavLink>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <AiOutlineLoading3Quarters size={20} className="animate-spin text-white" />
                <span>Connexion...</span>
              </div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
</>

  );
};

export default LoginPage;
