
//carpeta context
import React, { createContext, useState, useEffect, useRef } from "react";
import { UsuarioServicio } from "@/services/UsuarioServicio";

export const UsuarioContext = createContext();

const UsuarioContextProvider = (props) => {

    const usuarioServicio = new UsuarioServicio()
    const [usuario, setUsuario] = useState([])
    const [editar, setEditar] = useState(null)
    const [registro, setRegistro] = useState("Guardar")
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        //console.log("LLAMANDO A USUARIO")
        try {
            usuarioServicio.listarUsuario().then((data) => setUsuario(data))
            usuarioServicio.listarRoles().then((data) => setRoles(data))
        } catch (error) {
            console.log(error)
        }
    }, [])


    const nuevo = async (usuario) => {
        const res = await usuarioServicio.create(usuario).then(
            //usuarioServicio.listarUsuario().then((data) => setUsuario(data)) 
        )
        nuevaLista()
        return res.data
    }

    const buscar = (cli) => {
        //console.log("CLI ES", cli);
        setRegistro("Editar")
        setEditar(cli);
    }

    const cerrarFormulario = () => {
        setRegistro("Guardar")
        setEditar(null)
    }

    const mostrar = (cli) => {
        setRegistro("Mostrar")
        setEditar(cli)
    }

    const modificar = async (usuario, telefono) => {
        const res = await usuarioServicio.modificar(usuario, telefono).then(
            //usuarioServicio.listarUsuario().then((data) => setUsuario(data))
        )
        nuevaLista()
        return res.data
    }

    const eliminarMasivo = async (seleccion) => {
        try {
            let resultado = [];
            let mensajes = [];
            for (const id of seleccion) {
                const data = await usuarioServicio.eliminar(id);
                resultado.push(data);
                mensajes.push({ cliente: id.nom, mensaje: data.data.message, baja: data.data.msg })
            }
            usuarioServicio.listarUsuario().then((data) => setUsuario(data))
            //return resultado;
            return { mensajes }
        } catch (error) {
            console.log("el error es " + error)
        }
    }
    const eliminarIndividual = async (cliente) => {
        const res = await usuarioServicio.eliminar(cliente).then(
            //usuarioServicio.listarUsuario().then((data) => setUsuario(data))
        )
        nuevaLista()
        return res.data
    }

    const nuevaLista = () => {
        usuarioServicio.listarUsuario().then((data) => {
            setUsuario(data)
            //console.log("NUEVA DATA", data)
        }
        )
    }

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                editar,
                buscar,
                mostrar,
                nuevo,
                modificar,
                eliminarMasivo,
                eliminarIndividual,
                registro,
                setRegistro,
                nuevaLista,
                cerrarFormulario,
                roles,

            }}
        >
            {props.children}
        </UsuarioContext.Provider>
    );
}

export default UsuarioContextProvider;
