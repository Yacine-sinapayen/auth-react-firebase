import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";

export default function SignUpModal() {
  // Je récupère modalState et ma méthode toggleModals depuis le contexte "UserContext.js"
  const { modalState, toggleModals, signUp } = useContext(UserContext);

  // console.log(signUp)

  // State du msg de validation que je passe à mon <p> "text-danger"
  const [validation, setValidation] = useState(" ");

  const inputs = useRef([]);
  const addInputs = (el) => {
    // Si el existe et qu'il n'est pas déjà dans mon tableau "useRef([])", alors je l'y rajoute
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    // Ce log nous renvoie un objet avec une propriété current à l'intérieur de laquelle il y a mon tableau d'inputs. Les refs de mes inputs récupèrent les values et les insèrent dans un tableau
    // console.log(inputs);

    // Validation données coté front
    // Validation de la longueur du mdp en ciblant les champs 1 et 2 de mon tableau de ref qui correspondent aux deux derniers champs de mon form
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters minimum please");
      // Je sors de la fonction avec un :
      return;
    }
    // On vérifie que les deux mpd soient identiques
    else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match");
      return;
    }

    // Inscription côté server Firebase
    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      //  reset les inputs du form
      formRef.current.reset();
      setValidation("");
      console.log(cred);
    } catch (err) {
      // Gestion des msg d'erreur en fonction de la res côté server firebase
      if(err.code === "auth/invalid-email"){
        setValidation("Email format invalid")
      }

      if(err.code === "auth/email-already-in-use"){
        setValidation("Email already used")
      }
    }
  };

  // cette fonction ferme notre modale et vide le <p> : msg d'erreur du state validation s'il y en a un
  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  }


  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            // onClick n'importe où dans l'overlay je veux que ça ferme ma modale. Je fais appel à la méthode close de mon userContext
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-white p-2">
                  <h5 className="modal-title">Sign Up</h5>
                  <button
                    // méthode close de userContext
                    onClick={closeModal}
                    className="btn-close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form
                    className="sign-up-form"
                    onSubmit={handleForm}
                    // ce ref vide les inputs
                    ref={formRef}
                  >
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        Email adress
                      </label>
                      <input
                        // Méthode qui  est exécutée à chaque ajout d'un input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Password
                      </label>
                      <input
                        // Méthode qui  est exécutée à chaque ajout d'un input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="repeatPwd" className="form-label">
                        Repeat Password
                      </label>
                      <input
                        // Méthode qui  est exécutée à chaque ajout d'un input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="repeatPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
