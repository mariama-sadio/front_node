import React from "react";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const QuestionCard = ({ question, refreshQuestions }) => {

  // ==========================
  // SUPPRIMER
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
        refreshQuestions();
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression");
    }
  };

  // ==========================
  // MODIFIER
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
        refreshQuestions();
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6 hover:shadow-xl transition duration-300">

      {/* Titre */}
      <h2 className="text-2xl font-bold text-violet-700 mb-3">
        {question.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-5">
        {question.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t pt-4 flex justify-between items-center">

        <div className="text-gray-500 text-sm">
          📅{" "}
          {new Date(question.createdAt).toLocaleDateString()}
        </div>

        <div className="flex gap-3">

          <button
            onClick={modifierQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            ✏️ Modifier
          </button>

          <button
            onClick={supprimerQuestion}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            🗑️ Supprimer
          </button>

        </div>

      </div>

    </div>
  );
};

export default QuestionCard;