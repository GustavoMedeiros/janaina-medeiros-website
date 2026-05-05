import styles from "./Services.module.css";
import { Calculator, Gavel, Building2, FileCheck } from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Benefícios Previdenciários",
    description:
      "Assessoria completa na obtenção de benefícios como BPC/LOAS, aposentadoria por invalidez e auxílio-doença, garantindo seus direitos com segurança jurídica.",
  },
  {
    icon: Gavel,
    title: "Isenções e Direitos Fiscais",
    description:
      "Atuação na garantia de isenções de impostos como IPVA, IPI e ICMS para pessoas com deficiência, assegurando acesso aos benefícios legais.",
  },
  {
    icon: Building2,
    title: "Inventário e Testamento",
    description:
      "Defesa e orientação jurídica para garantir inclusão, acessibilidade e cumprimento dos direitos previstos na legislação brasileira.",
  },
  {
    icon: FileCheck,
    title: "Ações Judiciais e Recursos",
    description:
      "Atuação estratégica em processos judiciais para concessão ou revisão de benefícios, com foco em resultados eficazes e ágeis.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className={styles.services}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={styles.tag}>Áreas de Atuação</span>
          <h2 className={styles.title}>
            Serviços <span>Especializados</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div key={i} className={styles.card}>
              
              <div className={styles.iconBox}>
                <service.icon size={20} />
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className={styles.line}></div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}