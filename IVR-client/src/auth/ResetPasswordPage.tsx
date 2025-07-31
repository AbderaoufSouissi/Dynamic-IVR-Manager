import { useState, useEffect, type FormEvent } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineLockReset } from "react-icons/md";
import { NavLink, useSearchParams } from "react-router-dom";
import { resetPassword } from "../service/AuthService";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Extract token from URL parameters
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // Check if token exists when component mounts
  useEffect(() => {
    if (!token) {
      setError("Token de réinitialisation manquant ou invalide.");
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Le mot de passe ne peut pas être vide.");
      return;
    }

    if (!token) {
      setError("Token de réinitialisation manquant ou invalide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);

    try {
      // Pass both token and password to the resetPassword function
      await resetPassword(token, password);
      setPasswordReset(true);
    } catch (err: any) {
      console.error(err);
      
      // Handle different types of errors
      if (err.response?.status === 400) {
        setError("Token invalide ou expiré.");
      } else if (err.response?.status === 404) {
        setError("Token de réinitialisation non trouvé.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex justify-center items-center">
            <MdOutlineLockReset size={50} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Réinitialisez votre mot de passe
          </h1>
          <p className="mt-2 text-gray-600">
            Saisissez votre nouveau mot de passe.
          </p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {!passwordReset ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="password"
                >
                  Nouveau mot de passe
                </label>
                <div className="mt-1 relative">
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      error ? "border-red-500" : "border-gray-300"
                    } bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                    id="password"
                    name="password"
                    placeholder="Saisir un nouveau mot de passe"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "password-error" : undefined}
                    disabled={!token || isLoading}
                  />
                  <button
                                      type="button"
                                      onClick={togglePasswordVisibility}
                                      className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:text-blue-600"
                                    >
                                      {showPassword ? (
                                        <HiEyeSlash size={20} />
                                      ) : (
                                        <HiEye size={20} />
                                      )}
                                    </button>
                </div>
                {error && (
                  <p
                    id="password-error"
                    className="mt-2 text-sm text-red-600"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!password.trim() || !token || isLoading}
                  className={`flex w-full justify-center rounded-lg px-4 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600  ${
                    password.trim() && token && !isLoading
                      ? "bg-blue-600 cursor-pointer hover:scale-101 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Réinitialisation...
                    </span>
                  ) : (
                    "Réinitialiser le mot de passe"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-teal-100 text-teal-700 text-sm font-medium px-4 py-3 rounded-lg flex items-center">
              <FaCheck size={20} className="mr-2" />
              <span>Votre mot de passe a été réinitialisé avec succès.</span>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <NavLink
            to="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <IoIosArrowRoundBack size={25} />
            Retour à la connexion
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;