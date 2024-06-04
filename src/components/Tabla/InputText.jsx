import React, { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext"
import { Funciones } from "./Funciones";

const RenderizarInputTexto = ({ campo, cli, setCli, cliente, setCliente, }) => {
    useEffect(() => {

    }, [])
    return <div className={cli.includes(campo.value) ? "field error p-error mb-5" : "field mb-5"}>
        <span className="p-float-label font-bold">
            <InputText
                placeholder={campo.label}
                value={cliente[campo.value]}
                onChange={(e) => Funciones.cambioValores(campo.value, e.target.value, setCli, setCliente, cliente, cli)}
                className={'w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg transition-all transition-duration-150'}
                type={campo.value === "email" ? "email" : "text"}
            />
            <label>{campo.label}: </label>
        </span>
        {cli.includes(campo.value) && < small className="p-error font-bold errorMio">{`${campo.label.toUpperCase()} ES REQUERIDO`}</small>}
    </div>
}
export default RenderizarInputTexto

export function SimpleInputTexto({ campo, cli, setCli, cliente, setCliente }) {
    console.log("ME LLAMAN SimpleInputTexto", campo);
    const [valor, setValor] = useState(null)
    const [titulo] = useState(Funciones.formatearCadena(campo))
    useEffect(() => {

    }, [])
    return (<div className="field mb-5">
        <span className="p-float-label font-bold">
            <InputText
                value={cliente[campo]}
                onChange={(e) => Funciones.cambioValores(campo, e.target.value, setCli, setCliente, cliente, cli)}
                className='w-full'
            />
            <label>{titulo}: </label>
        </span>
    </div>)
}