import React, { useState, useEffect } from "react";

import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Validacion } from "@/recursos/js/Validacion";
import QRCode from 'qr-image';
import { Funciones } from "../Tabla/Funciones";
import styles from "@/recursos/Styles";
const SimplePdf = ({ Datos, titulo, subTitulo, verQR, verLogo, SegundaPagina, data, tema }) => {

    useEffect(() => {
        //console.log("DATOS", Datos);
    }, [Datos]);

    const tamaño = (celdas) => {
        let tam = 100 / celdas
        return tam.toFixed(1)
    }

    const QRaBASE64 = (value) => {
        const qrCode = QRCode.imageSync(value, { type: 'png' });
        const base64Img = Validacion.pasarBase64(qrCode)
        return base64Img;
    }
    const da = "j"
    da.toLocaleUpperCase()

    const renderAtributosSimples = () => {
        return Object.entries(Datos).map(([titulo, objeto]) => (
            <View key={titulo}>
                <Text style={{ ...styles.atributoValor, textDecoration: "underline", marginBottom: 5 }}>{titulo}:</Text>
                {!Array.isArray(objeto) ?
                    Object.entries(objeto).map(([clave, valor]) => (
                        <View key={clave} style={styles.atributoContainer}>
                            {clave !=="iddg" ? <Text style={styles.atributoLabel}>{(Funciones.formatearCadena(clave)).toLocaleUpperCase()}: {valor}</Text>
                            :<Text style={styles.atributoLabel}></Text>}

                        </View>
                    ))
                    :
                    renderLista(objeto)
                }
            </View>
        ));
    }

    const renderLista = (lista) => {
        const headers = Object.keys(lista[0]); // Tomamos las claves del primer elemento como encabezados

        return (
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header, styles[tema]]} fixed>
                    {headers.map((header, index) => (
                        <Text key={index} style={{ ...styles.row1, ...styles.padding, width: tamaño(headers.length) + "%", color: tema === "gris" ? "#000" : "#FFF" }}>{header.toLocaleUpperCase()}</Text>
                    ))}
                </View>

                {lista.map((row, rowIndex) => (
                    <View key={rowIndex} style={[styles.row, rowIndex % 2 !== 0 ? styles[`${tema}Claro`] : ""]} wrap={false}>
                        {headers.map((header, colIndex) => (
                            <Text key={colIndex} style={{ ...styles.row1, ...styles.padding, width: tamaño(headers.length) + "%" }}>
                                {row[header]}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
        );
    }

    return (<PDFViewer style={{ width: '100%', height: '70vh' }}>
        <Document
            title="Alucard"
            author='Alucard'
            creator='Alucard'
            keywords='Pdf'

        >
            <Page
                size="LETTER"
                style={styles.body}
            >
                <Image style={styles.etiqueta} source={"/icons/etiqueta.png"} fixed />
                {/* <Text style={styles.encabezado} fixed>
                    ~ Creado con react-pdf ~
                </Text> */}
                {verQR.ver ? <Image key={"Mapa"} style={[styles.ImgQr]} src={QRaBASE64(verQR.datos)} /> : ""}
                {verLogo.ver && <Image key={"Mapa2"} style={[styles.ImgLogo]} src={verLogo.ruta} />}
                <Text style={{ marginTop: verQR.ver ? 30 : verLogo.ver ? 30 : 10, ...styles.titulo }}>
                    {titulo}
                </Text>
                <Text style={{ ...styles.subtitulo }}>
                    {subTitulo.toLocaleUpperCase()}
                </Text>
                {renderAtributosSimples()}
                <Text style={[styles.piePagina]} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} de ${totalPages}`
                )} fixed />
            </Page>
            {data.ver && SegundaPagina(data)}
        </Document>
    </PDFViewer >)
}

export default SimplePdf