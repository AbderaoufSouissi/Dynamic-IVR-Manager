import { useState } from "react";
import { HiOutlineKey } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailSent(true);
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
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-sm cursor-pointer
             transition-transform duration-300 ease-in-out
             hover:scale-101 hover:bg-blue-700
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Envoyer l'email de réinitialisation
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