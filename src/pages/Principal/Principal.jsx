import React, { useState, useContext, useEffect } from "react";
import PrincipalContextProvider, { PrincipalContext } from "@/context/PrincipalContext";
import { Session } from "@/components/Esqueleto/VistaSkeleton";
import PaginaInicio from "@/components/Inicio/PaginaInicio";
import VistaExterior from "@/components/Inicio/PaginaExterior";

const VistaFuera = () => (
    <React.Fragment>
        <VistaExterior />
    </React.Fragment>
)

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
        console.log("SOY ESCROll");
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