import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Validacion, addFooterAndTitle } from "@/recursos/js/Validacion";

const DocumentoPdfRegistro = (props) => {
    const { documento, setDocumento, datos, } = props
    const [previewVisible, setPreviewVisible] = useState(false)
    const [pdfDataUri, setPdfDataUri] = useState(null)
    const iframeRef = useRef(null);
    console.log("DATOS ES", datos.props);
    const data = datos.props
    const clearSelected = () => {
        setDocumento(false)
        setPreviewVisible(false)
        setPdfDataUri(null)
    }

    const doc = new jsPDF({
        format: "letter"
    })

    const d1 = {
        departamento: data.dp,
        provincia: data.pv,
        nombre: data.nombre,
        ubicacion: data.nombre,
        perforador: data.perforador,
        fecha: Validacion.formatoDMABIEN(data.fecha),
    }
    //console.log("DATA ES", d1);
    const pdfGenerar = () => {
        //multiples(doc)
        //console.log("DOC", doc.internal)
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let horizontalPos = pageWidth / 2;
        let verticalPos = pageHeight - 10;
        const pages = doc.internal.getNumberOfPages()
        const title = "FICHA TECNICA POZO DE AGUA"
        doc.setFontSize(20);
        doc.text(title, horizontalPos, 45, {
            align: 'center'
        });
        doc.setLineWidth(0.5)
        doc.line(14, 46, 201, 46)

        doc.text(data.nombre, horizontalPos, 59, {
            align: 'center'
        })
        doc.setLineWidth(0.5)
        doc.line(14, 60, 201, 60)

        //doc.line(x,y,x2,y2)(los dos primeros marcan el punto inicial .... el x2 lo q recorre y el y2 donde termina)
        doc.text("I.- DATOS GENERALES ", 14, 75, {
            align: 'left'
        })
        doc.setLineWidth(0.5)
        doc.line(14, 76, 93, 76)
        let verticalPos2 = 85;
        doc.setFontSize(13);
        // Itera sobre las entradas del objeto
        Object.entries(d1).forEach(([key, value]) => {
            // Agrega la etiqueta (key) y el valor al documento
            doc.text(`${key.toLocaleUpperCase()}:`, 14, verticalPos2, { align: 'left' });
            doc.text(`${value}`, 55, verticalPos2, { align: 'left' });
            // Incrementa la posición vertical para la próxima línea
            verticalPos2 += 7;
        })
        doc.setFontSize(20);
        verticalPos2 += 7
        doc.text("II.- DATOS TECNICOS ", 14, verticalPos2, {
            align: 'left'
        })
        doc.setLineWidth(0.5)
        doc.line(14, verticalPos2 + 1, 88, verticalPos2 + 1)

        doc.setFontSize(13);
        // Itera sobre las entradas del objeto
        data.dt.forEach((dato, index) => {
            // Calcula la posición vertical
            verticalPos2 += 7;
            // Agrega la información al documento
            doc.text(`${dato.nombre}: ${dato.medida} ${dato.unidad}`, 14, verticalPos2, { align: 'left' });
        });
        doc.text(`TIPO DE CAÑERIA: ${data.tipo}`, 14, verticalPos2 += 7, {
            align: 'left'
        })
        doc.text(`FILTROS: ${data.filtro} ${data.filtrom} ${data.filtroum}`, 14, verticalPos2 += 7, {
            align: 'left'
        })
        doc.text(`UBICACION DE FILTROS:`, 14, verticalPos2 += 7, {
            align: 'left'
        })
        const columnas = [
            { inicio: 'Inicio', final: 'Final', unidad: 'Medida' },
        ]
        doc.autoTable({
            startY: verticalPos2,
            head: columnas,
            body: data.udf,
            margin: { left: 107 },
            styles: { halign: 'center' },
            theme: "plain"
        })
        verticalPos2 = doc.lastAutoTable.finalY
        doc.setFontSize(20);
        doc.text("III.- DATOS HIDRAULICOS ", 14, verticalPos2 += 7, {
            align: 'left'
        })
        doc.setLineWidth(0.5)
        verticalPos2 += 1
        doc.line(14, verticalPos2, 102, verticalPos2)
        doc.setFontSize(13);
        data.dh.forEach((dato, index) => {
            // Calcula la posición vertical
            verticalPos2 += 7;
            // Agrega la información al documento
            doc.text(`${dato.nombre}: ${dato.medida} ${dato.unidad}`, 14, verticalPos2, { align: 'left' });
        });
        /* doc.text(data.observa, 14, verticalPos2 += 7, {
            align: 'left'
        }) */
        /* const maxWidth = 180; // Ancho máximo en puntos
        const texto = data.observa;
        const lines = doc.splitTextToSize(texto, maxWidth);

        lines.forEach((line, index) => {
            doc.text(line, 14, verticalPos2+=7, { align: 'left' });
        }); */
        const maxWidth = 180; // Ancho máximo en puntos
        const texto = data.observa;

        const lineHeight = doc.getLineHeight();
        const lines = doc.splitTextToSize(texto, maxWidth);
        verticalPos2 += 7
        lines.forEach((line, index) => {
            // Verifica si queda espacio suficiente en la página actual
            if (verticalPos2 + (index + 1) * lineHeight < doc.internal.pageSize.height) {
                doc.text(line, 14, verticalPos2 += 7, { align: 'left' });
            } else {
                // Cambia a la siguiente página
                doc.addPage();
                verticalPos2 = 20; // O la posición inicial que desees en la nueva página
                doc.text(line, 14, verticalPos2, { align: 'left' });
            }
        });
        //lineas o underline para los cuates






        const bannerHeight = 38;
        const imageFilePath = "/icons/fondo.jpg";
        // Inserta la imagen como banner
        //console.log();




        addFooterAndTitle(doc, pages, title, imageFilePath, bannerHeight, false)
        const dataUri = doc.output('datauristring')
        setPdfDataUri(dataUri)
        setPreviewVisible(true)
    }

    useEffect(() => {
        if (documento) {
            pdfGenerar() // Llamada automática al montar el componente si el PDF no se ha generado
        }
    }, [documento])

    return (
        <>
            <Dialog
                visible={documento}
                modal={true}
                style={{ width: '80vw' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                contentStyle={{ overflow: "visible" }}
                header={" Usuarios "}
                onHide={() => { clearSelected(); }}
                className="p-fluid"
            >
                {previewVisible && (
                    <iframe
                        ref={iframeRef}
                        title="PDF Preview"
                        style={{ width: '100%', height: '70vh', border: 'none' }}
                        src={pdfDataUri}
                    />
                )}
            </Dialog>
        </>
    );
}

export default DocumentoPdfRegistro;
