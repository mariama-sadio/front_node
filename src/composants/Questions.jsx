import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const recupererQuestions = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${URL_BACK}/api/question`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();

      setQuestions(data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors du chargement des questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recupererQuestions();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

      {/* En-tête */}
      <div className="mb-8 text-center md:text-left">

        <h1 className="text-3xl sm:text-4xl font-bold text-violet-700">
          Questions récentes
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Retrouvez toutes les questions publiées par la communauté.
        </p>

      </div>

      {/* Chargement */}
      {loading ? (
        <div className="flex justify-center py-20">

          <div className="text-violet-600 text-lg sm:text-xl font-semibold">
            Chargement...
          </div>

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

        <div className="flex flex-col gap-6">

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