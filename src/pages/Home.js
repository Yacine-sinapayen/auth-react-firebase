import React, {useContext} from "react";
import { UserContext } from "../context/userContext";

export default function Home() {

//  J'import mon context pour pouvoir changer le texte de la page home en fonction  du status de l'utilisateur
  const {currentUser} = useContext(UserContext);

  return (
    <div className="conatainer p-5">
      <h1 className="display-3 text-light">
        { currentUser ? "Welcom buddy" : "Hi, Sign Up or Sign In"}
      </h1>
    </div>
  );
}
