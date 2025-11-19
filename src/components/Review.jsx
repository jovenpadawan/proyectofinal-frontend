import { useState } from "react";
import List from './List'
import "./gameform.css";

function Review() {
  const [formData, setFormData] = useState({
    titulo: "",
    puntuacion: 1,
    textResena: "",
    horasJugadas: "",
    dificultad: "",
    recomendacion: "",
  });

  const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   setFormData ({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
   })
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = { ...formData, juegoId };


    try {
      const res = await fetch("http://localhost:3000/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error en la petición.");
      }
        alert("Reseña creada correctamente correctamente.");
        onSucces();
        onclose();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al intentar guardar la rese{a.Por favor, intente de nuevo más tarde.");
    }
  };

  return (
    <div className="modalOverlay">
      <form className="gameForm" onSubmit={handleSubmit}>
        <h2>Agregar reseña</h2>

        <input type="text" id='tituloCase' name="titulo" placeholder={formData.title} value={formData.titulo} onChange={handleChange} required />
        <input type="number" name="puntuacion" placeholder="Puntuación" value={formData.puntuacion} onChange={handleChange} required />
        <input type="number" name="horasJugadas" placeholder="Horas jugadas" value={formData.horasJugadas} onChange={handleChange} required /> 

        <select name="dificultad" placeholder="Dificultad" value={formData.dificultad} onChange={handleChange} required>
          <option value="facil">Fácil</option>
          <option value="medio">Medio</option>
          <option value="dificil">Difícil</option>
        </select>

        <textarea name="descripcion" placeholder="Reseña" value={formData.textResena} onChange={handleChange} required></textarea>

        <div className="toggleContainer">
          <span>¿Recomendarías este juego?</span>
          <div
            className={`toggleSwitch ${formData.recomendacion ? "active" : ""}`}
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggle(); }}
            aria-pressed={formData.recomendacion}
          >
            <div className="slider"></div>
          </div>
        </div>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Review
