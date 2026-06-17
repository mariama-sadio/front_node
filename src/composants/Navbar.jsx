import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const Deconnexion = () => {
    localStorage.removeItem("token");
    alert("Déconnexion réussie");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto h-[10vh] flex items-center justify-between px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Mini Stack
        </NavLink>

        {/* Menu */}
        <div className="flex items-center gap-6">

          <NavLink
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Accueil
          </NavLink>

          <NavLink
            to="/profil"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Profil
          </NavLink>

          <NavLink
            to="/ajouter_question"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Poser une question
          </NavLink>

          {token ? (
            <button
              onClick={Deconnexion}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Déconnexion
            </button>
          ) : (
            <div className="flex items-center gap-3">

              <NavLink
                to="/connexion"
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Connexion
              </NavLink>

              <NavLink
                to="/inscription"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Inscription
              </NavLink>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;