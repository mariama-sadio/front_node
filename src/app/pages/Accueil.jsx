import React from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../../composants/Questions";

const Accueil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const VerificationToken = () => {
    if (token) {
      navigate("/ajouter_question");
    } else {
      navigate("/connexion");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-violet-600 to-blue-500 rounded-3xl p-10 text-white shadow-xl">

          <h1 className="text-5xl font-bold mb-4">
            Bienvenue sur Mini Stack 
          </h1>

          <p className="text-lg opacity-90 max-w-2xl mb-6">
            Posez vos questions, partagez vos connaissances et trouvez des réponses grâce à la communauté des développeurs.
          </p>

          <button
            onClick={VerificationToken}
            className="bg-white text-violet-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            + Poser une question
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-violet-600">150+</h2>
            <p className="text-gray-600">Questions</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-blue-600">300+</h2>
            <p className="text-gray-600">Réponses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-green-600">80+</h2>
            <p className="text-gray-600">Membres</p>
          </div>

        </div>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <input
          type="text"
          placeholder="🔍 Rechercher une question..."
          className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none bg-white shadow-sm"
        />
      </div>

      {/* Titre section */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Questions récentes
        </h2>
      </div>

      {/* Liste des questions */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Questions />
      </div>

    </div>
  );
};

export default Accueil;