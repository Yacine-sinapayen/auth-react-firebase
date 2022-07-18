import { createContext, useState } from "react";

// J'importe les méthodes nécessaires à l'inscription depuis firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

// Création du contexte
export const UserContext = createContext();

// Création du composant d'ordre supérieur
export function UserContextProvider(props) {


const[currentUser, setCurrentUser] = useState();
// Le temps que je reçoive une réponse depuis firebase je vais utiliser une variable
const [loadingData, setLoadingdata] = useState(true);

const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)

  // Gestion de la modale
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
    <UserContext.Provider value={{ modalState, toggleModals, signUp }}>
      {props.children}
    </UserContext.Provider>
  );
}
