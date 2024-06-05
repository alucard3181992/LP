import React, { useState, useContext, useEffect } from "react";
import PrincipalContextProvider, { PrincipalContext } from "@/context/PrincipalContext";
import { Session } from "@/components/Esqueleto/VistaSkeleton";
import PaginaInicio from "@/components/Inicio/PaginaInicio";
import VistaExterior from "@/components/Inicio/PaginaExterior";
import Login from "@/components/Login/Login";
import { useRouter } from 'next/router';

const VistaFuera = () => {
    const router = useRouter()
    useEffect(() => {
        router.push({
            pathname: "/IngresoSistema/Ingreso", // Cambia esto a la ruta correcta
        });
    }, [])
    return (<React.Fragment>
        {/* <VistaExterior /> */}
        {/* {<Login />} */}
    </React.Fragment>)
}

const VistaDentro = () => (
    <React.Fragment>
        <PaginaInicio />
    </React.Fragment>
)


const VistaPrincipal = () => {
    const { datosIn, setScroll, loading } = useContext(PrincipalContext);
    useEffect(() => {

    }, [datosIn])

    const handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        setScroll(scrollTop);
    }

    return (<React.Fragment>
        {loading ? (
            <Session animacion={"P"} mensaje={"Verificando..."} todo={true} />
        ) : (datosIn ?
            <VistaDentro />
            :
            <div className="fuera" onScroll={handleScroll}>
                <VistaFuera />
            </div>

        )}
    </React.Fragment>)
}

const PrincipalVista = () => {
    useEffect(() => {

    }, [])
    return (
        <PrincipalContextProvider>
            <VistaPrincipal></VistaPrincipal>
        </PrincipalContextProvider>
    )
}
export default PrincipalVista;