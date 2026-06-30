import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsFiltrees, setQuestionsFiltrees] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // Charger les questions
  // ==========================
  const recupererQuestions = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${URL_BACK}/api/question`);

      if (!response.ok) {
        throw new Error("Erreur lors du chargement");
      }

      const data = await response.json();

      setQuestions(data);
      setQuestionsFiltrees(data);
    } catch (error) {
      console.log(error);
      alert("Erreur lors du chargement des questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recupererQuestions();
  }, []);

  // ==========================
  // Recherche
  // ==========================
  useEffect(() => {
    const resultat = questions.filter((question) => {
      const texte = recherche.toLowerCase();

      return (
        question.title.toLowerCase().includes(texte) ||
        question.description.toLowerCase().includes(texte) ||
        question.tags?.join(" ").toLowerCase().includes(texte)
      );
    });

    setQuestionsFiltrees(resultat);
  }, [recherche, questions]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">

      {/* En-tête */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-violet-700">
          Questions récentes
        </h1>

        <p className="text-gray-500 mt-2">
          Retrouvez toutes les questions publiées par la communauté.
        </p>

        {/* Barre de recherche */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="🔍 Rechercher une question..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full border-2 border-violet-200 rounded-xl px-5 py-3 focus:outline-none focus:border-violet-600"
          />
        </div>

      </div>

      {/* Chargement */}
      {loading ? (

        <div className="flex justify-center py-10">
          <div className="text-violet-600 text-xl font-semibold">
            Chargement...
          </div>
        </div>

      ) : questionsFiltrees.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            Aucune question trouvée
          </h2>

          <p className="text-gray-500 mt-2">
            Essayez une autre recherche.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {questionsFiltrees.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              refreshQuestions={recupererQuestions}
            />
          ))}

        </div>

      )}

    </div>
  );
};

export default Questions;