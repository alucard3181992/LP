
//carpeta context
import React, { createContext, useState, useEffect, useRef } from "react";
import { RegistroServicio } from "@/services/RegistroServicio";
import ProductoSkeleton, { RegistroSkeleton } from "@/components/Esqueleto/ProductoSkeleton";

export const RegistroContext = createContext();

const RegistroContextProvider = (props) => {

    const registroServicio = new RegistroServicio()
    const [registros, setRegistros] = useState([])
    const [editar, setEditar] = useState(null)
    const [registro, setRegistro] = useState("Guardar")
    const [adicional, setAdicional] = useState({ data: "nada" })

    useEffect(() => {
        //console.log("LLAMANDO A USUARIO")
        try {
            registroServicio.listarRegistro().then((data) => setRegistros(data))

        } catch (error) {
            console.log(error)
        }
    }, [])


    const nuevo = async (usuario) => {
        const res = await registroServicio.create(usuario).then(
            //registroServicio.listarRegistro().then((data) => setRegistros(data))
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

    const modificar = async (usuario) => {
        const res = await registroServicio.modificar(usuario).then(
            //registroServicio.listarRegistro().then((data) => setRegistros(data))
        )
        nuevaLista()
        return res.data

    }

    const eliminarMasivo = async (seleccion) => {
        try {
            let resultado = [];
            let mensajes = [];
            for (const id of seleccion) {
                const data = await registroServicio.eliminar(id);
                resultado.push(data);
                mensajes.push({ cliente: id.nom, mensaje: data.data.message, baja: data.data.msg })
            }
            registroServicio.listarRegistro().then((data) => setRegistros(data))
            //return resultado;
            return { mensajes }
        } catch (error) {
            console.log("el error es " + error)
        }
    }
    const eliminarIndividual = async (cliente) => {
        const res = await registroServicio.eliminar(cliente).then(
            registroServicio.listarRegistro().then((data) => setRegistros(data))
        )
        return res.data
    }

    const nuevaLista = () => {
        registroServicio.listarRegistro().then((data) => setRegistros(data));
    }

    const Cargar = () => {
        return (
            <ProductoSkeleton></ProductoSkeleton>
        );
    }
    const Cargar2 = () => {
        return (
            <RegistroSkeleton></RegistroSkeleton>
        );
    }

    return (
        <RegistroContext.Provider
            value={{
                registros,
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
                adicional,
                setAdicional,
                Cargar,
                Cargar2

            }}
        >
            {props.children}
        </RegistroContext.Provider>
    );
}

export default RegistroContextProvider;
