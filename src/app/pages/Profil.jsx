import React from "react";

const Profil = () => {
  const user = {
    prenom: "Mariama",
    nom: "Sadio",
    email: "mariama@gmail.com",
    questions: 12,
    reponses: 28,
    votes: 95,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-white py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Bannière */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-3xl p-8 shadow-xl text-white">

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-36 h-36 rounded-full bg-white text-violet-700 flex items-center justify-center text-6xl font-bold shadow-lg border-4 border-white">
              {user.prenom.charAt(0)}
            </div>

            {/* Infos */}
            <div>
              <h1 className="text-4xl font-bold">
                {user.prenom} {user.nom}
              </h1>

              <p className="mt-2 text-violet-100">
                {user.email}
              </p>

              <div className="mt-4">
                <span className="bg-white text-violet-700 px-4 py-2 rounded-full font-semibold shadow">
                  Développeur Full Stack
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center hover:scale-105 transition">

            <div className="text-5xl mb-3">❓</div>

            <h2 className="text-4xl font-bold text-violet-600">
              {user.questions}
            </h2>

            <p className="text-gray-500 mt-2">
              Questions publiées
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center hover:scale-105 transition">

            <div className="text-5xl mb-3">💬</div>

            <h2 className="text-4xl font-bold text-green-600">
              {user.reponses}
            </h2>

            <p className="text-gray-500 mt-2">
              Réponses données
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center hover:scale-105 transition">

            <div className="text-5xl mb-3">👍</div>

            <h2 className="text-4xl font-bold text-orange-500">
              {user.votes}
            </h2>

            <p className="text-gray-500 mt-2">
              Votes reçus
            </p>

          </div>

        </div>

        {/* Activités récentes */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-3xl font-bold text-violet-700 mb-8">
            Activités récentes
          </h2>

          <div className="space-y-5">

            <div className="bg-violet-50 border-l-4 border-violet-600 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800">
                Comment utiliser React Router ?
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Question publiée il y a 2 jours
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800">
                Réponse ajoutée sur MongoDB
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Réponse publiée hier
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800">
                +10 votes reçus
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Aujourd'hui
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profil;