import React, { useRef, useState, useContext } from 'react';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { PrincipalContext } from '@/context/PrincipalContext';
import Link from 'next/link';
import { BlockUI } from 'primereact/blockui';

const Login = () => {

    const { ingresar, setAcceso } = useContext(PrincipalContext)
    const [datosIncicio, setDatosInicio] = useState({ login: '', password: '' })
    const [blocked, setBlocked] = useState(false)
    const msgs = useRef(null)
    const toast = useRef(null)
    const updateField = (data, field) => {
        setDatosInicio({
            ...datosIncicio,
            [field]: data,
        })

    }

    const cargar = (animacion, mensaje) => {
        return (
            <>
                {animacion === "P" ? <div className="container">
                    <div className='centro-total'>
                        <i className="pi pi-lock" style={{ fontSize: '3rem', color: "var(--primary-color)" }}></i>
                    </div>
                    <div className="cargando">
                        <div className="pelotas"></div>
                        <div className="pelotas"></div>
                        <div className="pelotas"></div>
                        <span className="texto-cargando">{mensaje}</span>
                    </div>
                </div> : <div id="contenedor2">
                    <div className="contenedor-loader">
                        <div className="loader1"></div>
                        <div className="loader2"></div>
                        <div className="loader3"></div>
                        <div className="loader4"></div>

                    </div>
                    <div className="cargando2">{mensaje}</div>
                </div>
                }
            </>
        );
    }

    const mensaje2 = (Estado, Titulo, Mensaje) => {
        msgs.current.show({ severity: Estado, summary: Titulo + "  ", detail: Mensaje, life: 3000 })
    }
    const mensaje = (Estado, Titulo, Mensaje) => {
        toast.current.show({ severity: Estado, summary: Titulo + "  ", detail: Mensaje, life: 3000 });
    }

    let mens = [];

    const validarDatos = () => {
        let Validar = true;
        const requeridos = ["login", "password"];
        requeridos.forEach((field) => {
            if (!datosIncicio[field]) {
                mens.push("" + field.toUpperCase() + " SE ENCUENTRA VACIO");
                Validar = false;
            }
        })
        return Validar;
    }

    const acceso = async () => {
        if (!validarDatos()) {
            mensaje2("error", "ERROR", "=> " + mens.join(",\n"));
        } else {
            setBlocked(true)
            const acceder = await ingresar(datosIncicio)
            if (acceder.acceder !== "") {
                mensaje("error", acceder.acceder, "=> Usuario y/o contraseña incorrectos")
                setBlocked(false)
            }
        }
    }

    return (
        <>

            <div className='topLogin'>
                {/* <Button label="Volver"
                    text
                    raised
                    onClick={(event) => { event.preventDefault(); setAcceso(false) }}
                    style={{ position: 'absolute', right: 0, color: "white" }}
                /> */}
                {/* <Link href={"/"} className='menus' style={{ position: 'absolute', marginRight: 10, right: 0, color: "white" }} >
                    <i className='pi pi-fw pi-home' />
                    <span >Volver</span>
                </Link> */}
            </div>
            <div className="fondo">
                <div className='loginContenedor loginImagen'>
                    <BlockUI blocked={blocked} template={cargar("P", "Validando Datos")}>
                        <Messages ref={msgs} style={{ width: '100%' }} />
                        <Toast ref={toast} />
                        <div className='grid'>
                            <div className='col-12 md:col-6 md:margint40 lg:margint40 lg:col-6'>
                                <div className={'text-center'}>
                                    <div className="font-bold mb-3 text-xl"><i className="pi pi-prime"></i>&nbsp;LUZAM S.R.L</div>
                                    <div className="font-bold text-5xl mb-3">Bienvenido!</div>
                                    <div className="flex flex-wrap justify-content-center gap-3 mb-4">
                                        <Button className='loginBoton' icon="pi pi-youtube" rounded />
                                        <Button className='loginBoton' icon="pi pi-facebook" rounded />
                                        <Button className='loginBoton' icon="pi pi-twitter" rounded />
                                        <Button className='loginBoton' icon="pi pi-whatsapp" rounded />
                                        <Button className='loginBoton' icon="pi pi-telegram" rounded />
                                        <Button className='loginBoton' icon="pi pi-instagram" rounded />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 md:col-6 lg:col-6'>
                                <div className={'text-center'}>
                                    <div className='font-bold mb-3 text-2xl mb-3'>
                                        Inicio
                                    </div>
                                    <div className='mb-5'>
                                        <span className="p-float-label p-input-icon-right">
                                            <i style={{ color: 'white' }} className="pi pi-user" />
                                            <InputText value={datosIncicio.login}
                                                onChange={(e) => updateField(e.target.value, "login")}
                                                id="login"
                                                type="text"
                                                className='login'
                                                style={{ color: "white" }}
                                            />
                                            <label htmlFor="username" style={{ color: 'white' }}>Usuario</label>
                                        </span>
                                    </div>
                                    <div className='mb-5 '>
                                        <span className="p-float-label p-input-icon-right">
                                            <i style={{ color: 'white' }} className="pi pi-lock" />
                                            <InputText value={datosIncicio.password}
                                                onChange={(e) => updateField(e.target.value, "password")}
                                                id="password"
                                                type="password"
                                                className='login '
                                                style={{ color: "white" }}
                                            />
                                            <label htmlFor="Password" style={{ color: 'white' }}>Contraseña</label>
                                        </span>
                                    </div>
                                    <div>
                                        <Button label="Iniciar Sesion"
                                            className="font-bold loginBoton mr-3 p-button-raised"
                                            onClick={acceso} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlockUI>
                </div>
            </div>
        </>
    )
}
export default Login;