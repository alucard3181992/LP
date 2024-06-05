import React, { useContext, useState, useEffect } from 'react';

import Menus from '../Menu/Menus';

import Login from '@/components/Login/Login';
import VistaSkeleton, { Paginacion, Session } from '@/components/Esqueleto/VistaSkeleton';
import PrincipalContextProvider, { PrincipalContext } from '@/context/PrincipalContext';

import Link from 'next/link';

import { Button } from "primereact/button";
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { useInterval } from 'primereact/hooks';

import { useRouter } from "next/router";
import MenubarTerminado from '../Componentes/MenuBar';
import { Validacion } from '@/recursos/js/Validacion';
import { ContenidoSidebarResponsive, ContenidoSidebarSize } from '@/components/Inicio/ContenidoSidebar'
import { Image } from 'primereact/image';
//import "primereact/resources/themes/arya-blue/theme.css";

const Vista = ({ Component, pageProps }) => {
    const { empresa,
        eventData,
        panelActividades,
        setPanelActividades,
        actividades,
        setActividades,
        setScroll,
        datosIn,
        loading,
        menuBar,
        setMenuBar,
        setMenuBar2,
        tema,
        mensaje,
    } = useContext(PrincipalContext)

    const router = useRouter()
    const [loading2, setLoading2] = useState(false)
    const [menuLateral, setMenuLateral] = useState(false)
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const handleRouteChangeStart = () => setLoading2(true);
        const handleRouteChangeComplete = () => setLoading2(false);

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        router.events.on("routeChangeError", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            router.events.off("routeChangeError", handleRouteChangeComplete);
        };
    }, [router])

    /* useInterval(
        () => {
            setHora(new Date());
        },
        1000,
    ); */

    const cambioTamaño = () => {
        if (menuBar === "ocultar") {
            setMenuBar("")
            setMenuBar2("")
        } else {
            if (menuBar === "nada") {
                setMenuBar("")
                setMenuBar2("")
            } else {
                if (eventData.width <= 768) {
                    setMenuBar("nada")
                    setMenuBar2("")
                } else {
                    setMenuBar("ocultar")
                    setMenuBar2("ocultar")
                }

            }
        }
    }
    const divider = () => (<Divider align={'center'}>
        <span className="p-tag">{"<<<<>>>>"}</span>
    </Divider>)

    const contedidoSidebar = () => {
        return (<React.Fragment>
            <div className='grid'>
                {divider()}
                < ContenidoSidebarResponsive label={"Tabla Responsiva"} />
                {divider()}
                < ContenidoSidebarSize label={"Tamaño de la Tabla"} />
                {divider()}
                <span className='p-button-text p-button'>{`Tema Actual: ${tema}`}</span>
            </div>
        </React.Fragment>)
    }

    return (
        <>
            {tema && <>
                <link id="theme-link" rel="stylesheet" href={"/icons/themes/" + tema + "/theme.css"} />
            </>}
            {loading ? (
                <>
                    <Session animacion={"P"} todo={false} mensaje={mensaje} />
                </>
            ) : (
                <>
                    {datosIn ? (
                        <>
                            <div className={menuBar}>
                                <div className='top'>
                                    <Button icon={"pi pi-bars"} style={{ height: 30, marginLeft: 25, marginTop: 0, position: 'absolute', left: 0 }} onClick={cambioTamaño} />
                                    <Link href={'/'} >
                                        <Image src='/icons/logo.png' className='logoLuzam' alt='CARGANDO IMAGEN....' width='150' height='45' />
                                    </Link>
                                    {/* <MenubarTerminado /> */}
                                    <Button icon="pi pi-cog" style={{ height: 30, marginRight: 25, marginTop: 0, position: 'absolute', right: 0 }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setMenuLateral(true)
                                        }}
                                        tooltip='Actividades' tooltipOptions={{ position: "left" }}
                                    />
                                    <Sidebar
                                        visible={menuLateral}
                                        position='right'
                                        onHide={() => setMenuLateral(false)}
                                    >
                                        {contedidoSidebar()}
                                    </Sidebar>
                                </div>
                                <div className="menu">
                                    <Menus />
                                </div>
                                <div className={"contenido"}>
                                    {loading2 && <Paginacion animacion={""} todo={true} />}
                                    <Component  {...pageProps} />
                                </div>
                                <div className='bottom'>
                                    <div id="clock">
                                        <p className="date">LUZAM S.R.L</p>
                                        <p className="time">&copy; 2024</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (<>

                        <Component  {...pageProps} />

                    </>)}
                </>
            )
            }

        </>
    )
}

const InicioPage = ({ Component, pageProps }) => {
    return (
        <PrincipalContextProvider>
            <Vista Component={Component} pageProps={pageProps} />
        </PrincipalContextProvider>
    )
}

export default InicioPage;
