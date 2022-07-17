import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  // Je récupère ma méthode toggleModals depuis le contexte "UserContext.js"(destructuring)
  const { toggleModals } = useContext(UserContext);

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        AuthJs
      </Link>
      <div>
        <button
        // je veux ma modale signUp au click. J'utilise la méthode signUp de mon UserContext. Fonction anonyme afin que ma focntion ne sois pas appeler au premier rendu de ma page. Appel seulement au click
        onClick={() => toggleModals("signUp")} 
        className="btn btn-primary">Sign Up</button>
        <button 
        onClick={() => toggleModals("signIn")} 
        className="btn btn-primary ms-2">Sign In</button>
        <button 
        className="btn btn-danger ms-2">Log Out</button>
      </div>
    </nav>
  );
}
