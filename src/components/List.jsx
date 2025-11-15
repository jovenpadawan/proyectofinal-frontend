import { useEffect, useState } from "react";
import "./list.css";
import "./gameform.css"; 

function List() {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingGame, setEditingGame] = useState(null);
    const [viewingGame, setViewingGame] = useState(null);
    const [formData, setFormData] = useState({});

    const fetchJuegos = () => {
        setLoading(true);
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
                setError(err.message || "Error desconocido");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchJuegos();
    }, []);
    
    // Función para alternar el estado 'completado' desde la tarjeta (Nuevo)
    const handleToggleCompleted = async (juego) => {
        const newCompletedStatus = !juego.completado;
        const juegoId = juego._id; // Usamos _id para la ruta de la API

        try {
            const res = await fetch(`http://localhost:3000/api/juegos/${juegoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completado: newCompletedStatus }), // Solo enviamos el campo 'completado'
            });

            if (!res.ok) {
                const errorText = await res.text();
                alert(`Error al actualizar el estado: ${errorText || res.statusText}`);
                return;
            }
            
            // Actualizar el estado local para reflejar el cambio inmediatamente
            setJuegos(prevJuegos => 
                prevJuegos.map(j => 
                    j._id === juegoId ? { ...j, completado: newCompletedStatus } : j
                )
            );
            
        } catch (error) {
            alert("Error de conexión con el servidor al intentar cambiar el estado.");
        }
    };


    const startEditing = (juego) => {
        setEditingGame(juego);
        setFormData(juego);
    };

    const handleFormChange = (e) => {
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
        
        if (!editingGame || !editingGame._id) {
            alert("Error: Juego no seleccionado para actualizar.");
            return;
        }

        try {
            const payload = {
                ...formData,
                anoLanzamiento: Number(formData.anoLanzamiento) || null,
            };

            const res = await fetch(`http://localhost:3000/api/juegos/${editingGame._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                alert(`Error al actualizar: ${errorText || res.statusText}`);
                return;
            }
            
            alert("Juego actualizado correctamente.");
            fetchJuegos();
            setEditingGame(null);


        } catch (error) {
            alert("Error de conexión con el servidor");
        }
    }

    const handleDelete = async () => {
        if (!editingGame || !editingGame._id) {
            alert("Error: Juego no seleccionado para eliminar.");
            return;
        }

        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el juego: "${editingGame.titulo}"?`);
        
        if (confirmDelete) {
            try {
                const res = await fetch(`http://localhost:3000/api/juegos/${editingGame._id}`, {
                    method: "DELETE",
                });
    
                if (!res.ok) {
                    const errorText = await res.text();
                    alert(`Error al eliminar el juego: ${errorText || res.statusText}`);
                    return;
                }
                
                alert("Juego eliminado correctamente.");
                fetchJuegos();
                setEditingGame(null);
    
            } catch (error) {
                alert("Error de conexión con el servidor al intentar eliminar.");
            }
        }
    }
    
    // Función para manejar el cierre del modal al hacer clic en el fondo
    const handleCloseModal = (e) => {
        if (e.target.className === 'modalOverlay') {
            setViewingGame(null);
        }
    };


    if (loading) return <div className="listContainer">Cargando juegos...</div>;
    if (error) return <div className="listContainer">Error: {error}</div>;
    if (juegos.length === 0) return <div className="listContainer">No hay juegos disponibles.</div>;

    return (
        <>
            {/* Formulario de Edición */}
            {editingGame && (
                <div className="modalOverlay">
                    <div className="editFormModal">
                        <form className="gameForm" onSubmit={handleUpdate}>
                            <h3>Editar Juego: {editingGame.titulo}</h3>

                            <input type="text" id='tituloCase' name="titulo" placeholder="Título del juego" value={formData.titulo} onChange={handleFormChange} required />
                            <input type="text" name="genero" placeholder="Género" value={formData.genero} onChange={handleFormChange} required />
                            <input type="text" name="plataforma" placeholder="Plataforma" value={formData.plataforma} onChange={handleFormChange} required />
                            <input type="number" name="anoLanzamiento" placeholder="Año de lanzamiento" value={formData.anoLanzamiento} onChange={handleFormChange} required/>
                            <input type="text" name="desarrollador" placeholder="Desarrollador" value={formData.desarrollador} onChange={handleFormChange} required />
                            <textarea name="descripcion" placeholder="Descripción del juego" value={formData.descripcion} onChange={handleFormChange} required></textarea>

                            <input type="text" name="imagenPortada" placeholder="URL de la imagen del juego" value={formData.imagenPortada} onChange={handleFormChange} required/>

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
                            
                            <button type="submit">Guardar Cambios</button>
                            <button type="button" id="cancelButton" onClick={() => setEditingGame(null)}>Cancelar</button>
                            <button 
                                type="button" 
                                id="deleteButton" 
                                onClick={handleDelete}>
                                Eliminar Juego
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Ver Detalles */}
            {viewingGame && (
                <div className="modalOverlay" onClick={handleCloseModal}>
                    <div className="detailModal">
                        <img 
                            src={viewingGame.imagenPortada || '/fallback.jpg'} 
                            alt={viewingGame.titulo} 
                            className="detailModalImage"
                        />
                        <h3>{viewingGame.titulo}</h3>
                        <p><strong>Género:</strong> {viewingGame.genero}</p>
                        <p><strong>Plataforma:</strong> {viewingGame.plataforma}</p>
                        <p><strong>Año de Lanzamiento:</strong> {viewingGame.anoLanzamiento}</p>
                        <p><strong>Desarrollador:</strong> {viewingGame.desarrollador}</p>
                        <p><strong>Completado:</strong> {viewingGame.completado ? '✅' : '❌'}</p>
                        <p><strong>Descripción:</strong></p>
                   
                        <p className="detailDescriptionBox">{viewingGame.descripcion}</p>
                        <button className="editButton" onClick={() => setViewingGame(null)}>Cerrar</button>
                    </div>
                </div>
            )}


            <div className="listContainer">
                {juegos.map((juego, idx) => (
                    <div className="juegoCard" key={juego._id ?? juego.id ?? idx}>
                        <img
                            src={juego.imagenPortada || '/fallback.jpg'}
                            alt={juego.titulo || 'Portada'}
                            className="imageCard"
                        />
                        <h3 className="cardTitle">{juego.titulo}</h3>
                        <div className="cardActions">
            
                            <div className="toggleCardContainer">
                                <span className="toggleLabel">Completado:</span>
                                <div
                                    className={`toggleSwitch ${juego.completado ? "active" : ""}`}
                                    onClick={() => handleToggleCompleted(juego)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggleCompleted(juego); }}
                                    aria-pressed={juego.completado}
                                >
                                    <div className="slider"></div>
                                </div>
                            </div>
                            
                            <button 
                                className="editButton" 
                                onClick={() => setViewingGame(juego)}>
                                Ver Más
                            </button>
                            <button 
                                className="editButton" 
                                onClick={() => startEditing(juego)}>
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default List;