import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const Laconnexion = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        `${URL_BACK}/api/auth/connexion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Sauvegarder le token
        localStorage.setItem(
          "token",
          result.token
        );

        // Sauvegarder l'utilisateur
        localStorage.setItem(
          "user",
          JSON.stringify(result.user)
        );

        alert(
          `Connexion réussie ${result.user.prenom} ${result.user.nom}`
        );

        navigate("/");
      } else {
        alert(
          result.message ||
            "Email ou mot de passe incorrect"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            M
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Connexion
          </h1>

          <p className="text-gray-500 mt-2">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={Laconnexion}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse Email
            </label>

            <input
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
          >
            Se connecter
          </button>
        </form>

        {/* Inscription */}
        <div className="text-center mt-6 border-t pt-4">
          <p className="text-gray-600">
            Vous n'avez pas encore de compte ?
          </p>

          <Link
            to="/inscription"
            className="text-blue-600 font-semibold hover:underline"
          >
            Créer un compte
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Connexion;