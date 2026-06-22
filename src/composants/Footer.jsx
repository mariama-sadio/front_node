import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo et description */}
          <div>
            <h1 className="text-2xl font-bold text-blue-400">
              Mini Stack
            </h1>
            <p className="text-gray-400 mt-3">
              Une plateforme communautaire pour poser des questions,
              partager des connaissances et aider les développeurs.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Navigation
            </h2>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                Accueil
              </Link>

              <Link
                to="/ajouter_question"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                Poser une question
              </Link>

              <Link
                to="/profil"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                Mon Profil
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Contact
            </h2>

            <p className="text-gray-400">
              📞 +221 787359983
            </p>

            <p className="text-gray-400">
              📧 mariamasadio796@gmail.com
            </p>

            <p className="text-gray-400 mt-2">
              🌍 Thies, Sénégal
            </p>
          </div>

        </div>

        {/* Ligne séparatrice */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mini Stack Overflow - Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer