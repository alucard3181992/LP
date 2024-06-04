import React from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Funciones } from './Funciones';

const RenderizarToggleButton = ({ campo, cli, setCli, cliente, setCliente, }) => {
    return (
        <div className={cli.includes(campo.value) ? "field error p-error" : "field"}>
            <label className="font-bold">{campo.etiqueta}</label>
            <DataTable
                value={campo.opciones}
            >
                <Column header="Nº" body={(data, options) => options.rowIndex + 1} frozen />
                <Column header="Nombre" field="label" sortable />
                <Column header="Asignado" sortable body={(data) =>
                    <ToggleButton
                        name={data}
                        checked={cliente[campo.value].includes(data.value)}
                        onChange={(e) => Funciones.cambioToggleButton(campo.value, e, setCli, setCliente, cliente, cli)}
                        onIcon="pi pi-check"
                        offIcon="pi pi-times"
                        onLabel="Si"
                        offLabel="No"
                        style={false}
                        className={`w-8rem ${cliente[campo.value].includes(data.value) ? 'p-button bg-teal-400' : 'p-button bg-red-400'}`}
                    />} />

            </DataTable>
            {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.etiqueta.toUpperCase()} ES REQUERIDO`}</small>}
        </div>
    )
}

export default RenderizarToggleButton;