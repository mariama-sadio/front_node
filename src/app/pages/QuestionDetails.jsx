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
      const response = await fetch(
        `${URL_BACK}/api/question/${id}`
      );

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
      const response = await fetch(
        `${URL_BACK}/api/reponse/${id}`
      );

      const data = await response.json();

      setReponses(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Ajouter réponse
  // ==========================
  const ajouterReponse = async () => {
    if (!contenu.trim()) {
      alert("Veuillez écrire une réponse");
      return;
    }

    try {
      const response = await fetch(
        `${URL_BACK}/api/reponse/ajouter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contenu,
            question: id,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Réponse ajoutée avec succès ✅");

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
  // Modifier réponse
  // ==========================
  const modifierReponse = async (reponse) => {
    const nouveauContenu = prompt(
      "Modifier votre réponse",
      reponse.contenu
    );

    if (!nouveauContenu) return;

    try {
      const response = await fetch(
        `${URL_BACK}/api/reponse/${reponse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contenu: nouveauContenu,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Réponse modifiée ✅");
        recupererReponses();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la modification");
    }
  };

  // ==========================
  // Supprimer réponse
  // ==========================
  const supprimerReponse = async (idReponse) => {
    const confirmation = window.confirm(
      "Voulez-vous supprimer cette réponse ?"
    );

    if (!confirmation) return;

    try {
      const response = await fetch(
        `${URL_BACK}/api/reponse/${idReponse}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Réponse supprimée ✅");
        recupererReponses();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    const chargerDonnees = async () => {
      await recupererQuestion();
      await recupererReponses();
      setLoading(false);
    };

    chargerDonnees();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-bold text-violet-700">
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

        {/* QUESTION */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-violet-700 mb-4">
            {question.title}
          </h1>

          <p className="text-gray-700 text-lg">
            {question.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {question.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-500 mt-4">
            📅{" "}
            {new Date(
              question.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        {/* REPONSES */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-violet-700 mb-6">
            Réponses ({reponses.length})
          </h2>

          {reponses.length === 0 ? (
            <p className="text-gray-500">
              Aucune réponse pour le moment.
            </p>
          ) : (
            <div className="space-y-4">
              {reponses.map((reponse) => (
                <div
                  key={reponse._id}
                  className="border border-violet-100 bg-violet-50 rounded-xl p-4"
                >
                  <p className="text-gray-700">
                    {reponse.contenu}
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <p className="text-sm text-gray-400">
                      📅{" "}
                      {new Date(
                        reponse.createdAt
                      ).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          modifierReponse(reponse)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                      >
                        ✏️ Modifier
                      </button>

                      <button
                        onClick={() =>
                          supprimerReponse(reponse._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        🗑️ Supprimer
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* AJOUTER REPONSE */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-violet-700 mb-4">
            Ajouter une réponse
          </h2>

          <textarea
            rows="6"
            value={contenu}
            onChange={(e) =>
              setContenu(e.target.value)
            }
            placeholder="Écrivez votre réponse..."
            className="w-full border-2 border-violet-200 rounded-xl p-4 focus:outline-none focus:border-violet-500"
          />

          <button
            onClick={ajouterReponse}
            className="mt-4 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl"
          >
            Publier la réponse
          </button>

        </div>

      </div>

    </div>
  );
};

export default QuestionDetails;