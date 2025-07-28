import { useState } from "react";
import { HiOutlineKey } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { forgetPassword } from "../service/AuthService";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true);
    
    try {
      await forgetPassword(email);
      setEmailSent(true);
    } catch (err: any) {
      console.error(err);
      
      // Handle different types of errors
      if (err.response?.status === 404) {
        setError("Aucun compte associé à cette adresse email n'a été trouvé.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HiOutlineKey className="mx-auto h-10 w-10 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Mot de passe oublié ?
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Ne vous inquiétez pas, nous vous enverrons des instructions de réinitialisation.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10">
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Adresse email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      error 
                        ? 'border-red-300 focus:ring-red-600' 
                        : 'border-gray-300 focus:ring-blue-600'
                    }`}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-lg flex items-start">
                  <MdError size={20} className="mr-2 mt-0.5 flex-shrink-0"/>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full justify-center rounded-lg px-4 py-3 text-base font-semibold text-white shadow-sm cursor-pointer transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:scale-101 hover:bg-blue-700 focus-visible:outline-blue-600'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    "Envoyer l'email de réinitialisation"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-teal-100 text-teal-700 text-sm font-medium px-4 py-3 rounded-lg flex items-center">
              <FaCheck size={20} className="mr-2"/>
              <span>Un email de réinitialisation a été envoyé à votre boîte de réception.</span>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <NavLink
            to="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <IoIosArrowRoundBack size={25}/>Retour à la connexion
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;