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

    // récupérer l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Veuillez vous connecter");
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

            // envoyer l'id de l'utilisateur
            auteur: user._id,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {

        alert("Question publiée avec succès");

        setTitle("");
        setDescription("");
        setTags("");

      } else {

        alert(result.message);

      }

    } catch (error) {

      console.log(error);

      alert("Erreur serveur");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-white py-12 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-8 text-center">

          <h1 className="text-4xl font-bold text-white">
            Poser une question
          </h1>

          <p className="text-violet-100 mt-2">
            Décrivez votre problème.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >

          <div>

            <label className="block font-semibold text-violet-700 mb-2">
              Titre
            </label>

            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full border-2 border-violet-200 rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block font-semibold text-violet-700 mb-2">
              Description
            </label>

            <textarea
              rows="8"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full border-2 border-violet-200 rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block font-semibold text-violet-700 mb-2">
              Tags
            </label>

            <input
              type="text"
              value={tags}
              onChange={(e)=>setTags(e.target.value)}
              placeholder="React, Node, MongoDB"
              className="w-full border-2 border-violet-200 rounded-xl px-4 py-3"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl"
          >
            Publier la question
          </button>

        </form>

      </div>

    </div>

  );

};

export default QuestionForm;