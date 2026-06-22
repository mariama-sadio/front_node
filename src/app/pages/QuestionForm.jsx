import React, { useState } from "react";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !tags) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        `${URL_BACK}/api/question/ajouter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            tags: tags.split(",").map((tag) => tag.trim()),
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Question publiée avec succès ✅");

        setTitle("");
        setDescription("");
        setTags("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-white py-12 px-4">

    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-8 text-center">
        <h1 className="text-4xl font-bold text-white">
          Poser une question
        </h1>
        <p className="text-violet-100 mt-2">
          Décrivez votre problème et obtenez de l'aide de la communauté
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">

        {/* Titre */}
        <div>
          <label className="block font-semibold text-violet-700 mb-2">
            Titre de la question
          </label>

          <input
            type="text"
            placeholder="Ex : Comment utiliser React Router ?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 border-violet-200 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-violet-700 mb-2">
            Description
          </label>

          <textarea
            rows="8"
            placeholder="Décrivez votre problème en détail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-violet-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold text-violet-700 mb-2">
            Étiquettes
          </label>

          <input
            type="text"
            placeholder="React, Node.js, MongoDB"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border-2 border-violet-200 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
          />

          <p className="text-sm text-gray-500 mt-2">
            Séparez les tags par une virgule.
          </p>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
        >
          Publier la question
        </button>

      </form>

    </div>

  </div>
);
};

export default QuestionForm;