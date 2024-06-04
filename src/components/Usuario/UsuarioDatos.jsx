
//carpeta componentes
import React, { useEffect, useState, useContext } from "react"
import TablaPrincipal from "@/components/Tabla/Tabla"
import { UsuarioContext } from "@/context/UsuarioContext"
import { Funciones } from "@/components/Tabla/Funciones";

export default function VistaUsuario() {

  const [formulario, setFormulario] = useState(false);

  const { usuario,
    roles,
    nuevo,
    modificar,
    editar,
    cerrarFormulario,
    registro,
    setRegistro,
    buscar,
    mostrar,
    eliminarMasivo,
    eliminarIndividual } = useContext(UsuarioContext)

  function hola(mensaje) {
    console.log("HOLA MUNDO: ", mensaje)
  }

  const datos = {
    tablaTitulo: "Registro de Usuarios",
    tablaResponsiva: true,
    tablaColumnasDiferentes: true,
    tablaOrden: "idu",
    tablaOrdenNumero: 1,
    tablaFilas: 5,
    tablaArray: [
      5,
      10,
      15
    ],
    tipoDeSeleccion: "multiple",
    expansion: false,
    tituloExpansion: "Expandir",
    listaExpansion: "persona",
    borrarMasivo: {
      visible: true,
      funcion: eliminarMasivo
    },
    añadir: {
      visible: true,
      funcion: hola
    },
    modificar: {
      visible: true,
      funcion: buscar
    },
    ver: {
      visible: true,
      funcion: mostrar
    },
    borrar: {
      visible: true,
      funcion: eliminarIndividual
    },
    header: true,
    columnasDeBusqueda: [
      "idu",
      "sexo",
      "persona.nombre"
    ],
    columnaAdicionalOpcion: false,
    columnaAdicional: [],
    formularioDialog: {
      principal: {
        formulario: formulario,
        setFormulario: setFormulario,
        key: "principal"
      }
    },
    seleccion2: {
      id: "idu",
      estado: "estado",
      nom: "persona.nombre"
    },
    formulario: {
      formularioTitulo: "Administrar Usuarios",
      cerrar: cerrarFormulario,
      botonTitulo: registro,
      telefono: true,
      roles: true,
      listas: true,
      nuevo: nuevo,
      modificar: modificar,
      campos: [
        {
          id: [
            {
              label: "Identificador de Usuario",
              value: "idu",
              value2: "idu",
              key: "IDU"
            },
            {
              label: "Identificador de Persona",
              value: "idpe",
              value2: "persona.idpe",
              key: "IDPE"
            }
          ],
          texto: [
            {
              label: "Cedula de Identidad",
              value: "ci",
              requerido: true,
              value2: "persona.ci",
              key: "CI"
            },
            {
              label: "Nombre",
              value: "nombre",
              requerido: true,
              value2: "persona.nombre",
              key: "Nom"
            }
            ,
            {
              label: "Apellido Paterno",
              value: "ap",
              requerido: true,
              value2: "persona.ap",
              key: "Ap"
            },
            {
              label: "Apellido Materno",
              value: "am",
              requerido: false,
              value2: "persona.am",
              key: "Am"
            },
            {
              label: "Direccion",
              value: "direccion",
              requerido: false,
              value2: "persona.direccion",
              key: "Direccion"
            },
            ,
            {
              label: "Email",
              value: "email",
              requerido: false,
              value2: "persona.email",
              key: "Email"
            }
          ],
          radiobutton: [
            {
              etiqueta: "Género",
              value: "sexo",
              value2: "sexo",
              requerido: true,
              opciones: [
                {
                  label: "Masculino",
                  value: "M",
                  key: "Masculino"
                },
                {
                  label: "Femenino",
                  value: "F",
                  key: "Femenino"
                }
              ],
              key: "Género"
            }
          ],
          fecha: [
            {
              label: "Fecha de Nacimiento",
              value: "fecnac",
              value2: "fecnac",
              requerido: true,
              key: "FecNac"
            }
          ],
          checkbox: [],

          listas: [],
          imagen: [
            {
              label: 'Imagen Personal',
              value: 'base64',
              requerido: false,
              value2: 'persona.base64'
            },
          ],
          chips: [
            {
              etiqueta: "Telefono(s) Personal",
              value: "telefono",
              value2: "persona.telefono",
              valor: "numero",
              telefono: true,
              requerido: false,
              opciones: [],
              key: "Telefono(s) Personal"
            },/* 
            {
              etiqueta: "Roles",
              value: "usurol",
              value2: "usurol",
              valor: "roles.nombre",
              telefono: true,
              requerido: true,
              opciones: [],
              key: "Telefono(s) Personal2"
            } */
          ],
          toggleButton: [
            {
              etiqueta: 'Rol(es)',
              value: 'usurol',
              value2: 'usurol',
              valor: 'roles.idr',
              requerido: false,
              opciones: Funciones.convierteListas(roles, "value", "nombre", "idr"),
            },]
        }
      ]
    }
  }

  const columnas = [
    {
      header: "Cedula",
      field: "persona.ci",
      key: "Codigo"
    },
    {
      header: "Nombre",
      field: "persona.nombre",
      key: "persona.nombre"
    },
    {
      header: "Apellido Paterno",
      field: "persona.ap",
      key: "persona.ap"
    },
    {
      header: "Apellido Materno",
      field: "persona.am",
      key: "persona.am"
    },
    {
      header: "Genero",
      field: "sexo",
      key: "sexo"
    },/* 
    {
      header: "Roles",
      field: "usurol",
      key: "usurol"
    }, */
    {
      header: "Fecha de Nacimiento",
      field: "fecnac",
      key: "fecnac"
    },
    {
      header: "Estado",
      field: "estado",
      key: "estado"
    }
  ]

  const columnasExpasion = [
    {
      header: "Cedula",
      field: "ci",
      key: "ci"
    },
    {
      header: "Nombre",
      field: "nombre",
      key: "nombre"
    }
  ]

  useEffect(() => {
    console.log("Los datos son HOLA", usuario);
  }, [usuario]);

  return (
    <React.Fragment>
      <TablaPrincipal
        lista={usuario}
        datos={datos}
        columnas={columnas}
        columnasExpasion={columnasExpasion}
        datosCliente={editar}>
      </TablaPrincipal>
    </React.Fragment>
  );
}
