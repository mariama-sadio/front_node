import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserLayout from "./app/layout/UserLayout";

import Accueil from "./app/pages/Accueil";
import Connexion from "./app/pages/Connexion";
import Inscription from "./app/pages/Inscription";
import Profil from "./app/pages/Profil";
import QuestionForm from "./app/pages/QuestionForm";
import QuestionDetails from "./app/pages/QuestionDetails";

const App = () => {
const router = createBrowserRouter([
{
path: "/",
element: <UserLayout />,


  children: [
    // Accueil
    {
      path: "/",
      element: <Accueil />,
    },

    // Connexion
    {
      path: "/connexion",
      element: <Connexion />,
    },

    // Inscription
    {
      path: "/inscription",
      element: <Inscription />,
    },

    // Profil
    {
      path: "/profil",
      element: <Profil />,
    },

    // Ajouter une question
    {
      path: "/ajouter_question",
      element: <QuestionForm />,
    },

    // Détail d'une question + réponses
    {
      path: "/question/:id",
      element: <QuestionDetails />,
    },
  ],
},


]);

return <RouterProvider router={router} />;
};

export default App;
