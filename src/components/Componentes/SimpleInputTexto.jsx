import React, { useEffect, useState } from 'react';
import { Funciones } from '../Tabla/Funciones';

import { InputText } from 'primereact/inputtext';
import { useUpdateEffect } from 'primereact/hooks';

const SimpleInputTextoMemo = ({ campo, cliente, setCliente, original, validados, setNoValidos, noValidos }) => {

    const [titulo, setTitulo] = useState(null)
    const [modificado, setModificado] = useState(false)
    const [valorOriginal, setValorOriginal] = useState("")
    const [localValue, setLocalValue] = useState(cliente[campo] || '');

    useUpdateEffect(() => {
        setValorOriginal(cliente[campo])
        setTitulo(Funciones.formatearCadena(campo))
    }, [original, cliente])

    const cambioValores = (campo, valor, setCliente, cliente) => {
        const valorMayusculas = valor.toUpperCase();
        setCliente({
            ...cliente,
            [campo]: valorMayusculas
        });
        // Crear un nuevo objeto de errores sin el campo actualizado
        const nuevosErrores = { ...noValidos }
        if (valor.trim() !== "" && valor !== 0 && !(Array.isArray(valor) && valor.length === 0)) {
            delete nuevosErrores[campo]
        }
        setNoValidos(nuevosErrores);

        // Verificar si el valor fue modificado
        setModificado(valor !== valorOriginal)

    }

    function generarCadenaSombra(numPasos, color) {
        const resultado = Array.from({ length: numPasos }, (_, index) => {
            const offsetPos = (index + 1) * 5;
            const offsetNeg = (index + 1) * -5;
            return `${color} ${offsetNeg}px ${offsetPos}px`;
        }).join(',');

        return resultado;
    }

    useEffect(() => {
        setLocalValue(cliente[campo] || '');
    }, [cliente, campo]);

    return (<>
        {titulo && <div className={validados ? "field error p-error mb-5" : "field mb-5"}>
            <span className="w-full p-float-label font-bold p-input-icon-right">
                <i className={modificado ? "pi pi-save" : ""} />
                <InputText
                    //defaultValue={cliente[campo]}
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    //value={cliente[campo]}
                    //onChange={(e) => cambioValores(campo, e.target.value, setCliente, cliente)}
                    onBlur={(e) => cambioValores(campo, e.target.value, setCliente, cliente)}
                    //className='w-full'
                    className={'w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg transition-all transition-duration-150'}
                    style={{
                        background: '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)',
                        //transform: modificado ? 'translateY(5px)' : 'translateY(0)',
                        boxShadow: modificado ? generarCadenaSombra(1, 'var(--surface-hover)') : "",
                        textTransform: "uppercase"
                    }}
                />
                <label>{titulo}: {validados} </label>

            </span>
            {validados && < small className="p-error font-bold errorMio">{`${validados} ${titulo} es requerido`}</small>}
        </div>}

    </>

    )
}

export default SimpleInputTextoMemo;
