import { useState, type FormEvent } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineLockReset } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Le mot de passe ne peut pas être vide.");
      return;
    }

    setError("");
    setPasswordReset(true);
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
                <div className="mt-1">
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      error ? "border-red-500" : "border-gray-300"
                    } bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                    id="password"
                    name="password"
                    placeholder="Saisir un nouveau mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "password-error" : undefined}
                  />
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
                  disabled={!password.trim()}
                  className={`flex w-full justify-center rounded-lg px-4 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600  ${
                    password.trim()
                      ? "bg-blue-600 cursor-pointer hover:scale-101 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Réinitialiser le mot de passe
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
