import { useEffect, useState } from "react";
import "./list.css";

function List() {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/juegos")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (!Array.isArray(data)) throw new Error("Respuesta no es un array");
                setJuegos(data);
            })
            .catch(err => {
                console.error("Error cargando los juegos:", err);
                setError(err.message || "Error desconocido");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="listContainer">Cargando juegos...</div>;
    if (error) return <div className="listContainer">Error: {error}</div>;
    if (juegos.length === 0) return <div className="listContainer">No hay juegos disponibles.</div>;

    return (
        <div className="listContainer">
            {juegos.map((juego, idx) => (
                <div className="juegoCard" key={juego._id ?? juego.id ?? idx}>
                    <img
                        src={juego.imagenPortada || '/fallback.jpg'}
                        alt={juego.titulo || 'Portada'}
                        className="imageCard"
                    />
                    <h3 className="cardTitle">{juego.titulo}</h3>
                </div>
            ))}
        </div>
    );
}

export default List;