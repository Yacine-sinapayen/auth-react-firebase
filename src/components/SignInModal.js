import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignInModal() {
  // Je récupère modalState et ma méthode toggleModals depuis le contexte "UserContext.js"
  const { modalState, toggleModals, signIn } = useContext(UserContext);

  // À chaque fois que l'on récupère des hooks de react router dom il faut les instancier
  const navigate = useNavigate();

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

    // Inscription côté server Firebase
    try {
      // la const cred me sert à lire ce que le fomr me retourne
        const cred = await signIn(
          inputs.current[0].value,
          inputs.current[1].value
        );

      //  reset les inputs du form
      // formRef.current.reset();
      setValidation("");

      // console.log(cred);
      // je ferme ma modal
      toggleModals("close");
      // route vers laquelle je redirige le user si la connexion est validée
      navigate("/private/private-home");
    } catch {
      setValidation("Wopsy, email and/or passord incorrect");
    }
  };

  // cette fonction ferme notre modale et vide le <p> : msg d'erreur du state validation s'il y en a un
  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
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
                      <label htmlFor="signInEmail" className="form-label">
                        Email adress
                      </label>
                      <input
                        // Méthode qui  est exécutée à chaque ajout d'un input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Password
                      </label>
                      <input
                        // Méthode qui  est exécutée à chaque ajout d'un input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signInPwd"
                      />
                    </div>
                    <p className="text-danger mt-1">{validation}</p>
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
