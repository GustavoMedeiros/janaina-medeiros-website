// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Ana Paula S.",
    role: "Beneficiária do BPC/LOAS",
    text: "A Dra. Janaina me ajudou a conseguir meu benefício que havia sido negado. Sempre atenciosa e muito clara em cada etapa do processo. Sou muito grata por todo o suporte.",
  },
  {
    name: "João Carlos M.",
    role: "Aposentado por Invalidez",
    text: "Excelente profissional! Lutou pelo meu direito e conseguiu a concessão do benefício rapidamente. Atendimento humano e extremamente competente.",
  },
  {
    name: "Fernanda R.",
    role: "Cliente com Deficiência",
    text: "Graças à Dra. Janaina consegui garantir meus direitos como pessoa com deficiência. Atendimento impecável, sempre disponível e muito segura no que faz.",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <span className={styles.subtitle}>Depoimentos</span>

          <h2 className={styles.title}>
            O que dizem nossos <span>Clientes</span>
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={styles.card}
            >
              <Quote className={styles.quote} />

              <p className={styles.text}>
                “{t.text}”
              </p>

              <div className={styles.author}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>{t.role}</span>
              </div>

              <div className={styles.corner} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}