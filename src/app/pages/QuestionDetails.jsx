import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL_BACK = import.meta.env.VITE_URL_FRONT;

const QuestionDetails = () => {
const { id } = useParams();

const [question, setQuestion] = useState(null);
const [reponses, setReponses] = useState([]);
const [contenu, setContenu] = useState("");

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
// Ajouter une réponse
// ==========================
const ajouterReponse = async () => {
if (!contenu) {
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

useEffect(() => {
recupererQuestion();
recupererReponses();
}, []);

if (!question) {
return ( <div className="text-center py-20 text-xl">
Chargement... </div>
);
}

return ( <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-white py-10 px-4">


  <div className="max-w-5xl mx-auto">

    {/* QUESTION */}
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-violet-700 mb-4">
        {question.title}
      </h1>

      <p className="text-gray-700 text-lg">
        {question.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

    </div>

    {/* REPONSES */}
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-violet-700 mb-6">
        Réponses ({reponses.length})
      </h2>

      {reponses.length === 0 ? (
        <div className="text-gray-500">
          Aucune réponse pour le moment.
        </div>
      ) : (
        reponses.map((reponse) => (
          <div
            key={reponse._id}
            className="border-b py-4"
          >
            <p className="text-gray-700">
              {reponse.contenu}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              {new Date(
                reponse.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))
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
