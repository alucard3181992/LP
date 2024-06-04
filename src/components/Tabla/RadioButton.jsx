import React from "react";

import { RadioButton } from "primereact/radiobutton";
import { Funciones } from "./Funciones";

const RenderizarRadiobutton = ({ campo, cli, setCli, cliente, setCliente }) => {

    return <div className={cli.includes(campo.value) ? "field error p-error" : "field"}>
        <label className="font-bold">{campo.etiqueta}</label>
        <div className="formgrid grid">
            {campo.opciones.map((opcion, index) => (
                <div className={"centro-total field-radiobutton col-12 " + Funciones.getColumnClass(index, campo.opciones.length) + " " + Funciones.getColumnClassLg(index, campo.opciones.length)} key={index} >
                    <RadioButton
                        inputId={`option_${index}`}
                        value={opcion.value}
                        onChange={(e) => Funciones.cambioValores(campo.value, e.target.value, setCli, setCliente, cliente, cli)}
                        checked={cliente[campo.value] === opcion.value}
                    />
                    <label htmlFor={`option_${index}`}>{opcion.label}</label>
                </div >
            ))}
        </div >
        {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.etiqueta.toUpperCase()} ES REQUERIDO`}</small>}
    </div>
}
export default RenderizarRadiobutton