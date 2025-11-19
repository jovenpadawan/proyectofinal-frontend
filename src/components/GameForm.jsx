import { useState } from "react";
import "./gameform.css";

function GameForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    plataforma: "", 
    anoLanzamiento: "", 
    desarrollador: "",
    descripcion: "",
    imagenPortada: "",
    completado: false, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, completado: !formData.completado });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, anoLanzamiento: Number(formData.anoLanzamiento) || null };

      const response = await fetch("http://localhost:3000/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Juego agregado correctamente.");
        setFormData({
          titulo: "",
          genero: "",
          plataforma: "",
          anoLanzamiento: "",
          desarrollador: "",
          descripcion: "",
          imagenPortada: "",
          completado: false,
        });
      } else {
        alert("Error al guardar el juego.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div>
      <form className="gameForm" onSubmit={handleSubmit}>
        <h2>Agregar nuevo juego</h2>

        <input type="text" id='tituloCase' name="titulo" placeholder="Título del juego" value={formData.titulo} onChange={handleChange} required />
        <input type="text" name="genero" placeholder="Género" value={formData.genero} onChange={handleChange} required />
        <input type="text" name="plataforma" placeholder="Plataforma" value={formData.plataforma} onChange={handleChange} required />
        <input type="number" name="anoLanzamiento" placeholder="Año de lanzamiento" value={formData.anoLanzamiento} onChange={handleChange} required/>
        <input type="text" name="desarrollador" placeholder="Desarrollador" value={formData.desarrollador} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción del juego" value={formData.descripcion} onChange={handleChange} required></textarea>

        <input type="text" name="imagenPortada" placeholder="URL de la imagen del juego" value={formData.imagenPortada} onChange={handleChange} required/>

        <div className="toggleContainer">
          <span>¿Ya completaste este juego?</span>
          <div
            className={`toggleSwitch ${formData.completado ? "active" : ""}`}
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggle(); }}
            aria-pressed={formData.completado}
          >
            <div className="slider"></div>
          </div>
        </div>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GameForm
