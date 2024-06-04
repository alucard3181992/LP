// ArchivoImagen.jsx
import React from 'react';
import ArchivoImagen from '../CargarImagen/ArchivoImagen';
import { Image } from 'primereact/image';
import { Funciones } from './Funciones';
import { Button } from 'primereact/button';

const RenderizarImagen = ({ campo, cli, setCli, cliente, setCliente }) => {
    function codigoBase64(campo, valor) {
        Funciones.cambioValores(campo, valor, setCli, setCliente, cliente, cli)
    }
    return (<div className={cli.includes(campo.value) ? "field error p-error mb-5" : "field mb-5"}>
        <label className="font-bold">{campo.label}</label>
        {cliente[campo.value] && <div className='ContenedorImg justify-content-center w-full' style={{ alignContent: "center", display: "flex", }} >
            <Image src={cliente[campo.value]} alt="Foto Actual" preview className="ImgnormalFormulario border-round" style={{ height: "200px", width: "100%" }} />
            <div className='w-full centro-total p-2'
                style={{ background: "#12121294", position: 'absolute', bottom: 0, zIndex: 999 }}>
                <Button
                    type="button"
                    icon="pi pi-times"
                    tooltip='Remover Imagen'
                    size='small'
                    tooltipOptions={{ position: "bottom" }}
                    className="p-button-outlined p-button-rounded p-button-danger"
                    onClick={() => codigoBase64(campo.value, null)} />
            </div>
        </div>}

        <ArchivoImagen codigoBase64={codigoBase64} campo={campo.value} />
        {cli.includes(campo.value) && < small className="p-error font-bold">{`${campo.label.toUpperCase()} ES REQUERIDO`}</small>}
    </div>
    )
}

export default RenderizarImagen;