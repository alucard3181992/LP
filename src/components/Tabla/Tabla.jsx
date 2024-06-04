import React, { useEffect, useState, useRef, lazy, Suspense, useContext } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Image } from 'primereact/image';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from "primereact/avatar";
import { Tag } from 'primereact/tag';
import { Messages } from 'primereact/messages';


import { Validacion } from '@/recursos/js/Validacion';
import { Tabla } from '../Esqueleto/VistaSkeleton';
import FormularioPrincipal from './Formulario';
import CabeceraTabla from './CabeceraTabla';
import SimpleVistaNueva from '../Componentes/SimpleVistaNueva';
import { PrincipalContext } from "@/context/PrincipalContext";
import { Dropdown } from 'primereact/dropdown';

export default function TablaPrincipal({ lista, datos, columnas, columnasExpasion, datosCliente }) {
    //const FormularioPrincipal = lazy(() => import('./Formulario'))
    const [bloqueo, setBloqueo] = useState(true)
    //const [formulario, setFormulario] = useState(false)
    const [confirmarBorrarMasivo, setConfirmarBorrarMasivo] = useState(false)
    const [confirmarBorrar, setConfirmarBorrar] = useState(false)
    const toast = useRef(null);
    const msgs = useRef(null);
    const [datosBorrar, setDatosBorrar] = useState(null);
    /* const [size, setSize] = useState("small")
    const [responsive, setResponsive] = useState(datos.tablaResponsiva) */
    const { size,
        setSize,
        responsive,
        setResponsive } = useContext(PrincipalContext)

    useEffect(() => {
        if (lista.length !== 0) {
            //console.log("DATOS ES", datos);
            setSeleccion([])
            setBloqueo(false)
        }
        else {
            setBloqueo(true)
        }
    }, [lista]);

    //mensaje de salida
    const mensajeFlotante = (Sticky, Estado, Titulo, Mensaje, Vida) => {
        toast.current.show({ sticky: Sticky, severity: Estado, summary: `${Titulo} `, detail: Mensaje, life: Vida });
    };

    const mensajeEstatico = (Sticky, Estado, Titulo, Mensaje, Vida) => {
        msgs.current.show({ sticky: Sticky, severity: Estado, summary: `${Titulo} `, detail: Mensaje, life: Vida })
    }

    //filtros de busqueda
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    //seleccion
    const [seleccion, setSeleccion] = useState([]);
    const [seleccion2, setSeleccion2] = useState([])
    useEffect(() => {
        const selectedData = [];
        for (let i = 0; i < seleccion.length; i++) {
            const selectedItem = seleccion[i];
            selectedData.push({
                nom: obtenerValorPropiedad(selectedItem, datos.seleccion2.nom),
                estado: obtenerValorPropiedad(selectedItem, datos.seleccion2.estado),
                id: obtenerValorPropiedad(selectedItem, datos.seleccion2.id),
            });
        }
        setSeleccion2(selectedData);
    }, [seleccion])


    function botonAdicionar() {
        if (datos.añadir && datos.añadir.funcion && typeof datos.añadir.funcion === 'function') {
            datos.añadir.funcion("ADICIONAR");
            datos.formularioDialog.principal.setFormulario(true) // Llama a la función almacenada en datos.añadir.funcion
        }
    }
    //botones AMVB
    function botonModificar(data) {
        return (
            <Button icon="pi pi-pencil"
                rounded
                onClick={(e) => {
                    e.preventDefault()
                    datos.modificar.funcion(data)
                    datos.formularioDialog.principal.setFormulario(true)
                }}>
            </Button>
        )
    }
    function botonVer(data) {
        return (
            <Button icon="pi pi-search"
                rounded
                severity='info'
                onClick={(e) => {
                    e.preventDefault()
                    datos.ver.funcion(data)
                    datos.formularioDialog.principal.setFormulario(true)
                }}>
            </Button>
        )
    }
    function botonBorrar(data) {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="danger"
                    onClick={(e) => {
                        e.preventDefault();
                        setDatosBorrar(data); // Guarda la data de la fila seleccionada
                        setConfirmarBorrar(true);
                    }}
                    disabled={seleccion.length}
                >
                </Button>
                {confirmarBorrar && (
                    <ConfirmDialog
                        visible={confirmarBorrar}
                        onHide={() => setConfirmarBorrar(false)}
                        message="¿Confirma la eliminación?"
                        header="Confirmación!!!!"
                        icon="pi pi-info-circle"
                        accept={() => borrarIndividual()}
                        acceptClassName="p-button-danger"
                        acceptLabel="Sí"
                    />
                )}
            </React.Fragment>
        );
    }


    //boton adicional deja de confundirte 
    /* function botonAdicional(data, icon, funcion, severity, funcionOrig) {
        return (
            <Button icon={icon}
                rounded
                severity={severity}
                onClick={(e) => {
                    e.preventDefault()
                    //eval(funcion)
                    funcionOrig(args)
                }}>
            </Button>
        )
    } */
    function botonAdicional(data, col, generarHandler) {
        //console.log("LA DATA ES", col);
        return (
            <Button
                icon={col.icon}
                rounded
                severity={col.severity}
                onClick={(e) => {
                    e.preventDefault()
                    generarHandler()
                }}

            />

        );
    }
    // funcion  borrarMasivo
    async function botonBorrarMasivo() {
        if (datos.borrarMasivo && datos.borrarMasivo.funcion && typeof datos.borrarMasivo.funcion === 'function') {
            const res = await datos.borrarMasivo.funcion(seleccion2)
            let esta = 0;
            let m = [];
            res.mensajes.forEach((mensaje, index) => {
                if (mensaje.mensaje === "TODO BIEN") { m.push(mensaje.cliente + " " + mensaje.baja) } else { esta = 1 }
            });
            if (esta === 0) {
                setSeleccion([])
                setSeleccion2([])
                mensajeFlotante(false, "success", "EXITO", m.join(",\n"), 4000)
            }
        }
    }

    //funcion para borrar individual
    async function borrarIndividual() {
        const valores = {
            nom: obtenerValorPropiedad(datosBorrar, datos.seleccion2.nom),
            estado: obtenerValorPropiedad(datosBorrar, datos.seleccion2.estado),
            id: obtenerValorPropiedad(datosBorrar, datos.seleccion2.id),
        }
        if (datos.borrar && datos.borrar.funcion && typeof datos.borrar.funcion === 'function') {
            const res = await datos.borrar.funcion(valores);
            if (res.message === "TODO BIEN") {
                mensajeFlotante(false, "success", "EXITO", valores.nom + " " + res.msg, 4000)
            }
            /* mensajeEstatico(false, "info", "TITULO", "MENSAJE ESTATICO", 1000)
             */
        }
    }
    //bodys para las tablas
    function bodyImagen(data, base64) {
        const imagen = obtenerValorPropiedad(data, base64);
        return (<React.Fragment>
            {imagen ? <Image
                src={imagen}
                alt="Imagen"
                className="shadow-2 border-round ImgTabla"
                preview
                width='64px'
                height='42px'
            />
                :
                <Avatar
                    label={"F"}
                    size="large"
                    style={{ backgroundColor: '#2196F3', color: '#ffffff', width: "64px" }}
                />
            }</React.Fragment>
        )
    }
    function bodyFecha(data, valor) {
        const fecha = obtenerValorPropiedad(data, valor)
        return fecha ? Validacion.formatoDMABIEN(fecha) : ""
    }

    function bodyFecha2(data, valor) {
        const fecha = obtenerValorPropiedad(data, valor)
        return fecha ? Validacion.formatoDMABIEN(fecha) : ""
    }

    function bodyGenero(data, valor) {
        const genero = obtenerValorPropiedad(data, valor)
        const sexo = genero === "M" ? "Hombre" : "Mujer"
        return sexo
    }

    function bodyRoles(data, valor) {
        const genero = obtenerValorPropiedad(data, valor)
        const cadena = asegurarArray(genero)
        const lista = []
        cadena.map((v) => {
            lista.push(v.roles.nombre)
        })
        /*const events2 = calendario.Cotizacion.map(item => ({
                id: item.idcot,
                data: "Cotizacion",
                link: "/Cotizacion/GCotizacion",
                title: item.cliente.persona.nombre + " " + item.cliente.persona.ap,
                date: Validacion.fechaNormalBien2(item.fecha),
                color: '#FF5785',
            })); */
        /* const lista = cadena.map(item => ({
            nombre: item.roles.nombre
        })) */
        //console.log("LA LISTA ES ", lista);
        return <Dropdown
            options={lista}
            aria-label="Options"
            emptyMessage="Sin roles Asignados"
        ></Dropdown>
    }

    function bodyEstado(data, valor) {
        const estado = obtenerValorPropiedad(data, valor)
        return <Tag value={estado ? "VALIDO" : "NO VALIDO"} severity={estado ? "success" : "danger"}></Tag>
    }

    function obtenerValorPropiedad(objeto, propiedad) {
        const propiedades = propiedad.split('.'); // Dividir la cadena en partes usando el punto como separador
        return propiedades.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, objeto);
    }

    function asegurarArray(valor) {
        // Verificar si el valor no es un array y convertirlo en caso de no serlo
        if (!Array.isArray(valor)) {
            return valor !== undefined ? [valor] : [];
        }
        return valor; // Si ya es un array, simplemente devolverlo
    }

    function generarColumnas(columnas, clave) {
        return columnas.map((col, i) => {
            //console.log("COL:HEADER", col.header)
            switch (col.header) {
                case "Imagen":
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            header={col.header}
                            sortable
                            body={(data) => bodyImagen(data, col.field)}
                        />
                    );
                case "Fecha":
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            header={col.header}
                            sortable
                            body={(data) => bodyFecha(data, col.field)}
                        />
                    )
                case "Fecha de Nacimiento":
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            header={col.header}
                            sortable
                            body={(data) => bodyFecha2(data, col.field)}
                        />
                    )
                case "Genero":
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            header={col.header}
                            sortable
                            body={(data) => bodyGenero(data, col.field)}
                        />
                    )
                case "Roles":
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            header={col.header}
                            sortable
                            body={(data) => bodyRoles(data, col.field)}
                        />
                    )
                case "Estado":
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            header={col.header}
                            sortable
                            body={(data) => bodyEstado(data, col.field)}
                        />
                    );
                // Agregar casos para otros encabezados especiales según sea necesario
                default:
                    return (
                        <Column
                            key={`${clave}${i}${col.header}`}
                            field={col.field}
                            header={col.header}
                            sortable
                        />
                    );
            }
        });
    }

    //expansion 
    const [expandedRows, setExpandedRows] = useState(null);
    const rowExpansionTemplate = (data) => {
        const lista = asegurarArray(obtenerValorPropiedad(data, datos.listaExpansion))
        return (<React.Fragment>
            {datos.expansionNormal ?
                < div className="p-3">
                    <h5>EXPANSION DE LA TABLA </h5>
                    <DataTable value={lista}>
                        <Column header="Nº" body={(data, options) => options.rowIndex + 1} frozen />
                        {generarColumnas(columnasExpasion, "expansion")}
                    </DataTable>
                </div> : <datos.expansionModulo
                    props={datos.expansionPropsObjeto ? data : ayudaExpansion(datos.expansionProps, data)} />
            }
        </React.Fragment >)
    }

    function ayudaExpansion(expansionProps, data) {
        return expansionProps.reduce((resultado, prop) => {
            const key = Object.keys(prop)[0]; // Obtener el nombre de la propiedad

            // Utilizar la función obtenerValorPropiedad
            const value = obtenerValorPropiedad(data, prop[key]);

            // Agregar la propiedad y su valor al resultado
            resultado[key] = value;

            return resultado;
        }, {});
    }
    const footer = lista && `${lista.length} Registros en total`

    return (<React.Fragment>
        {bloqueo ? <Tabla animacion={"P"} columnas={columnas} tamaño={datos.tablaFilas} todo={true} /> :
            <React.Fragment>
                <Toast ref={toast} />
                <Messages ref={msgs} />
                <DataTable
                    footer={footer}
                    removableSort
                    size={size}
                    value={lista}
                    stripedRows={datos.tablaColumnasDiferentes}
                    className={responsive ? "si" : ""}
                    responsiveLayout={responsive ? "stack" : "scroll"}
                    header={datos.header ? <CabeceraTabla
                        botonAdicionar={botonAdicionar}
                        botonBorrarMasivo={botonBorrarMasivo}
                        confirmarBorrarMasivo={confirmarBorrarMasivo}
                        datos={datos}
                        globalFilterValue={globalFilterValue}
                        onGlobalFilterChange={onGlobalFilterChange}
                        seleccion={seleccion}
                        setConfirmarBorrarMasivo={setConfirmarBorrarMasivo}
                    /> : ""}
                    globalFilterFields={datos.columnasDeBusqueda}
                    filters={filters}
                    selection={seleccion}
                    onSelectionChange={(e) => setSeleccion(e.value)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    onRowToggle={(e) => { setExpandedRows(e.data) }}
                    expandedRows={expandedRows}
                    emptyMessage="Sin registros en la tabla de datos"
                    sortField={datos.tablaOrden}
                    sortOrder={datos.tablaOrdenNumero}
                    paginator
                    rows={datos.tablaFilas}
                    rowsPerPageOptions={datos.tablaArray}

                >
                    <Column selectionMode={datos.tipoDeSeleccion} headerStyle={{ width: '3rem' }} frozen />
                    <Column header="Nº" body={(data, options) => options.rowIndex + 1} frozen />
                    {datos.expansion && <Column expander header={datos.tituloExpansion} />}
                    {generarColumnas(columnas, "principal")}
                    {datos.modificar.visible &&
                        <Column header="Modificar"
                            body={(data) => botonModificar(data)}
                            style={{ textAlign: 'center' }} />}
                    {datos.ver.visible &&
                        <Column header="Ver"
                            body={(data) => botonVer(data)}
                            style={{ textAlign: 'center' }} />}
                    {datos.borrar.visible &&
                        <Column header="Borrar"
                            body={(data) => botonBorrar(data)}
                            style={{ textAlign: 'center' }} />}
                    {datos.columnaAdicionalOpcion && datos.columnaAdicional && datos.columnaAdicional.map((col, i) => (
                        <Column
                            key={col.header}
                            header={col.header}
                            body={(data) => botonAdicional(data, col, col.generarHandler({ data, col }))}
                            style={{ textAlign: 'center' }}
                        />
                    ))}
                </DataTable>
                <FormularioPrincipal
                    formulario={datos.formularioDialog.principal.formulario}
                    setFormulario={datos.formularioDialog.principal.setFormulario}
                    datosFormulario={datos.formulario}
                    mensajeEstatico={mensajeEstatico}
                    mensajeFlotante={mensajeFlotante}
                    datosCliente={datosCliente} />
                {datos.columnaAdicionalOpcion && datos.columnaAdicional && datos.columnaAdicional.map((col, i) => (<React.Fragment key={i}>
                    {col.componente ? <SimpleVistaNueva /> : ""}
                </React.Fragment>))}
            </React.Fragment>}
    </React.Fragment>)
}