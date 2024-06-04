import React, { useState, useEffect } from "react"
import VistaPrincipalRegistro from "./Registro"

import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import SimplePdf from "../Componentes/SImplePDF"
import { Datos, exportPDf } from "./Funciones"
import styles from "@/recursos/Styles"
import { Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { Validacion } from "@/recursos/js/Validacion"

const RegistroExpansion = (props) => {
    const [documento, setDocumento] = useState(false)

    const dataNueva = exportPDf(props.props)
    //console.log("DATA NUEVA ", dataNueva);
    /* const nuevoUdf = dataNueva.udf.map(e => ({
        inicio: e.inicio,
        final: e.final,
        unidad: e.unidad
    }))
    const nuevoUdf2 = dataNueva.udf.map(e => ({
        inicio: e.inicio,
        final: e.final,
        unidad: e.unidad,
        descripcion: e.descrip
    }))
    const nuevoDet = dataNueva.det.map(e => ({
        profundidad: e.profundidad,
        descripcion: e.descrip
    }))
    const dataPlana = {
        "I.- DATOS GENERALES": {
            ...dataNueva.d1,
            fecha: Validacion.formatoDMABIEN(dataNueva.d1.fecha),
            latitud: dataNueva.d4.lat,
            longitud: dataNueva.d4.lng
        },
        "II.- DATOS TÈCNICOS": {
            ...dataNueva.d3,
            produndidadDePerforacion: dataNueva.d3.produndidadDePerforacion + " m",
            produndidadDeEntubado: dataNueva.d3.produndidadDeEntubado + " m",
            diametroDeEntubado: dataNueva.d3.diametroDeEntubado + " pulgadas",
            filtros: `${dataNueva.d2.tipo} ${dataNueva.d2.tamaño} ${dataNueva.d2.medida}`
        },
        FILTROS: nuevoUdf,
        "III.- DATOS HIDRAULICOS": dataNueva.d5Medidas,
        OBSERVACIONES: { "": dataNueva.observa },
        "EL POZO FUE ENTUBADO DE ACUERDO AL SIGUIENTE DISEÑO": nuevoDet

    };
    const verQR = {
        ver: true,
        datos: `https://maps.google.com/?q=${dataNueva.d4.lat},${dataNueva.d4.lng}`,
    }
    const verLogo = {
        ver: true,
        ruta: "/icons/img/report.png"
    } */


    const clearSelected = () => {
        setDocumento(false);
    }

    return (<React.Fragment>
        {/*  <Button
            label="Ficha Tecnica"
            onClick={(e) => {
                e.preventDefault()
                setDocumento(true)
            }}
        /> */}
        <VistaPrincipalRegistro
            data={props} />

        {/* <Dialog
            visible={documento}
            modal={true}
            style={{ width: '80vw' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            contentStyle={{ overflow: "visible" }}
            header={" FICHA TECNICA "}
            onHide={() => { clearSelected(); }}
            className="p-fluid"

        >
            {documento && <SimplePdf
                Datos={dataNueva.dataPlana}
                titulo={"FICHA TECNICA POZO DE AGUA"}
                subTitulo={dataNueva.dataPlana["I.- DATOS GENERALES"].nombre}
                verQR={dataNueva.verQR}
                verLogo={dataNueva.verLogo}
                SegundaPagina={SegundaPagina}
                data={{
                    ver: true,
                    FILTROS: dataNueva.nuevoUdf2,
                    subTitulo: dataNueva.dataPlana["I.- DATOS GENERALES"].nombre,
                    diamentro: dataNueva.dataPlana["II.- DATOS TÈCNICOS"].diametroDeEntubado
                }}
                tema={"azul"}
            />}
        </Dialog> */}

    </React.Fragment>)
}

export default RegistroExpansion

export const SegundaPagina = (data) => {
    const { FILTROS, subTitulo, diamentro } = data
    function convertirPulgadas(texto) {
        // Reemplazar " pulgadas" con ''
        const pulgadas = texto.replace(" pulgadas", "''");
        return pulgadas;
    }

    return (
        <Page size="LETTER" style={styles.body2}>
            <Image style={styles.etiqueta} source={"/icons/etiqueta.png"} fixed />
            <Text style={{ ...styles.subtitulo }}>
                {"ENTUBADO DEL POZO"}
            </Text>
            <Text style={{ ...styles.subtitulo }}>
                {subTitulo}
            </Text>
            <View style={{ ...styles.inicio }}>
                <Text style={{ ...styles.text, left: 200 }}>0 + 0.50m Cementado Pozo</Text>
            </View>
            <View style={{ ...styles.inicio3 }}>
                <View style={{ ...styles.inicio2 }}>
                    <Text style={{ ...styles.centro }}>{convertirPulgadas(diamentro)} </Text>
                </View>
            </View>

            {FILTROS && FILTROS.map((d, index) => (<React.Fragment key={index}>
                <View style={{ ...styles.container, ...styles.gris, ...styles.p0 }}>
                    <Text style={[styles.text, styles.topRight]}>{d.inicio} {d.unidad}</Text>
                    <Text style={[styles.text, styles.bottomLeft]}>{d.final} {d.unidad}</Text>
                    <Text style={{ ...styles.text, ...styles.textoUdf }}>{d.descripcion}</Text>
                </View>
                <View style={{ ...styles.container }}>
                </View>
            </React.Fragment>))}
            <View style={{ ...styles.final, ...styles.grisOscuro }}>
                <Text style={[styles.text, styles.topRight]}>Con Decatador de Sedimientos</Text>
            </View>

            <Image style={styles.triangle} source={"/icons/t3.png"} />
            <Text style={[styles.piePagina]} render={({ pageNumber, totalPages }) => (
                `${pageNumber} de ${totalPages}`
            )} fixed />
        </Page>
    );
}

export function SoloPdf({ dataNueva, documento, setDocumento }) {

    const clearSelected = () => {
        setDocumento(false);
    }
    return (
        <React.Fragment>
            <Button
                label="Ficha Tecnica"
                onClick={(e) => {
                    e.preventDefault()
                    setDocumento(true)
                }}
                rounded
                severity="info"
                icon="pi pi-file-pdf"
                tooltip="Ver Pdf"
                tooltipOptions={{ position: "bottom" }}
            />

            <Dialog
                visible={documento}
                modal={true}
                style={{ width: '80vw' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                contentStyle={{ overflow: "visible" }}
                header={" FICHA TECNICA "}
                onHide={() => { clearSelected(); }}
                className="p-fluid"
            >
                {documento && <SimplePdf
                    Datos={dataNueva.dataPlana}
                    titulo={"FICHA TECNICA POZO DE AGUA"}
                    subTitulo={dataNueva.dataPlana["I.- DATOS GENERALES"].nombre}
                    verQR={dataNueva.verQR}
                    verLogo={dataNueva.verLogo}
                    SegundaPagina={SegundaPagina}
                    data={{
                        ver: true,
                        FILTROS: dataNueva.nuevoUdf2,
                        subTitulo: dataNueva.dataPlana["I.- DATOS GENERALES"].nombre,
                        diamentro: dataNueva.dataPlana["II.- DATOS TÈCNICOS"].diametroDeEntubado
                    }}
                    tema={"azul"}
                />}
            </Dialog>

        </React.Fragment>)
}