import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Funciones } from "@/components/Tabla/Funciones";
import { Validacion } from "@/recursos/js/Validacion";
import { datos as DataNueva } from "./data";

const PaginaInicio = () => {
    const [datos, setDatos] = useState([])
    const [bloqueo, setBloqueo] = useState(true)

    useEffect(() => {
        if (!datos.length) {
            /* try {
                consultas.ListarOrden().then((data) => {
                    // Verifica si los datos tienen el formato esperado
                    if (Array.isArray(data)) {
                        setDatos(data);
                    } else {
                        console.log("Los datos recibidos no tienen el formato esperado:", data);
                    }
                });
            } catch (error) {
                console.log("ERROR ", error);
            } */
            //setDatos(DataNueva)
        } else {
            setBloqueo(false);
        }
        console.log("LOS DATOS SON datos", datos);
    }, [datos]);

    return (<React.Fragment>
        {/* {bloqueo ? "CARGANDO DATOS....." :
            <PanelesDeColores lista={datos} />
        } */}
        {Bienvenida()}
    </React.Fragment>)
}
export default PaginaInicio

const colores = (numero) => {
    switch (numero) {
        case 1: return { color: "blue", titulo: "Productos", mensaje: "Mas Vendidos ", metodo: "props.todos.setVisible1(true)", icon: "pi pi-shopping-cart" }
        case 2: return { color: "orange", titulo: "Productos", mensaje: "Ver Imagenes", metodo: "props.todos.setVisible2(true)", icon: "pi pi-map-marker" }
        case 3: return { color: "cyan", titulo: "Proveedores", mensaje: "Proveedores2", metodo: "setVisible", icon: "pi pi-inbox" }
        case 4: return { color: "purple", titulo: "Calendario", mensaje: "Ver Actividades", metodo: "props.todos.setVisible3(true)", icon: "pi pi-comment" }
        default: return { color: "black", titulo: "sintitulo", mensaje: "sintitulo2" }
    }
}

export const Bienvenida = (botoncito) => {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.heading}>¡Bienvenido al Sistema de LUZAM S.R.L!</h1>
                <p style={styles.description}>
                    Somos generadores de soluciones industriales desde 1984, forjando confianza a través de la comercializacion
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #007acc 0%, #00ffcc 100%)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    content: {
        textAlign: 'center',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '20px',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '30px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#007acc',
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    buttonHover: {
        backgroundColor: '#00ffcc',
        transform: 'scale(1.05)',
    },
}

const PanelesDeColores = ({ lista }) => {
    const items = Array.from({ length: 6 }, (v, i) => i);
    return (
        <><div className="grid">
            {lista.map((col, index) => {
                const { color, titulo, mensaje, icon, metodo } = colores(index + 1);
                return <React.Fragment key={index}>
                    <div className={`col-12 ${Funciones.getColumnClass(index, items.length)} ${Funciones.getColumnClassLg(index, items.length)}`}>
                        <div className={" h-full surface-0 shadow-2 p-3 border-1 border-50 border-round bg-" + color + "-300"}>
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-900 font-medium mb-3">{col.cliente.persona.nombre}</span>
                                    <div className="text-900 font-medium text-xl">{col.estado}</div>
                                </div>
                                <div className={"flex align-items-center justify-content-center bg-" + color + "-100 border-round"} style={{ width: '4.5rem', height: '4.5rem' }}>
                                    <i className={icon + " text-" + color + "-500 text-5xl"}></i>
                                </div>
                            </div>
                            <div>
                                <span className="text-green-500 font-medium">{Validacion.formatoDMABIEN(col.fecha)} </span>
                            </div>
                            <div>
                                <span className="text-800">{col.obs} </span>
                            </div>
                            <div>
                                <span className="text-800">
                                    <Button
                                        label='Ver Mas....'
                                        size='small'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            try {
                                                // Evaluar y ejecutar el código almacenado en 'metodo'
                                                eval(metodo);
                                            } catch (error) {
                                                console.error("Error al ejecutar el método:", error);
                                            }
                                        }}
                                        className='text-green-500'
                                        link
                                    />
                                </span>
                            </div>

                        </div>
                    </div>
                </React.Fragment>
            })}
        </div>
        </>
    )
}