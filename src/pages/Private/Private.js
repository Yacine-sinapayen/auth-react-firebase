// C'est la pages qui va nous permettre de vérifier la connexion du user.
// Si elle est validée elle donne accès à la page "PrivateHome"
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

// Outlet (sortie) : permet de montrer des routes imbriquées à un endroit précis de mon app sous react router v6
// useLocation : donne des infos sur la location
// Navigate : qui nous permet de naviguer
import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function Private() {
  const { currentUser } = useContext(UserContext);

  // Si currentUser n'est pas true, donc s'il n'y a pas de user je te renvoie à l'accueil
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      {/* Où est-ce que j'ai envie de montrer le contenu de ma route imbriqué "PrivateHome ? Ici grace à mon  Outlet <=> PriviteHome */}
      <Outlet />
    </div>
  );
}
