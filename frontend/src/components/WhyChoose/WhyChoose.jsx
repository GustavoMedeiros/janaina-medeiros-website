import styles from "./WhyChoose.module.css";
import { Target, ShieldCheck, Lock, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Estratégias Personalizadas",
    description:
      "Cada caso é único. Desenvolvemos soluções sob medida, alinhadas aos seus objetivos financeiros e empresariais.",
  },
  {
    icon: ShieldCheck,
    title: "Expertise Profunda",
    description:
      "Conhecimento técnico atualizado e atuação exclusiva em direito tributário garantem a melhor defesa possível.",
  },
  {
    icon: Lock,
    title: "Sigilo e Segurança",
    description:
      "Total confidencialidade no tratamento das informações. Seu patrimônio e sua privacidade são nossa prioridade.",
  },
  {
    icon: TrendingUp,
    title: "Resultados Comprovados",
    description:
      "Histórico consistente de decisões favoráveis e economia tributária significativa para nossos clientes.",
  },
];

export default function WhyChoose() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.tag}>Diferenciais</span>

          <h2 className={styles.title}>
            Por que escolher a{" "}
            <span>Dra. Janaina?</span>
          </h2>

          <p className={styles.description}>
            A combinação de formação acadêmica de excelência, experiência prática 
            consolidada e compromisso com resultados torna nossa atuação diferenciada 
            no cenário PCD nacional.
          </p>

          <div className={styles.image}>
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
              alt="Justiça"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {reasons.map((reason, i) => (
            <div key={i} className={`${styles.card}`}>
              
              <div className={styles.icon}>
                <reason.icon size={18} />
              </div>

              <div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}