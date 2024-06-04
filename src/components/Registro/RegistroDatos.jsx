
//carpeta componentes
import React, { useEffect, useState, useContext } from "react"
import ReactDOM from "react-dom"; // Asegúrate de importar ReactDOM
import TablaPrincipal from "@/components/Tabla/Tabla"
import { RegistroContext } from "@/context/RegistroContext"
import { Funciones } from "@/components/Tabla/Funciones";
import VistaMapaRegistro, { VistaMapaRegistroGeneral } from "./MapaRegistro";
import SimpleVistaNueva from "../Componentes/SimpleVistaNueva";
import RegistroExpansion from "./RegistroExpansion";
import VistaPrincipalRegistro from "./Registro";
import { useRouter } from 'next/router';

export default function VistaRegistro() {

  const router = useRouter();
  const [formulario, setFormulario] = useState(false);
  const [formulario2, setFormulario2] = useState(false);

  const { registros,

    nuevo,
    modificar,
    editar,
    cerrarFormulario,
    registro,
    setRegistro,
    buscar,
    mostrar,
    eliminarMasivo,
    eliminarIndividual,
    setAdicional } = useContext(RegistroContext)

  function hola(mensaje) {
    console.log("HOLA MUNDO: ", mensaje)
  }

  const datos = {
    tablaTitulo: "Registros",
    tablaResponsiva: true,
    tablaColumnasDiferentes: true,
    tablaOrden: "iddg",
    tablaOrdenNumero: 1,
    tablaFilas: 5,
    tablaArray: [
      5,
      10,
      15
    ],
    tipoDeSeleccion: "multiple",
    expansion: false,
    //añadir
    expansionNormal: false,
    expansionModulo: RegistroExpansion,//VistaMapaRegistro,
    expansionProps: [
      { latitud: "lat", },
      { longitud: "longi" },
      { nombre: "nombre" },
      { ubicacion: "ubicacion" },
      { departamento: "dp" }
    ],
    expansionPropsObjeto: true,
    //hasta aqui
    tituloExpansion: "Expandir",
    listaExpansion: "persona",
    borrarMasivo: {
      visible: true,
      funcion: eliminarMasivo
    },
    añadir: {
      visible: false,
      funcion: hola
    },
    modificar: {
      visible: false,
      funcion: buscar
    },
    ver: {
      visible: false,
      funcion: mostrar
    },
    borrar: {
      visible: true,
      funcion: eliminarIndividual
    },
    header: true,
    columnasDeBusqueda: [
      "iddg",
      "dp",
      "pv",
      "nombre",
      "ubicacion"
    ],
    columnaAdicionalOpcion: true,
    columnaAdicional: [
      /* {
        header: "Modificar",
        icon: "pi pi-pencil",
        generarHandler: (data, col) => () => {
          // Ejecuta la función buscar con los datos proporcionados
          setAdicional(data, col);
        },
        componente: true,
        componenteModulo: VistaPrincipalRegistro,
        dialog: formulario2,
        setDialog: setFormulario2,
        severity: "success"
      } */
      /* {
        header: "Modificar",
        icon: "pi pi-pencil",
        generarHandler: (data, col) => () => {
          // Ejecuta la función buscar con los datos proporcionados
          setAdicional(data, col);
        },
        componente: true,
        componenteModulo: VistaPrincipalRegistro,
        dialog: formulario2,
        setDialog: setFormulario2,
        severity: "success"
      }, */
      {
        header: "Modificar",
        icon: "pi pi-pencil",
        generarHandler: (data, col) => () => {
          // Ejecuta la función buscar con los datos proporcionados
          //setAdicional({ data: "nada" });
          router.push({
            pathname: "/Registro/Registro", // Cambia esto a la ruta correcta
            query: { registroOC: data.data.iddg },
          });
        },
        componente: false,
        componenteModulo: null,
        dialog: formulario2,
        setDialog: setFormulario2,
        severity: "success"
      }
    ],
    formularioDialog: {
      principal: {
        formulario: formulario,
        setFormulario: setFormulario,
        key: "principal"
      }
    },
    seleccion2: {
      id: "iddg",
      estado: "estado",
      nom: "nombre"
    },
    formulario: {
      formularioTitulo: "Administrar Registros",
      cerrar: cerrarFormulario,
      botonTitulo: "registro",
      telefono: false,
      nuevo: nuevo,
      modificar: modificar,
      campos: [
        {
          id: [],
          texto: [],
          fecha: [],
          checkbox: [],
          radiobutton: [],
          listas: [],
          imagen: [],
          chips: [],
          toggleButton: []
        }
      ]
    }
  }

  const columnas = [
    {
      header: "Codigo",
      field: "iddg",
      key: "Codigo"
    },
    {
      header: "Departamento",
      field: "dp",
      key: "sexo"
    },
    {
      header: "NombrePozo",
      field: "nombre",
      key: "persona.base64"
    },
    {
      header: "Ubicacion",
      field: "ubicacion",
      key: "estado"
    },
    {
      header: "Fecha",
      field: "fecha",
      key: "1706561520702"
    },
    {
      header: "Estado",
      field: "estado",
      key: "175845445456"
    }
  ]

  const columnasExpasion = [
    {
      header: "Cedula",
      field: "ci",
      key: "ci"
    },
  ]

  useEffect(() => {
    //console.log(registros);
  }, []);

  return (
    <React.Fragment>
      <TablaPrincipal
        lista={registros}
        datos={datos}
        columnas={columnas}
        columnasExpasion={columnasExpasion}
        datosCliente={editar}>
      </TablaPrincipal>
      <VistaMapaRegistroGeneral lista={registros} />
    </React.Fragment>
  );
}
