import React from 'react';
import { Chips } from 'primereact/chips';
import { Funciones } from './Funciones';
const RenderizarChips = ({ campo, cli, setCli, cliente, setCliente, }) => {
    return (
        <div className={cli.includes(campo.value) ? "field error p-error mb-5" : "field mb-5"}>
            <span className="p-float-label font-bold">
                <Chips
                    value={cliente[campo.value]}
                    onChange={(e) => Funciones.cambioValores(campo.value, e.target.value, setCli, setCliente, cliente, cli)}
                    keyfilter="int"
                    pt={{
                        //root: { className: 'flex' },
                        container: {
                            className: 'w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg transition-all transition-duration-150',
                        },
                        //token: { className: 'bg-primary' }
                    }}
                />
                <label>{campo.etiqueta}:</label>
            </span>
            {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.etiqueta.toUpperCase()} ES REQUERIDO`}</small>}
        </div>
    )
}

export default RenderizarChips;

export function SimpleChips({ campo, cli, setCli, cliente, setCliente }) {
    return (<div className="field mb-5">
        <span className="p-float-label font-bold">
            <Chips
                value={cliente[campo]}
                onChange={(e) => Funciones.cambioValores(campo, e.target.value, setCli, setCliente, cliente, cli)}
                
            />
            <label>{Funciones.formatearCadena(campo)}: </label>
        </span>
    </div>)
}