import { useState } from "react";
import "./gameform.css";

function UpdateForm() {
  const [searchId, setSearchId] = useState("");
  const [foundGame, setFoundGame] = useState(null);
  const [message, setMessage] = useState("");
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

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setMessage("Por favor, introduce el ID del juego para buscar.");
      setFoundGame(null);
      return;
    }

      try {
      const res = await fetch(`http://localhost:3000/api/juegos/id/${searchId.trim()}`);

      if (!res.ok) {
        setMessage("No se encontró ningún juego con este ID.");
        setFoundGame(null);
        return;
      }
      const data = await res.json();
      setFoundGame(data);
      setMessage(`Juego "${data.titulo}" encontrado. Edita los campos y actualiza.`);
      setFormData(data);
    } catch (error) {
      console.error("Error buscando el juego:", error);
      setMessage("Error buscando el juego.");
    }
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleToggle = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      completado: !prevFormData.completado,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!foundGame || !foundGame._id) {
        setMessage("Busca un juego antes de intentar actualizar.");
        return;
    }

    try {
      const payload = {
        ...formData,
        anoLanzamiento: Number(formData.anoLanzamiento) || null,
      };

      const res = await fetch(`http://localhost:3000/api/juegos/${foundGame._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessage(`Error al actualizar el juego: ${errorText || res.statusText}`);
        return;
      }
      setMessage("Juego actualizado correctamente.");
    } catch (error) {
      console.error("Error actualizando el juego:", error);
      setMessage("Error en la conexión con el servidor");
    }
}

  const handleSubmit = handleUpdate;

  return (
    <div>
      <div className="gameForm">
        <h2> Actualización de Juego</h2>
        <input 
          type="number" 
          placeholder="Escribe el ID para buscar..." 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          style={{width: "100%"}}
          min="1"
        />
        <button type="button" onClick={handleSearch} >
          Buscar
        </button>
         {message && <p>{message}</p>}
      </div>


      <form className="gameForm" onSubmit={handleSubmit}>
        <h3>Datos a Editar</h3>

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

        <button type="submit" disabled={!foundGame}>Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateForm