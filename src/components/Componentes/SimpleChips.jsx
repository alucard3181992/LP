import React, { useEffect, useState } from 'react';
import { Funciones } from '../Tabla/Funciones';

import { InputText } from 'primereact/inputtext';
import { useUpdateEffect } from 'primereact/hooks';
import { Chips } from 'primereact/chips';

const SimpleChipsMemo = ({ campo, cliente, setCliente, original }) => {
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

    }
    const sonIguales = (array1, array2) => JSON.stringify(array1) === JSON.stringify(array2);

    const cambioReal = () => {
        if (sonIguales(cliente[campo], valorOriginal)) {
            setModificado(false)
        } else {
            setModificado(true)
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
        <div className="mb-5">
            <span className="w-full p-float-label font-bold p-input-icon-right">
                <i className={modificado ? "pi pi-save" : ""} />
                <Chips
                    value={cliente[campo]}
                    onChange={(e) => cambioValores(campo, e.target.value, setCliente, cliente)}
                    onBlur={cambioReal}
                    //onChange={(e) => Funciones.cambioValores(campo, e.target.value, setCli, setCliente, cliente, cli)}
                    className='w-full'
                    pt={{
                        //root: { className: 'flex' },
                        container: {
                            className: 'w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg transition-all transition-duration-150',
                            style: {
                                background: '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)',
                                boxShadow: modificado ? generarCadenaSombra(3, 'var(--surface-hover)') : ""
                            }
                        },
                        //token: { className: 'bg-primary' }
                    }}
                />
                <label>{titulo}: </label>
            </span>
        </div>
    </>

    )
}

export default SimpleChipsMemo;
