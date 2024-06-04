import React from "react";

import { Checkbox } from "primereact/checkbox";
import { Funciones } from "./Funciones";

const RenderizarCheckbox = ({ campo, cli, setCli, cliente, setCliente }) => {

    return <div className={cli.includes(campo.value) ? "field error p-error" : "field"} >
        <label className="font-bold">{campo.etiqueta}</label>
        <div className="formgrid grid">
            {campo.opciones.map((opcion, index) => (
                <div className={"centro-total field-radiobutton col-12 " + Funciones.getColumnClass(index, campo.opciones.length) + " " + Funciones.getColumnClassLg(index, campo.opciones.length)} key={index} >
                    <Checkbox
                        inputId={`option_${index}`}
                        value={opcion.value}
                        onChange={(e) => Funciones.cambioCheckbox(campo.value, e.value, e, setCli, setCliente, cliente, cli)}
                        checked={cliente[campo.value].some((item) => item === opcion.value)}
                    />
                    <label htmlFor={`option_${index}`}>{opcion.label}</label>
                </div>
            ))}
        </div >
        {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.etiqueta.toUpperCase()} ES REQUERIDO`}</small>}
    </div>
}
export default RenderizarCheckbox

export function SimpleCheckbox({ campo, cli, setCli, cliente, setCliente }) {
    return (<div className="field mb-3">
        <label>
            {Funciones.formatearCadena(campo)}:
            <Checkbox
                checked={cliente[campo]}
                onChange={(e) => Funciones.cambioValores(campo, e.checked, setCli, setCliente, cliente, cli)}
            />
        </label>

    </div>)
}