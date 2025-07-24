import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../service/AuthService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

   

    try {
      const response = await login(username,password)
      
      navigate("/admin")
      console.log("Logged in:", response);
      }
      // Redirect or change state
    catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };


   return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Mot de passe"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
           </div>
           {error && (
              <div className="text-sm text-red-700">
                Identifiant ou mot de passe incorrect. Veuillez réessayer.
              </div>
            )}

          <div className="text-left text-sm">
            <NavLink to="/reset-password" className="font-medium text-blue-600 hover:text-blue-500">
              Mot de passe oublié ?
            </NavLink>
          </div>

          <div>
            <button
              type="submit"
              className="group cursor-pointer relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default LoginPage;