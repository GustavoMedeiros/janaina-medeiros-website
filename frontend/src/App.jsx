import Home from "./pages/Home";
import "./styles/global.css";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  return (
    <>
      <Home />

      {/* BOTÃO WHATSAPP */}
      <a
        href="https://wa.me/5511982723737?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsappButton"
      >
        <FaWhatsapp />
      </a>
    </>
  );
}

export default App;