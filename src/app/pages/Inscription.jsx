import React, { useState ,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const URL_BACK = import.meta.env.VITE_URL_FRONT;



const Inscription = () => {

  
  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [ prenom , setPrenom ] = useState('');
  const [ nom , setNom ] = useState('');
  const navigate = useNavigate();

  
  // la logique

  const Register = async (e) => {
      e.preventDefault();

        if (!prenom || !nom || !email || !password ) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const data = {
            prenom: prenom,
            nom: nom,
            email: email,
            password: password
        };

        try {
            const response = await fetch(`${URL_BACK}/api/auth/inscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert("Inscription réussie ✔️ Vous pouvez maintenant vous connecter.");
                  navigate('/connexion');
                
            } else {
                alert(result.message || "Erreur lors de l'inscription");
            }

        } catch (error) {
            console.error(error);
            alert("Erreur serveur. Veuillez réessayer.");
        }

  }


  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          M
        </div>

        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Créer un compte
        </h1>

        <p className="text-gray-500 mt-2">
          Rejoignez la communauté Mini Stack Overflow
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={Register} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom
          </label>

          <input
            type="text"
            placeholder="Votre prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom
          </label>

          <input
            type="text"
            placeholder="Votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse Email
          </label>

          <input
            type="email"
            placeholder="exemple@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
        >
          S'inscrire
        </button>

      </form>

      {/* Footer */}
      <div className="text-center mt-6 border-t pt-4">
        <p className="text-gray-600">
          Vous avez déjà un compte ?
        </p>

        <Link
          to="/connexion"
          className="text-blue-600 font-semibold hover:underline"
        >
          Se connecter
        </Link>
      </div>

    </div>

  </div>
);
}

export default Inscription
