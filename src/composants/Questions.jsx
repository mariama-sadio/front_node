import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer toutes les questions
  const recupererQuestions = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${URL_BACK}/api/question`
      );

      const data = await response.json();

      setQuestions(data);
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">

      {/* Titre */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-violet-700">
          Questions récentes
        </h1>

        <p className="text-gray-500 mt-2">
          Retrouvez toutes les questions publiées par la communauté.
        </p>
      </div>

      {/* Chargement */}
      {loading ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-violet-600">
            Chargement...
          </h2>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Aucune question disponible
          </h2>

          <p className="text-gray-500 mt-2">
            Soyez le premier à publier une question.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question) => (
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