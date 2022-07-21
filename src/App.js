import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";

function App() {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Route parent qui check la connexion */}
        <Route path="/private" element={<Private />}>
          {/* Si la route parent valide la connexion alors j'affiche cette route */}
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
