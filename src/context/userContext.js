import { createContext, useEffect, useState } from "react";

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
  // signUp nous permet de nous connecter
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState();
  // Le temps que je reçoive une réponse depuis firebase je vais utiliser une variable
  const [loadingData, setLoadingdata] = useState(true);

  // Ce hook va nous permettre d'observer au premier rendu de la page les chgt liés à firebase : signIn ? signUp ? log-out ? Grace à la méthode "onAuthStateChanged" de firebase
  useEffect(() => {
    // on passe en params à la méthode nos identifiants pour montrer que nous sommmes un utilisateur existant "auth" et "currentUser" qui nous retourne une callback.
    // onAuthStateChanged est un observateur qui me permettre de regarder à chaque fois que je me signIn signUp ou log-out, et en fonction de ça, ça va me setCurrentUser(currentUser); e, focntion des infos de mon user récupérées.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingdata(false);
    });
    return unsubscribe;
  }, []);

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
    <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
