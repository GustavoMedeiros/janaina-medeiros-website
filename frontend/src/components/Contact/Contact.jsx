import { useState } from "react";

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import styles from "./Contact.module.css";

const API_URL = "http://localhost:8080/contact";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefone",
    value: "(11) 98272-3737",
    href: "tel:+5511982723737",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "adv.janainamedeiros@gmail.com",
    href: "mailto:adv.janainamedeiros@gmail.com",
  },
  {
    icon: MapPin,
    label: "Escritório",
    value: "Av. Pereira Barreto, 1120 - Baeta Neves, São Bernardo do Campo - SP",
    href: "https://www.google.com/maps/place/Trindade+Isen%C3%A7%C3%B5es/@-23.6882869,-46.5501625,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce4368f4e8500f:0xb459570453eb9b11!8m2!3d-23.6882869!4d-46.5475876!16s%2Fg%2F11f9wwnl95?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      alert("Mensagem enviada com sucesso!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (err) {
      alert("Erro ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={styles.header}
        >
          <span className={styles.subtitle}>Fale Conosco</span>
          <h2 className={styles.title}>
            Entre em <span>Contato</span>
          </h2>
        </motion.div>

        {/* GRID */}
        <div className={styles.grid}>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={styles.info}
          >
            <p className={styles.description}>
              Estamos prontos para atender suas necessidades.
              Entre em contato para uma consulta inicial.
            </p>

            <div className={styles.items}>
              {contactInfo.map((item) => (
                <a key={item.label} href={item.href} className={styles.item}>
                  <div className={styles.iconBox}>
                    <item.icon size={16} />
                  </div>

                  <div>
                    <span className={styles.label}>{item.label}</span>
                    <p className={styles.value}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={styles.form}
          >
            <div className={styles.row}>
              <input
                placeholder="Nome *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                placeholder="E-mail *"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <input
              placeholder="Assunto"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />

            <textarea
              placeholder="Mensagem *"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <button className={styles.button} disabled={loading}>
              <Send size={16} />
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}