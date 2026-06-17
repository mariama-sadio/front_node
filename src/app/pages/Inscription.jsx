import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const URL_BACK = import.meta.env.VITE_URL_BACK;

const Inscription = () => {
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const Register = async (e) => {
    e.preventDefault();

    if (!prenom || !nom || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${URL_BACK}/api/auth/inscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prenom,
            nom,
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Inscription réussie ✔️");
        navigate("/connexion");
      } else {
        alert(result.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Inscription
        </h1>

        <form onSubmit={Register} className="space-y-4">

          <div>
            <label className="block font-medium mb-1">
              Prénom
            </label>
            <input
              type="text"
              placeholder="Votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <p className="text-center mt-4">
            Déjà un compte ?{" "}
            <Link
              to="/connexion"
              className="text-blue-600 font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Inscription;