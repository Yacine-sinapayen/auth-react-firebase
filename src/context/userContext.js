import { createContext, useState, useEffect } from "react";

// Création du contexte
export const UserContext = createContext();

// Création du composant d'ordre supérieur
export function UserContextProvider(props) {
  // Initialisation du state de mes modales signIn et signUp
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false,
  });

  //   Méthode pour fermer mes modales
  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  return (
    <UserContext.Provider value={{ modalState, toggleModals }}>
      {props.children}
    </UserContext.Provider>
  );
}
