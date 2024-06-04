import React from "react";

import { Calendar } from "primereact/calendar";
import { Funciones } from "./Funciones";

const RenderizarFecha = ({ campo, cli, setCli, cliente, setCliente, }) => {

    return <div className={cli.includes(campo.value) ? "field error p-error mb-5" : "field mb-5"}>
        <span className="p-float-label font-bold">
            <Calendar
                value={cliente[campo.value]}
                onChange={(e) => Funciones.cambioValores(campo.value, e.target.value, setCli, setCliente, cliente, cli)}
                dateFormat="dd/mm/yy"
                locale='es'
                className='w-full'
                showButtonBar
                touchUI
                pt={{
                    input: {
                        root: {
                            className: 'w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg transition-all transition-duration-150',
                        }
                    },
                }}
            />
            <label>{campo.label}: </label>
        </span>
        {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.label.toUpperCase()} ES REQUERIDO`}</small>}
    </div>
}
export default RenderizarFecha