import styles from "./About.module.css";
import { Scale, Award, BookOpen } from "lucide-react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import profile from "../../assets/images/profile.jpeg";

export default function About() {
  const stats = [
    { icon: Scale, value: "8+", label: "Anos de Experiência" },
    { icon: Award, value: "100+", label: "Casos Resolvidos" },
    { icon: BookOpen, value: "R$100Mil+", label: "em Créditos Recuperados" },
  ];

  return (
    <section className={styles.about} id="sobre">
      <div className={styles.container}>

        {/* IMAGEM */}
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={profile} alt="Dra. Janaina" />

          <div className={styles.squareTop}></div>
          <div className={styles.squareBottom}></div>
        </motion.div>

        {/* TEXTO */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.tag}>Sobre a Advogada</span>

          <h2 className={styles.title}>
            Dra. Janaina{" "}
            <span>Simon Medeiros</span>
          </h2>

          <p>
            Especialista na defesa dos direitos da Pessoa com Deficiência, a Dra. Janaina Simon Medeiros atua com excelência na garantia de inclusão, acessibilidade e acesso a benefícios legais.
          </p>

          <p>
            Formada pela Universidade Anhanguera, dedica sua carreira a orientar e representar clientes que buscam seus direitos, com uma atuação firme, humanizada e estratégica.
          </p>

          <p>
            Seu compromisso é assegurar dignidade, autonomia e qualidade de vida, oferecendo soluções jurídicas seguras e personalizadas para cada caso
          </p>

          {/* STATS */}
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={styles.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <stat.icon size={20} className={styles.icon} />

                <div className={styles.value}>{stat.value}</div>
                <div className={styles.label}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}