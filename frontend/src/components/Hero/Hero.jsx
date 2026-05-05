import styles from "./Hero.module.css";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        
        <span className={styles.tag}>
          DIREITO PCD ESTRATÉGICO
        </span>

        <h1 className={styles.title}>
          Assessoria Especialista na{" "}
          <br />
          <span>Pessoa com Deficiência</span>
        </h1>

        <p>
          Soluções jurídicas personalizadas em direito PCD, isenções fiscais e consultoria. Garanta seu direito com expertise comprovada.
        </p>

        <div className={styles.actions}>
          <a href="#agendamento" className={styles.primary}>
            Agendar Consulta <ArrowRight size={16} />
          </a>

          <a href="#sobre" className={styles.secondary}>
            Conheça Mais
          </a>
        </div>
      </div>

      <div className={styles.line}></div>
    </section>
  );
}