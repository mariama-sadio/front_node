import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const Deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Déconnexion réussie");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[10vh]">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Mini Stack
        </NavLink>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Accueil
          </NavLink>

          <NavLink to="/profil" className="text-gray-700 hover:text-blue-600 font-medium">
            Profil
          </NavLink>

          {token ? (
            <button
              onClick={Deconnexion}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Déconnexion
            </button>
          ) : (
            <div className="flex items-center gap-3">

              <NavLink
                to="/connexion"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Connexion
              </NavLink>

              <NavLink
                to="/inscription"
                className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg"
              >
                Inscription
              </NavLink>

            </div>
          )}
        </div>

        {/* MENU BURGER (MOBILE) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700"
          >
            Accueil
          </NavLink>

          <NavLink
            to="/profil"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700"
          >
            Profil
          </NavLink>

          {token ? (
            <button
              onClick={Deconnexion}
              className="w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <NavLink
                to="/connexion"
                onClick={() => setMenuOpen(false)}
                className="block border border-blue-600 text-blue-600 text-center py-2 rounded-lg"
              >
                Connexion
              </NavLink>

              <NavLink
                to="/inscription"
                onClick={() => setMenuOpen(false)}
                className="block bg-violet-500 text-white text-center py-2 rounded-lg"
              >
                Inscription
              </NavLink>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;