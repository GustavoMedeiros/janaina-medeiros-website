import { Scale } from "lucide-react";
import styles from "./Footer.module.css";

const footerLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* GRID */}
        <div className={styles.grid}>

          {/* BRAND */}
          <div className={styles.brand}>
            <a href="#hero" className={styles.logo}>
              <Scale size={18} />
              <span>JSM Advocacia</span>
            </a>

            <p className={styles.description}>
              Assessoria jurídica especializada em Direito PCD. 
              Garantindo direitos e otimizando resultados desde 2018.
            </p>
          </div>

          {/* NAV */}
          <div>
            <h4 className={styles.title}>Navegação</h4>

            <nav className={styles.nav}>
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className={styles.title}>Contato</h4>

            <div className={styles.contact}>
              <p>(11) 98272-3737</p>
              <p>adv.janainamedeiros@gmail.com</p>
              <p>Av. Pereira Barreto, 1120 - Baeta Neves</p>
              <p>São Bernardo do Campo – SP, 09751-000</p>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Dra. Janaina Simon Medeiros. 
            Todos os direitos reservados.
          </p>

          <p>OAB/SP 518.304</p>
        </div>

      </div>
    </footer>
  );
}