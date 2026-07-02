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
            <h2 className="text-3xl font-bold text-blue-600">30+</h2>
            <p className="text-gray-600">Réponses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-green-600">8+</h2>
            <p className="text-gray-600">Membres</p>
          </div>

        </div>
      </div>


      {/* Liste des questions */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Questions />
      </div>

    </div>
  );
};

export default Accueil;