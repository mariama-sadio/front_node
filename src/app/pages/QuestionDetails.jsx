import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const QuestionDetails = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [reponses, setReponses] = useState([]);
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // Charger la question
  // ==========================
  const recupererQuestion = async () => {
    try {
      const response = await fetch(`${URL_BACK}/api/question/${id}`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Charger les réponses
  // ==========================
  const recupererReponses = async () => {
    try {
      const response = await fetch(`${URL_BACK}/api/reponse/${id}`);
      const data = await response.json();
      setReponses(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Ajouter une réponse
  // ==========================
  const ajouterReponse = async () => {
    if (!contenu.trim()) {
      alert("Veuillez écrire une réponse");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Veuillez vous connecter.");
      return;
    }

    const data = {
      contenu,
      question: id,
      auteur: user._id,
    };

    try {
      const response = await fetch(`${URL_BACK}/api/reponse/ajouter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Réponse ajoutée avec succès");

        setContenu("");

        recupererReponses();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert("Erreur serveur");
    }
  };

  // ==========================
  // Supprimer une réponse
  // ==========================
  const supprimerReponse = async (idReponse) => {
    if (!window.confirm("Voulez-vous supprimer cette réponse ?")) {
      return;
    }

    try {
      const response = await fetch(
        `${URL_BACK}/api/reponse/${idReponse}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Réponse supprimée");
        recupererReponses();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert("Erreur serveur");
    }
  };

  useEffect(() => {
    const charger = async () => {
      await recupererQuestion();
      await recupererReponses();
      setLoading(false);
    };

    charger();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Chargement...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Question introuvable
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-white py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* ====================== */}
        {/* QUESTION */}
        {/* ====================== */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-violet-700">
            {question.title}
          </h1>

          <p className="mt-5 text-gray-700">
            {question.description}
          </p>

          <div className="mt-5">

            <p className="text-gray-500 text-sm mb-4">
            Publié par{" "}
            <span className="font-semibold text-violet-700">
              {question.auteur?.prenom} {question.auteur?.nom}
            </span>
          </p>
      
          <p className="text-sm text-gray-500 mt-1">
            📅 {new Date(question.createdAt).toLocaleDateString()}
          </p>

          </div>

        </div>

        {/* ====================== */}
        {/* REPONSES */}
        {/* ====================== */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-violet-700 mb-6">
            Réponses ({reponses.length})
          </h2>

          {reponses.length === 0 ? (

            <p className="text-gray-500">
              Aucune réponse pour le moment.
            </p>

          ) : (

            reponses.map((reponse) => (

              <div
                key={reponse._id}
                className="border border-violet-100 rounded-xl p-5 mb-5 bg-violet-50"
              >

                <p className="text-gray-700">
                  {reponse.contenu}
                </p>

                <div className="mt-4">

                  <p className="text-gray-500 text-sm mb-4">
            Publié par{" "}
            <span className="font-semibold text-violet-700">
              {question.auteur?.prenom} {question.auteur?.nom}
            </span>
          </p>
      
          <p className="text-sm text-gray-500 mt-1">
            📅 {new Date(question.createdAt).toLocaleDateString()}
          </p>

                </div>

                <button
                  onClick={() => supprimerReponse(reponse._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Supprimer
                </button>

              </div>

            ))

          )}

        </div>

        {/* ====================== */}
        {/* AJOUTER UNE REPONSE */}
        {/* ====================== */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-violet-700 mb-4">
            Ajouter une réponse
          </h2>

          <textarea
            rows="6"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Écrivez votre réponse..."
            className="w-full border-2 border-violet-200 rounded-xl p-4 focus:outline-none focus:border-violet-600"
          />

          <button
            onClick={ajouterReponse}
            className="mt-5 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl"
          >
            Publier la réponse
          </button>

        </div>

      </div>

    </div>
  );
};

export default QuestionDetails;