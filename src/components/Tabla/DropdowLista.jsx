// DropdownLista.jsx
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Funciones } from './Funciones';

const RenderizarDropdownLista = ({ campo, cli, setCli, cliente, setCliente, }) => {
    return (
        <div className={cli.includes(campo.value) ? "field error p-error mb-5 mt-5" : "field mb-5 mt-5"}>
            <span className="p-float-label font-bold">
                <Dropdown
                    value={campo.opciones.find(item => item.valor === cliente[campo.value]) || null}
                    onChange={(e) => Funciones.cambioValores(campo.value, e.value ? e.value.valor : "", setCli, setCliente, cliente, cli)}
                    options={campo.opciones}
                    optionLabel="label"
                    filter
                    showClear
                />
                <label>{campo.etiqueta}: </label>

            </span>
            {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.etiqueta.toUpperCase()} ES REQUERIDO`}</small>}
        </div>
    );
};

export default RenderizarDropdownLista;