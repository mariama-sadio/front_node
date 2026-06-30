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

  // Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem("user"));

  // Vérification
  console.log("Utilisateur :", user);
  alert("Utilisateur :\n" + JSON.stringify(user, null, 2));

  if (!user) {
    alert("Veuillez vous connecter.");
    return;
  }

  const data = {
    contenu,
    question: id,
    auteur: user._id,
  };

  console.log("Données envoyées :", data);
  alert("Données envoyées :\n" + JSON.stringify(data, null, 2));

  try {
    const response = await fetch(`${URL_BACK}/api/reponse/ajouter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);

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
  // Supprimer réponse
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
      <div className="text-center py-20">
        Chargement...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-20 text-red-500">
        Question introuvable
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white p-8 rounded-xl shadow">

          <h1 className="text-3xl font-bold">
            {question.title}
          </h1>

          <p className="mt-4">
            {question.description}
          </p>

        </div>

        <div className="bg-white p-8 rounded-xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Réponses ({reponses.length})
          </h2>

          {reponses.length === 0 ? (
            <p>Aucune réponse.</p>
          ) : (
            reponses.map((reponse) => (
              <div
                key={reponse._id}
                className="border rounded-lg p-4 mb-4"
              >
                <p>{reponse.contenu}</p>

                <button
                  onClick={() => supprimerReponse(reponse._id)}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Supprimer
                </button>
              </div>
            ))
          )}

        </div>

        <div className="bg-white p-8 rounded-xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Ajouter une réponse
          </h2>

          <textarea
            rows="6"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={ajouterReponse}
            className="mt-4 bg-violet-600 text-white px-6 py-3 rounded-lg"
          >
            Publier la réponse
          </button>

        </div>

      </div>

    </div>
  );
};

export default QuestionDetails;