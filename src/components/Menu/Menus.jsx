import { useRouter } from 'next/router'
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Avatar } from 'primereact/avatar';
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Ripple } from 'primereact/ripple';
import { BlockUI } from 'primereact/blockui';
import { Tooltip } from 'primereact/tooltip';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';

import Link from 'next/link';
import { temas } from '@/components/Menu/data';
import { CambioContraseña } from '../Componentes/SimpleCambioDatos';

import { PrincipalContext } from '@/context/PrincipalContext';
import { useContext, useState, useEffect, useRef } from "react";

const Menus = () => {
    const { datos, salir, usuario, perfil, cargar, menuBar, cambioTema, tema } = useContext(PrincipalContext)
    const [bloqueo, setBloqueo] = useState(true)
    const [cambioC, setCambioC] = useState(false)
    const [verCon, setVerCon] = useState({ p: "password", i: "pi pi-lock" })
    const [roles, setRoles] = useState(null)

    const router = useRouter()
    const op = useRef(null)
    const toast = useRef(null)
    const msgs = useRef(null)

    useEffect(() => {
        if (datos.message !== "Sin Acceso") {
            //console.log("USUARIO ES ", usuario);
            if (datos.roles.length !== 0) {

                // 1. Ordenar por nombreR
                datos.roles.sort((a, b) => a.nombreR.localeCompare(b.nombreR));

                // 2. Ordenar cada sublista menus por nombreM
                datos.roles.forEach((rol) => {
                    rol.menus.sort((a, b) => a.nombreM.localeCompare(b.nombreM));
                });

                // 3. Modificar las URL en la lista de menus
                datos.roles.forEach((rol) => {
                    rol.menus.forEach((menu) => {
                        menu.url = menu.url.replace('/Bienvenido', '').replace('.lp', '');
                    });
                });
                setRoles(datos)
                setBloqueo(false)
                temas.sort((a, b) => a.nombre.localeCompare(b.nombre))
            }
            else {
                setBloqueo(true)
            }
        }
    }, [datos])

    const template = (options, titulo) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2`;
        const style = { fontSize: '1.0rem' };

        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick} >
                    <span className={toggleIcon} data-pr-tooltip={menuBar !== "" ? titulo : ""}></span>
                    {/* <Ripple pt={{
                        root: { style: { background: 'rgba(75, 175, 80, 0.3)' } }
                    }} /> */}
                </button>
                <span className={titleClassName} style={style}>{titulo.toLocaleUpperCase()}</span>
            </div>
        );
    };

    const ver = () => {
        if (verCon.p === "password") {
            setVerCon({ p: "text", i: "pi pi-unlock" })
        } else {
            setVerCon({ p: "password", i: "pi pi-lock" })
        }
    }

    const mensajeFlotante = (Sticky, Estado, Titulo, Mensaje, Vida) => {
        toast.current.show({ sticky: Sticky, severity: Estado, summary: `${Titulo} `, detail: Mensaje, life: Vida })
    }

    const mensajeEstatico = (Sticky, Estado, Titulo, Mensaje, Vida) => {
        msgs.current.show({ sticky: Sticky, severity: Estado, summary: `${Titulo} `, detail: Mensaje, life: Vida })
    }

    const VerUsuario = () => {
        return (
            <>
                <Card className="mb-3 font-bold" style={{ textAlign: 'center' }} footer={usuario.concat} >
                    {perfil !== null ?
                        <Image src={perfil} alt="Foto Actual" preview className="Imgnormal1 border-round" style={{ height: "150px", width: "100%" }} /> :
                        <Avatar label={usuario.concat.slice(0, 2).toLocaleUpperCase()} size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff', height: "150px", width: "100%" }} />}
                    <div className="p-inputgroup mb-3">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText value={usuario.login} disabled className="w-full" />
                    </div>
                    <div className="p-inputgroup mb-3">
                        <span className="p-inputgroup-addon" onClick={ver} style={{ cursor: 'pointer' }}>
                            <i className={verCon.i}></i>
                        </span>
                        <InputText id="password" value={usuario.contrasenia} type={verCon.p} className="w-full" disabled />
                    </div>
                    <Button onClick={salir} style={{ marginTop: 20 }} >Cerrar Session</Button>
                    <Button onClick={(e) => { e.preventDefault(), setCambioC(true) }} style={{ marginTop: 20 }} label='Cambiar Contraseña' />
                </Card>
                {cambioC && <CambioContraseña
                    dialog={cambioC}
                    setDialog={setCambioC}
                    mensajeEstatico={mensajeEstatico}
                    mensajeFlotante={mensajeFlotante}
                    msgs={msgs} />}
            </>
        )
    }

    const VerUsuarioOculto = () => {
        return (
            <>
                <Button style={{ marginTop: 20 }} type="button" icon="pi pi-user" label="" severity='help' onClick={(e) => op.current.toggle(e)} />
                <div className="titulo" >Datos</div>
                <OverlayPanel ref={op} style={{ width: 250, left: '80px !important', top: 50 }} showCloseIcon>
                    <VerUsuario />
                </OverlayPanel>
            </>
        )
    }
    return (
        <> <Toast ref={toast} position="bottom-center" />
            <TabView style={{ paddingLeft: 10 }}>
                <TabPanel leftIcon="pi pi-bars" style={{ height: '100%' }}>
                    <Tooltip target=".pi" />
                    <div className="titulo" >Menus</div>
                    <BlockUI blocked={bloqueo} template={cargar}>
                        {roles === null ? "" : roles.roles.map((e) =>
                            <Panel key={e.nombreR + "a" + 1} headerTemplate={(e2) => template(e2, e.nombreR)} toggleable>
                                <ul>{e.menus.map((eM) =>
                                    <li key={e.nombreR + eM.nombreM} className={router.route === eM.url ? 'seleccionado tol' : 'tol'} >
                                        <Link href={eM.url} className='menus' >
                                            <i className='pi pi-fw pi-home' data-pr-tooltip={menuBar !== "" ? eM.nombreM : ""} style={{ /* fontSize: '4.5rem', */ paddingRight: 5 }} />
                                            <span >{eM.nombreM}</span>
                                        </Link>
                                    </li>
                                )}
                                </ul>
                            </Panel>
                        )}
                    </BlockUI>
                </TabPanel>
                <TabPanel leftIcon="pi pi-android">
                    <div className="titulo" >Usuario</div>
                    {menuBar !== "" ? <VerUsuarioOculto /> : <VerUsuario />}
                </TabPanel>
                <TabPanel leftIcon="pi pi-cog">
                    <Tooltip target=".pi" />
                    <div className="titulo" >Temas</div>
                    <ul>
                        {temas && temas.map((e, index) => (
                            <li key={index}
                                onClick={(event) => { event.preventDefault(); cambioTema(e.nombre) }}
                                className={tema === e.nombre ? ' seleccionado menus tol' : ' menus tol'}
                            >
                                <i className='pi pi-palette' data-pr-tooltip={menuBar !== "" ? e.nombre : ""}
                                />
                                <span>
                                    {e.nombre}
                                </span>
                            </li>
                        ))}
                    </ul>
                </TabPanel>
            </TabView>
        </>
    )
}

export default Menus;