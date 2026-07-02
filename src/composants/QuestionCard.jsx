import React from "react";
import { useNavigate } from "react-router-dom";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const QuestionCard = ({ question, refreshQuestions }) => {
  const navigate = useNavigate();

  // ==========================
  // SUPPRIMER QUESTION
  // ==========================
  const supprimerQuestion = async () => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette question ?"
    );

    if (!confirmation) return;

    try {
      const response = await fetch(
        `${URL_BACK}/api/question/${question._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Question supprimée avec succès ✅");

        if (refreshQuestions) {
          refreshQuestions();
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression");
    }
  };

  // ==========================
  // MODIFIER QUESTION
  // ==========================
  const modifierQuestion = async () => {
    const nouveauTitre = prompt(
      "Modifier le titre",
      question.title
    );

    if (!nouveauTitre) return;

    try {
      const response = await fetch(
        `${URL_BACK}/api/question/${question._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: nouveauTitre,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Question modifiée avec succès ✅");

        if (refreshQuestions) {
          refreshQuestions();
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-4 sm:p-6 hover:shadow-2xl transition duration-300">

      {/* Titre */}
      <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-3">
        {question.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base mb-5">
        {question.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-5">

        {/* Auteur */}
        <div>

          <p className="text-sm text-gray-500">
            Publié par
          </p>

          <p className="font-semibold text-violet-700">
            {question.auteur?.prenom} {question.auteur?.nom}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            📅{" "}
            {new Date(question.createdAt).toLocaleDateString()}
          </p>

        </div>

        {/* Boutons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">

          <button
            onClick={() =>
              navigate(`/question/${question._id}`)
            }
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg transition"
          >
            Réponses
          </button>

          <button
            onClick={modifierQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
          >
            Modifier
          </button>

          <button
            onClick={supprimerQuestion}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Supprimer
          </button>

        </div>

      </div>

    </div>
  );
};

export default QuestionCard;