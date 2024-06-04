import { InputText } from "primereact/inputtext";

import React, { useState, useCallback, useEffect, useContext, useRef } from "react";
import SimpleInputTextoMemo from "../Componentes/SimpleInputTexto";
import SimpleCalendarMemo from "../Componentes/SimpleCalendar";
import { VistaMapaLocalizar, VistaMapaNoLocalizar } from "./MapaRegistro";
import SimpleInputNumberMemo from "../Componentes/SimpleInputNumber";
import { Datos, exportPDf, compararObjetos, compararObjetos2 } from "./Funciones";
import { det } from "./Funciones";

import { TablaFiltros, TablaEntubado } from "./TablaFiltros";
import { InputTextarea } from "primereact/inputtextarea";
import { useUpdateEffect } from 'primereact/hooks';
import { Button } from "primereact/button";
import { RegistroContext } from "@/context/RegistroContext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from 'primereact/toast';
import { Messages } from "primereact/messages";

import MenubarTerminado from "../Componentes/MenuBar";
import SimpleListaMemo from "../Componentes/SimpleLista";
import { Funciones } from "../Tabla/Funciones";
import { SoloPdf } from "./RegistroExpansion";

import { useRouter } from 'next/router';

const VistaPrincipalRegistro = ({ data }) => {

    const { nuevo, modificar, registros, Cargar, Cargar2 } = useContext(RegistroContext)
    const router = useRouter();
    const [visible3, setVisible3] = useState(false)

    const toast = useRef(null)
    const msgs = useRef(null)

    const datosGeneralesVacio = {
        departamento: "",
        provincia: "",
        nombre: "",
        ubicacion: "",
        perforador: "",
        fecha: null,
    }
    const datosTecnicosVacios = {
        profundidadDePerforacion: 0.0,
        profundidadDeEntubado: 0.0,
        diametroDeEntubado: 0.0,
        tipoDeCañeria: ""
    }
    const filtrosVacios = {
        tipo: "",
        tamaño: 0.0,
        medida: "mm",

    }
    const ubicacionFiltrosVacio = { inicio: 0.0, final: 0.0, unidad: "m" }
    const datosHidarulicosVacios = {
        NivelEstatico: 0.0, NivelDinamico: 0.0,
        CaudalDeExplotacion: 0.0, ProfundidadDeInstalacionDeBomba: 0.0,
        TipoDeBombaRecomendada: 0.0
    }
    const [datosGenerales, setDatosGenerales] = useState(datosGeneralesVacio)
    const [datosTecnicos, setDatosTecnicos] = useState(datosTecnicosVacios)
    const [datosFiltros, setDatosFiltros] = useState(filtrosVacios)
    const [ubicacion, setUbicacion] = useState({ lat: '', lng: '', ubicado: '' })
    const [ubicacionFiltros, setUbicacionFiltros] = useState(ubicacionFiltrosVacio)
    const [ubicacionFiltrosLista, setUbicacionFiltrosLista] = useState([])
    const [ubicacionFiltrosListaOriginal, setUbicacionFiltrosListaOriginal] = useState([])
    const [datosHidarulicos, setDatosHidarulicos] = useState(datosHidarulicosVacios)
    const [obs, setObs] = useState("Sin Observacion")
    const [vista, setVista] = useState(false)
    const [dataPrueba, setDataPrueba] = useState("")
    const [noValidos, setNoValidos] = useState({})
    const [documento, setDocumento] = useState(false)
    const [dataNueva, setDataNueva] = useState(null)
    const [bloqueo, setBloqueo] = useState(true)
    const [bloqueoFiltros, setBloqueoFiltros] = useState(false)
    const { registroOC } = router.query;
    const [datosOriginales, setDatosOriginales] = useState()
    const [bloqueo2, setBloqueo2] = useState(false)

    useUpdateEffect(() => {
        const ejecutarFunciones = async () => {
            setVista(false)
            if (registros.length !== 0) {
                setBloqueo(true)
                if (registroOC) {
                    const ordenb = registros.filter(item => item.iddg === parseInt(registroOC))
                    if (ordenb.length > 0) {
                        const d = await Datos(ordenb[0])
                        await llenadoDatos(d)
                        setDataNueva(await exportPDf(ordenb[0]))
                        setBloqueo(false)
                    } else {
                        console.log("No se encontró la orden")
                        setBloqueo(false)
                    }
                } else {
                    if (data) {
                        const d = await Datos(data.props ? data.props : data)
                        await llenadoDatos(d)
                        setDataNueva(await exportPDf(data.props ? data.props : data))
                        setBloqueo(false)
                    } else {
                        setBloqueo(false)
                    }

                }
            }
            //console.log("AQUI 2")
            //setBloqueo(false)
        }

        ejecutarFunciones()
    }, [registros, data, registroOC])


    const nuevoRegistro = {
        dg: {
            iddg: null,
            dp: null,
            pv: null,
            perforador: null,
            nombre: null,
            ubicacion: null,
            lat: null,
            longi: null,
            fecha: null,
            tipo: null,
            filtro: null,
            filtrom: null,
            filtroum: null,
            observa: null,
        },
        dt: null,
        dh: null,
    }

    const llenadoObjetoOriginal = (d) => {
        nuevoRegistro.dg.iddg = d.d1.iddg
        nuevoRegistro.dg.dp = d.d1.departamento
        nuevoRegistro.dg.pv = d.d1.provincia
        nuevoRegistro.dg.perforador = d.d1.perforador
        nuevoRegistro.dg.nombre = d.d1.nombre
        nuevoRegistro.dg.ubicacion = d.d1.ubicacion
        nuevoRegistro.dg.lat = d.d4.lat
        nuevoRegistro.dg.longi = d.d4.lng
        nuevoRegistro.dg.fecha = d.d1.fecha
        nuevoRegistro.dg.tipo = d.d3.tipoDeCañeria
        nuevoRegistro.dg.filtro = d.d2.tipo
        nuevoRegistro.dg.filtrom = d.d2.tamaño
        nuevoRegistro.dg.filtroum = d.d2.medida
        nuevoRegistro.dg.observa = d.observa
        //ahora dt
        nuevoRegistro.dt = { ...d.d3 }
        nuevoRegistro.dh = { ...d.d5 }
        //console.log("NUEVO REGISTRO", nuevoRegistro)
        setDatosOriginales(nuevoRegistro)
    }
    const llenadoDatos = async (d) => {
        return new Promise((resolve) => {
            setVista(true)
            setDatosGenerales(d.d1)
            setDatosFiltros(d.d2)
            setDatosTecnicos(d.d3)
            setObs(d.observa ? d.observa : "Sin Observaciones")
            setUbicacionFiltrosLista(d.udf)
            setUbicacionFiltrosListaOriginal(d.udf)
            setUbicacion(d.d4)
            setDatosHidarulicos(d.d5)
            const resultado = det(d.d2, d.d3, d.udf)
            setDataPrueba(resultado)
            llenadoObjetoOriginal(d)
            resolve()
        })
    }

    const resetValores = () => {
        setDatosGenerales(datosGeneralesVacio);
        setDatosTecnicos(datosTecnicosVacios);
        setDatosFiltros(filtrosVacios);
        setUbicacion({ lat: '', lng: '', ubicado: '' });
        setUbicacionFiltros(ubicacionFiltrosVacio);
        setUbicacionFiltrosLista([]);
        setUbicacionFiltrosListaOriginal([]);
        setDatosHidarulicos(datosHidarulicosVacios);
        setObs("Sin Observacion");
        setVista(false);
        setDataPrueba("");
        setNoValidos({});
        setDocumento(false);
        setDataNueva(null);
        setBloqueo(true);
        setBloqueoFiltros(false);
    }

    const Coordenadas = useCallback(
        (coord) => {
            console.log("ME LLAMAN COORDENADAS");
            setUbicacion((prevUbicacion) => ({
                ...prevUbicacion,
                lat: coord.lat,
                lng: coord.lng,
                ubicado: "(Punto de entrega establecido)"
            }));
            const nuevosErrores = { ...noValidos }
            delete nuevosErrores["lat"]
            delete nuevosErrores["lng"]
            delete nuevosErrores["ubicado"]
            setNoValidos(nuevosErrores)
        },
        [setUbicacion]
    );

    function agregarElementos() {
        if (ubicacionFiltros.inicio !== 0 && ubicacionFiltros.final !== 0) {
            setUbicacionFiltrosLista([
                ...ubicacionFiltrosLista,
                ubicacionFiltros
            ])
            setUbicacionFiltros({
                ...ubicacionFiltros,
                inicio: 0,
                final: 0,
            })
            const nuevosErrores = { ...noValidos }
            delete nuevosErrores["udf"]
            setNoValidos(nuevosErrores)
            setBloqueoFiltros(false)
        } else {
            setBloqueoFiltros(true)
        }

    }
    const registro = async () => {
        setBloqueo2(true)
        //const descrip = `FILTRO ${datosFiltros.tipo} ${datosTecnicos.diametroDeEntubado} PULGADAS`
        const nuevoUdf = ubicacionFiltrosLista.map(e => ({
            inicio: e.inicio,
            final: e.final,
            unidad: e.unidad,
            //descripcion: descrip
        }))
        //const resultado = det(datosFiltros, datosTecnicos, ubicacionFiltrosLista)
        const objeto = {
            ...datosGenerales,
            ...datosTecnicos,
            ...datosHidarulicos,
            ...datosFiltros,
            udf: nuevoUdf,
            ...ubicacion,
        }
        const nuevoRegistro2 = {
            dg: {
                dp: datosGenerales.departamento,
                pv: datosGenerales.provincia,
                perforador: datosGenerales.perforador,
                nombre: datosGenerales.nombre,
                "ubicacion": datosGenerales.ubicacion,
                lat: ubicacion.lat,
                longi: ubicacion.lng,
                fecha: datosGenerales.fecha,
                tipo: datosTecnicos.tipoDeCañeria,
                filtro: datosFiltros.tipo,
                filtrom: datosFiltros.tamaño,
                filtroum: datosFiltros.medida,
                observa: obs,
            },
            dt: {
                ...datosTecnicos
            },
            dh: {
                ...datosHidarulicos,
            },
            udf: nuevoUdf,
            //det: resultado

        }
        const camposInvalidos = Funciones.validarCampos(objeto)
        setNoValidos(camposInvalidos)

        if (Object.keys(camposInvalidos).length === 0) {
            // Continuar con la operación pertinente
            // ...
            if (vista) {
                const res2 = compararObjetos(ubicacionFiltrosListaOriginal, ubicacionFiltrosLista, datosOriginales, nuevoRegistro2)
                if (res2) {
                    const respuesta = await modificar(res2)
                    if (respuesta.message === "TODO BIEN") {
                        setBloqueo2(false)
                        mensajeFlotante(false, "success", "EXITO", "REGISTRO MODIFICADO", 4000)
                    } else {
                        setBloqueo2(false)
                        mensajeEstatico(true, "error", `ERROR `, 5000)
                    }
                } else {
                    setBloqueo2(false)
                    mensajeFlotante(false, "info", "INFO", "NO SE ENCONTRARON CAMBIOS", 4000)
                }
            } else {
                const respuesta = await nuevo(nuevoRegistro2)
                if (respuesta.message === "TODO BIEN") {
                    router.push({
                        pathname: router.pathname,
                        query: { registroOC: respuesta.id },
                    })
                    setBloqueo2(false)
                    mensajeFlotante(false, "success", "EXITO", "REGISTRO COMPLETADO", 4000)
                } else {
                    setBloqueo2(false)
                    mensajeEstatico(true, "error", `ERROR `, 5000)
                }
            }
        } else {
            console.log("TIENE")
            // Manejar los errores (mostrar mensajes, etc.)
            // ...
            console.log("INVALIDOS", camposInvalidos);
            setBloqueo2(false)
            mensajeEstatico(true, "error", "ERROR... ", "CAMPOS VACIOS", 5000)
        }
    }

    const mensajeFlotante = (Sticky, Estado, Titulo, Mensaje, Vida) => {
        toast.current.show({ sticky: Sticky, severity: Estado, summary: `${Titulo} `, detail: Mensaje, life: Vida })
    }

    const mensajeEstatico = (Sticky, Estado, Titulo, Mensaje, Vida) => {
        msgs.current.show({ sticky: Sticky, severity: Estado, summary: `${Titulo} `, detail: Mensaje, life: Vida })
    }
    const botonRegistro = () => {

        return (<Button
            label={vista ? "Modificar" : "Registrar"}
            className="custom-button w-full" size="large"
            onClick={registro}
            icon="pi pi-file-edit" />)
    }
    return (<React.Fragment>
        {bloqueo ? "SOY BLOQUEO ESTOY EN TRUE" : "SOY BLOQUEO ESTOY EN FALSE"}
        {bloqueo ? <Cargar />
            :
            <React.Fragment>
                {bloqueo2 && <Cargar2 />}
                <Messages ref={msgs} />

                <div /* className={vista ? "intocable" : ""} */
                    /* style={{ textTransform: "uppercase" }} */>

                    {/* <div className="font-bold">{vista ? "MODIFICANDO" : "NORMAL"}</div> */}
                    <div className="font-bold text-2xl mb-5" style={{ textDecoration: "underline" }}>FICHA TECNICA DE POZO DE AGUA {vista ? "(MODIFICAR)" : "(REGISTRAR)"}</div>
                    <div className="border-round flex flex-wrap justify-content-center gap-5 mb-5" style={{ background: 'var(--surface-a)', padding: 5 }}>
                        {vista && <SoloPdf dataNueva={dataNueva}
                            documento={documento}
                            setDocumento={setDocumento}
                        />}
                        {vista && registroOC && <Button label="Nuevo Registro"
                            onClick={(e) => {
                                e.preventDefault()
                                router.push({
                                    pathname: router.pathname,
                                    query: { registroOC: null },
                                })
                                resetValores()
                            }}
                            rounded
                            severity="warning"
                            icon="pi pi-file"
                            tooltip="Nuevo Registro"
                            tooltipOptions={{ position: "bottom" }}
                        />}
                        <Button
                            label={vista ? "Modificar" : "Registrar"}
                            onClick={registro}
                            rounded
                            severity="success"
                            icon="pi pi-file-edit"
                            tooltip={vista ? "Guardar Cambios" : "Guardar"}
                            tooltipOptions={{ position: "bottom" }}
                        />
                    </div>
                    <Toast ref={toast} />
                    <div className="grid">
                        <div className="col-12 md:col-6 lg:col-6">
                            <div className="font-bold mb-5 underline">I.- Datos Generales</div>
                            {datosGenerales && Object.keys(datosGenerales).map((campos, index) => (
                                campos === "fecha" ?
                                    <SimpleCalendarMemo
                                        campo={campos}
                                        cliente={datosGenerales}
                                        setCliente={setDatosGenerales}
                                        original={datosGeneralesVacio}
                                        key={index}
                                        validados={noValidos[campos]}
                                        setNoValidos={setNoValidos}
                                        noValidos={noValidos}
                                    />
                                    : (campos === "departamento" ? <SimpleListaMemo
                                        campo={campos}
                                        cliente={datosGenerales}
                                        setCliente={setDatosGenerales}
                                        original={datosGeneralesVacio}
                                        key={index}
                                        validados={noValidos[campos]}
                                        setNoValidos={setNoValidos}
                                        noValidos={noValidos} />
                                        : (campos === "iddg" ? "" :
                                            <SimpleInputTextoMemo
                                                campo={campos}
                                                cliente={datosGenerales}
                                                setCliente={setDatosGenerales}
                                                original={datosGeneralesVacio}
                                                key={index}
                                                validados={noValidos[campos]}
                                                setNoValidos={setNoValidos}
                                                noValidos={noValidos}
                                            />
                                        )
                                    )
                            )
                            )}

                        </div>
                        <div className={noValidos["lat"] || noValidos["lng"] || noValidos["ubicado"] ? "col-12 md:col-6 lg:col-6 error p-error" : "col-12 md:col-6 lg:col-6"}>
                            <div className="flex gap-2 w-full">
                                <span className="p-float-label w-full">
                                    <InputText value={ubicacion.lat} disabled className="w-full" />
                                    <label>Latitud</label>
                                </span>
                                <span className="p-float-label w-full">
                                    <InputText value={ubicacion.lng} disabled className="w-full" />
                                    <label>Longitud</label>
                                </span>
                            </div>
                            {!vista ? <VistaMapaLocalizar Coordenadas={Coordenadas} />
                                :
                                <VistaMapaNoLocalizar vista={{ vista, ubicacion }} Coordenadas={Coordenadas} />
                            }
                            {noValidos["lat"] || noValidos["lng"] || noValidos["ubicado"] && < small className="p-error font-bold errorMio">{`Ubicacion es requerido`}</small>}
                        </div>
                        <div className="col-12 md:col-6 lg:col-6">
                            <div className="font-bold mb-5 underline">II.- Datos Tecnicos</div>
                            {datosTecnicosVacios && Object.keys(datosTecnicosVacios).map((campos, index) => (
                                campos === "tipoDeCañeria" ?
                                    <SimpleInputTextoMemo
                                        campo={campos}
                                        cliente={datosTecnicos}
                                        setCliente={setDatosTecnicos}
                                        original={datosTecnicosVacios}
                                        key={index}
                                        validados={noValidos[campos]}
                                        setNoValidos={setNoValidos}
                                        noValidos={noValidos}
                                    />
                                    :
                                    <SimpleInputNumberMemo
                                        campo={campos}
                                        cliente={datosTecnicos}
                                        setCliente={setDatosTecnicos}
                                        original={datosTecnicosVacios}
                                        key={index}
                                        prefijo={campos === "diametroDeEntubado" ? " pulgadas" : " m"}
                                        fraccion={2}
                                        validados={noValidos[campos]}
                                        setNoValidos={setNoValidos}
                                        noValidos={noValidos}
                                    />
                            )
                            )}
                            <div className="card">
                                <div className=" font-bold mb-4">Filtro:</div>
                                {datosFiltros && Object.keys(datosFiltros).map((campos, index) => (
                                    campos !== "tamaño" ?
                                        <SimpleInputTextoMemo
                                            campo={campos}
                                            cliente={datosFiltros}
                                            setCliente={setDatosFiltros}
                                            original={filtrosVacios}
                                            key={index}
                                            validados={noValidos[campos]}
                                            setNoValidos={setNoValidos}
                                            noValidos={noValidos}
                                        />
                                        :
                                        <SimpleInputNumberMemo
                                            campo={campos}
                                            cliente={datosFiltros}
                                            setCliente={setDatosFiltros}
                                            original={filtrosVacios}
                                            key={index}
                                            fraccion={2}
                                            validados={noValidos[campos]}
                                            setNoValidos={setNoValidos}
                                            noValidos={noValidos}
                                        />
                                )
                                )}
                            </div>
                        </div>
                        <div className={noValidos["udf"] ? "col-12 md:col-6 lg:col-6 error p-error" : "col-12 md:col-6 lg:col-6"}>
                            <div className=" font-bold mb-5">Ubicacion de Filtros:</div>
                            <div className="flex">
                                {ubicacionFiltros && Object.keys(ubicacionFiltros).map((campos, index) => (
                                    campos === "unidad" ?
                                        <SimpleInputTextoMemo
                                            campo={campos}
                                            cliente={ubicacionFiltros}
                                            setCliente={setUbicacionFiltros}
                                            original={ubicacionFiltros}
                                            key={index}
                                            validados={noValidos[campos]}
                                            setNoValidos={setNoValidos}
                                            noValidos={noValidos}
                                        />
                                        :
                                        <SimpleInputNumberMemo
                                            campo={campos}
                                            cliente={ubicacionFiltros}
                                            setCliente={setUbicacionFiltros}
                                            original={ubicacionFiltros}
                                            key={index}
                                            fraccion={2}
                                            validados={noValidos[campos]}
                                            setNoValidos={setNoValidos}
                                            noValidos={noValidos}
                                        />
                                )
                                )}
                            </div>
                            <div className={bloqueoFiltros ? "font-bold mb-3 error p-error" : "font-bold mb-3"}>
                                <Button label="Agregar Filtro" className="w-full" onClick={agregarElementos} />
                                {bloqueoFiltros && < small className="p-error font-bold errorMio">{`Inicio y/o Final Valor en 0 no aceptado`}</small>}
                            </div>
                            <div className="font-bold mb-3">
                                <TablaFiltros lista={ubicacionFiltrosLista} setLista={setUbicacionFiltrosLista} />
                            </div>
                            <div className="font-bold mb-3">
                                <Button label="Limpiar Lista"
                                    className="w-full"
                                    onClick={(e) => { e.preventDefault(), setVisible3(true) }}
                                />
                                <ConfirmDialog visible={visible3} onHide={() => setVisible3(false)} message="Limpiar Lista ?"
                                    header="Confirmar Eliminacion..." icon="pi pi-info-circle" accept={() => setUbicacionFiltrosLista([])}
                                    acceptClassName='p-button-danger' acceptLabel="Si" />
                            </div>
                            {noValidos["udf"] && < small className="p-error font-bold errorMio">{`Ubicacion de filtros es requerido`}</small>}
                        </div>
                        <div className="col-12 md:col-6 lg:col-6">
                            <div className="font-bold mb-5 underline">III.- Datos Hidraulicos</div>
                            {datosHidarulicos && Object.keys(datosHidarulicos).map((campos, index) => (
                                <SimpleInputNumberMemo
                                    campo={campos}
                                    cliente={datosHidarulicos}
                                    setCliente={setDatosHidarulicos}
                                    original={datosHidarulicosVacios}
                                    key={index}
                                    fraccion={2}
                                    prefijo={campos === "CaudalDeExplotacion" ? " l/seg con aire" : campos === "TipoDeBombaRecomendada" ? " hp" : " m"}
                                    validados={noValidos[campos]}
                                    setNoValidos={setNoValidos}
                                    noValidos={noValidos}
                                />
                            )
                            )}
                        </div>
                        <div className="col-12 md:col-6 lg:col-6">
                            <div className=" font-bold mb-3">Observaciones:</div>
                            <span className="p-float-label">
                                <InputTextarea
                                    className="w-full"
                                    value={obs}
                                    onChange={(e) => setObs(e.target.value)}
                                    rows={7}
                                />
                                <label>Observaciones</label>
                            </span>
                            {botonRegistro()}
                        </div>
                        {vista ? <div className="col-12">
                            <div className="font-bold mb-3">EL POZO FUE ENTUBADO DE ACUERDO AL SIGUIENTE DISEÑO:</div>
                            <TablaEntubado lista={dataPrueba} />
                        </div> : ""}
                    </div>
                </div>
            </React.Fragment>}
    </React.Fragment>)
}
export default VistaPrincipalRegistro