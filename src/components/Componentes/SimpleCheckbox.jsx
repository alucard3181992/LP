import React, { useEffect, useState } from 'react';
import { Funciones } from '../Tabla/Funciones';

import { InputText } from 'primereact/inputtext';
import { useUpdateEffect } from 'primereact/hooks';
import { Checkbox } from 'primereact/checkbox';

const SimpleCheckboxMemo = ({ campo, cliente, setCliente, original }) => {
    //console.log("ME LLAMAN SimpleInputTextoMemo", campo, " CLIENTE ", cliente);
    //const [valor, setValor] = useState(cliente[campo]);
    const [titulo] = useState(Funciones.formatearCadena(campo))
    const [modificado, setModificado] = useState(false)
    const [valorOriginal, setValorOriginal] = useState("")

    useUpdateEffect(() => {
        setValorOriginal(cliente[campo])
    }, [original])

    const cambioValores = (campo, valor, setCliente, cliente,) => {
        setCliente({
            ...cliente,
            [campo]: valor
        })
        if (valorOriginal !== valor) {
            setModificado(true)
        } else {
            setModificado(false)
        }

    }
    function generarCadenaSombra(numPasos, color) {
        const resultado = Array.from({ length: numPasos }, (_, index) => {
            const offsetPos = (index + 1) * 5;
            const offsetNeg = (index + 1) * -5;
            return `${color} ${offsetNeg}px ${offsetPos}px`;
        }).join(',');

        return resultado;
    }

    return (<>
        <div
            className="field mb-5 w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg"
            style={{
                background: '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)',
                boxShadow: modificado ? generarCadenaSombra(3, 'var(--surface-hover)') : ""
            }} >
            <label>
                {`${titulo}: `}
                <Checkbox
                    checked={cliente[campo]}
                    onChange={(e) => cambioValores(campo, e.checked, setCliente, cliente)}
                />
            </label>
        </div>

    </>

    )
}

export default SimpleCheckboxMemo;
