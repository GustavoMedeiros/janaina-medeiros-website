import { useState, useEffect } from "react";
import styles from "./Appointment.module.css";
import { CalendarDays, Clock } from "lucide-react";
import { api } from "../../services/api";

const timeSlots = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "14:00","14:30","15:00","15:30","16:00","16:30","17:00"
];

const services = [
  "Planejamento Tributário",
  "Contencioso Tributário",
  "Consultoria Corporativa",
  "Compliance Tributário"
];

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
}

export default function Appointment() {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const days = generateCalendar(currentMonth);

  const changeMonth = (dir) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + dir);
    setCurrentMonth(newDate);
  };

  useEffect(() => {
    const handleClickOutside = () => setServiceOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔥 BUSCAR HORÁRIOS OCUPADOS (CORRIGIDO)
  useEffect(() => {
    if (!selectedDate) return;

    const fetchTimes = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];

        const res = await api.get(`/appointments/times?date=${formattedDate}`);
        setBookedTimes(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchTimes();
  }, [selectedDate]);

  // 🆕 BLOQUEAR HORÁRIOS PASSADOS
  const isPastTime = (slot) => {
    if (!selectedDate) return false;

    const now = new Date();

    const [hours, minutes] = slot.split(":");

    const slotDate = new Date(selectedDate);
    slotDate.setHours(hours);
    slotDate.setMinutes(minutes);
    slotDate.setSeconds(0);

    return slotDate < now;
  };

  // 🆕 REGRA FINAL
  const isUnavailable = (slot) => {
    return bookedTimes.includes(slot) || isPastTime(slot);
  };

  // 🚀 ENVIO (CORRIGIDO)
  const handleSubmit = async () => {

    if (!form.name || !form.email || !selectedDate || !selectedTime || !selectedService) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const payload = {
      ...form,
      email: form.email.trim().toLowerCase(),
      service: selectedService,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime
    };

    try {
      const response = await api.post("/appointments", payload);
      console.log(response.data);

      alert("Agendamento realizado com sucesso!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      setSelectedDate(null);
      setSelectedTime("");
      setSelectedService("");
      setBookedTimes([]);

    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        alert(error.response.data);
      } else {
        alert("Erro ao enviar agendamento");
      }
    }
  };

  return (
    <section id="agendamento" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.subtitle}>Agende sua Consulta</span>
          <h2 className={styles.title}>
            Agendamento <span>Online</span>
          </h2>
        </div>

        <div className={styles.grid}>

          {/* CALENDÁRIO */}
          <div className={styles.calendarWrapper}>
            <div className={styles.label}>
              <CalendarDays size={16} className={styles.icon}/>
              <span>Selecione a Data</span>
            </div>

            <div className={styles.calendarBox}>

              <div className={styles.calendarHeader}>
                <button onClick={() => changeMonth(-1)}>‹</button>
                <span>
                  {currentMonth.toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric"
                  })}
                </span>
                <button onClick={() => changeMonth(1)}>›</button>
              </div>

              <div className={styles.weekDays}>
                {["D","S","T","Q","Q","S","S"].map(d => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className={styles.days}>
                {days.map((day, i) => {

                  const today = new Date();

                  const isSelected =
                    selectedDate &&
                    day &&
                    day.toDateString() === selectedDate.toDateString();

                  const isCurrentMonth =
                    day && day.getMonth() === currentMonth.getMonth();

                  const isToday =
                    day && day.toDateString() === today.toDateString();

                  return (
                    <div
                      key={i}
                      onClick={() => day && setSelectedDate(day)}
                      className={`${styles.day}
                        ${isSelected ? styles.selected : ""}
                        ${!isCurrentMonth ? styles.outside : ""}
                        ${isToday ? styles.today : ""}
                      `}
                    >
                      {day?.getDate()}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* HORÁRIOS */}
          <div>
            <div className={styles.labelCenter}>
              <Clock size={16} className={styles.icon}/>
              <span>Selecione o Horário</span>
            </div>

            <div className={styles.timeGrid}>
              {timeSlots.map(slot => {

                const disabled = isUnavailable(slot);

                return (
                  <button
                    key={slot}
                    disabled={disabled}
                    onClick={() => setSelectedTime(slot)}
                    className={`${styles.timeBtn}
                      ${selectedTime === slot ? styles.active : ""}
                      ${disabled ? styles.disabled : ""}
                    `}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FORM */}
          <div className={styles.form}>

            <input
              placeholder="Nome Completo *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="E-mail *"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value.trim() })
              }
            />

            <input
              placeholder="Telefone *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <div className={styles.selectWrapper}>
              <div
                className={styles.select}
                onClick={(e) => {
                  e.stopPropagation();
                  setServiceOpen(!serviceOpen);
                }}
              >
                {selectedService || "Tipo de Serviço *"}
                <span className={styles.arrow}>▾</span>
              </div>

              {serviceOpen && (
                <div className={styles.dropdown}>
                  {services.map(service => (
                    <div
                      key={service}
                      onClick={() => {
                        setSelectedService(service);
                        setServiceOpen(false);
                      }}
                      className={`${styles.option} ${
                        selectedService === service ? styles.selectedOption : ""
                      }`}
                    >
                      {service}
                      {selectedService === service && <span>✔</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <textarea
              placeholder="Mensagem (opcional)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button onClick={handleSubmit} className={styles.submit}>
              Confirmar Agendamento
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}