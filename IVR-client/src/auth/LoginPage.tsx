import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example validation (replace with real auth logic)
    if (username === "admin" && password === "admin") {
      // alert("Connecté !");
      setError(false);
      navigate("/")
      
    } else {
      
      
      setError(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue</h1>
          <p className="mt-2 text-sm text-gray-600">
            Veuillez saisir vos identifiants pour vous connecter.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Nom d'utilisateur"
                className="form-input appearance-none rounded-none relative block w-full px-3 py-4  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-700 focus:z-10 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Mot de passe"
                className="form-input appearance-none rounded-none relative block w-full px-3 py-4 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-ring-blue-700 focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="text-sm text-red-700">
              Identifiant ou mot de passe incorrect. Veuillez réessayer.
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <NavLink
                to="/forget-password"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Mot de passe oublié ?
              </NavLink>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;