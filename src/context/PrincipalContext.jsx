import React, { createContext, useState, useEffect } from "react";
import { LoginServicio } from "@/services/LoginServicio";
import { useLocalStorage, useResizeListener } from 'primereact/hooks';
import { useRouter } from 'next/router';
import { Validacion } from "@/recursos/js/Validacion";

import { SplitButton } from "primereact/splitbutton";
export const PrincipalContext = createContext();

const PrincipalContextProvider = (props) => {
    const [eventData, setEventData] = useState({ width: 0, height: 0 });

    const [bindWindowResizeListener, unbindWindowResizeListener] = useResizeListener({
        listener: (event) => {
            if (eventData.width >= 1024) {
                //console.log("TAM SI", eventData.width);
                if (menuBar2 !== "ocultar") { setMenuBar("") }
            } else {
                //console.log("TAM NO", eventData.width);
                if (eventData.width <= 768) {
                    setMenuBar("nada")
                } else {
                    setMenuBar("ocultar")
                }
            }
            setEventData({
                width: event.currentTarget.innerWidth,
                height: event.currentTarget.innerHeight
            });
        }
    });

    const principalServicio = new LoginServicio()
    const [datos, setDatos] = useState([])
    const [count, setCount] = useLocalStorage(0, 'count')
    const [menuBar, setMenuBar] = useLocalStorage('', 'menuBar');
    const [menuBar2, setMenuBar2] = useLocalStorage('', 'opcion');
    //const [tema, setTema] = useLocalStorage('arya-blue', 'tema');

    const [datosIn, setDatosIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [acceso, setAcceso] = useState(false)
    const [mensaje, setMensaje] = useState("")
    const [scroll, setScroll] = useState(0)
    const values = {
        login: "",
        contrasenia: "",
        concat: "",
    }
    const [usuario, setUsuario] = useState(values)
    const [perfil, setPerfil] = useState(null)
    const router = useRouter()
    const [panelActividades, setPanelActividades] = useState(false)
    const [actividades, setActividades] = useState([])
    const [registro, setRegistro] = useState()
    const [empresa, setEmpresa] = useState()
    const [size, setSize] = useState("normal")
    const [responsive, setResponsive] = useState()
    const [tema, setTema] = useState("mira")

    useEffect(() => {
        try {
            setLoading(true)
            principalServicio.verificar().then((data) => {
                setDatos(data)
                setDatosIn(data.estado)
                if (data.estado) {
                    setEmpresa(data.empresa)
                    principalServicio.listarDatos(data.datos[0].idu).then((data) => {
                        if (data.conf && data.conf.length !== 0) {
                            setTema(data.conf[0].tema)
                            setResponsive(data.conf[0].responsivo)
                            setSize(data.conf[0].tam)
                            setUsuario(data)
                        }
                    })
                }
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }, [count]);

    Validacion.addLocale();
    useEffect(() => {
        //console.log("SOY EL Q ACTUALIZA 2");
        setEventData({ width: window.innerWidth, height: window.innerHeight });
        if (window.innerWidth <= 1024) { setMenuBar("ocultar") } else { setMenuBar("") }
        if (window.innerWidth <= 768) { setMenuBar("nada") } else { setMenuBar("") }
    }, []);

    useEffect(() => {
        //console.log("SOY EL Q ACTUALIZA 3");
        bindWindowResizeListener();

        return () => {
            unbindWindowResizeListener();
        };
    }, [bindWindowResizeListener, unbindWindowResizeListener]);

    const ingresar = async (datosIncicio) => {
        const respuesta = await principalServicio.listar(datosIncicio).then((data) => {
            let acceder = { acceder: "", usuario: "" }
            if (data.message === "Usuario Permitido") {
                setLoading(true)
                setMensaje("Verificando Inicio de Session...")
                setCount(1)
                router.push("/")
                setAcceso(false)
                setDatosIn(true)
                acceder.usuario = data.usuario
                return acceder
            } else {
                acceder.acceder = "Acceso Denegado"
                return acceder
            }
        })
        setLoading(false)
        setMensaje("Verificando...")
        return respuesta
    }

    const agregarConf = (usuario, campo, valor) => {
        principalServicio.agregarConf(usuario, campo, valor)
    }

    const cambioTema = (nombre) => {
        setTema(nombre)
        agregarConf(usuario.idu, "tema", nombre)
    }


    const salir = () => {
        setLoading(true)
        principalServicio.eliminar().then((data) => {
            setUsuario(values)
            setPerfil("")
            setCount(2)
            setMensaje("  Finalizando Session...")
            router.push("/")
        })
        setMenuBar2("ocultar")
        setLoading(false)
        setMensaje("Verificando...")
    }

    const cargar = () => {
        return (
            <div> <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i> </div>
        );
    }

    const CambioContra = async (valor) => {
        const res = await principalServicio.listarConf(usuario.idu, valor, usuario)
        return res.data
    }

    //
    const ayuda = {
        small: "Pequeño",
        large: "Grande",
        normal: "Normal"
    }
    const ayuda2 = {
        Pequeño: "small",
        Grande: "large",
        Normal: "normal"
    }
    const t = (tamaño) => {
        let tam = "1rem"
        switch (tamaño) {
            case "large":
                tam = "2rem"
                break;
            case "normal":
                tam = "1.5rem"
                break;
            case "small":
                tam = "1rem"
                break;
        }
        return tam
    }

    const p = (i, size2) => {
        return (<React.Fragment>
            <span
                className={i}
                style={{
                    color: "var(--primary-color)",
                    fontSize: t(size2)
                }}
            />
        </React.Fragment>)
    }
    const itemRenderer = (item, clase) => {
        //console.log("EL ITEM ES ", item.label, " Reponsive es", responsive)
        let cl = ""
        let cl2 = ""
        if (clase === "R") {
            cl = responsive && item.label === "Responsivo" ? "seleccionado" : ""
            cl2 = !responsive && item.label === "Scroll" ? "seleccionado" : ""
        } else {
            cl = ayuda[size] === item.label ? "seleccionado" : ""
        }
        return (
            <a className={"flex align-items-center p-menuitem-link " + cl + " " + cl2} onClick={item.command}>
                {/* <span className={item.icon} /> */}
                {p(item.icon, ayuda2[item.label])}
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        )
    }

    const itemsSize = [
        {
            label: 'Grande',
            icon: 'pi pi-table',
            command: () => {
                setSize("large")
                agregarConf(usuario.idu, "tam", "large")
            },
            template: (e) => itemRenderer(e, "T")
        },
        {
            label: 'Normal',
            icon: 'pi pi-table',
            command: () => {
                setSize("normal")
                agregarConf(usuario.idu, "tam", "normal")

            },
            template: (e) => itemRenderer(e, "T")
        },
        {
            label: 'Pequeño',
            icon: 'pi pi-table',
            command: () => {
                setSize("small")
                agregarConf(usuario.idu, "tam", "small")

            },
            template: (e) => itemRenderer(e, "T")
        },
    ]
    const itemsRes = [
        {
            label: 'Responsivo',
            icon: 'pi pi-android',
            command: () => {
                setResponsive(true)
                agregarConf(usuario.idu, "responsivo", true)
            },
            template: (e) => itemRenderer(e, "R")
        },
        {
            label: 'Scroll',
            icon: 'pi pi-android',
            command: () => {
                setResponsive(false)
                agregarConf(usuario.idu, "responsivo", false)
            },

            template: (e) => itemRenderer(e, "R")
        },
    ]

    return (
        <PrincipalContext.Provider
            value={{
                datos,
                count,
                datosIn,
                loading,
                ingresar,
                salir,
                usuario,
                perfil,
                cargar,
                menuBar,
                setMenuBar,
                setMenuBar2,
                setTema,
                tema,
                mensaje,
                acceso,
                setAcceso,
                panelActividades,
                setPanelActividades,
                actividades,
                setActividades,
                registro,
                setRegistro,
                eventData,
                empresa,
                scroll,
                setScroll,
                size,
                setSize,
                responsive,
                setResponsive,
                itemsRes,
                itemsSize,
                p,
                agregarConf,
                cambioTema,
                CambioContra
            }}
        >
            {props.children}
        </PrincipalContext.Provider>
    );
}

export default PrincipalContextProvider;