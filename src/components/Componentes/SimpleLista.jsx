import React, { useEffect, useState } from 'react';
import { Funciones } from '../Tabla/Funciones';

import { InputText } from 'primereact/inputtext';
import { useUpdateEffect } from 'primereact/hooks';
import { Dropdown } from 'primereact/dropdown';

const SimpleListaMemo = ({ campo, cliente, setCliente, original, validados, setNoValidos, noValidos }) => {
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
            [campo]: valor ? valor.name : ""
        })

        if (valor) {
            const nuevosErrores = { ...noValidos }
            if (valor.name.trim() !== "" && valor.name !== 0 && !(Array.isArray(valor.name) && valor.name.length === 0)) {
                delete nuevosErrores[campo]
            }
            setNoValidos(nuevosErrores)
        }

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

    const cities = [
        { name: 'TARIJA-BOLIVIA', code: 'tb' },
        { name: 'CHUQUISACA-BOLIVIA', code: 'cb' },
        { name: 'ORURO-BOLIVIA', code: 'ob' },
        { name: 'LA PAZ-BOLIVIA', code: 'lb' },
        { name: 'SANTA CRUZ-BOLIVIA', code: 'sb' },
        { name: 'POTOSI-BOLIVIA', code: 'pb' },
        { name: 'COCHABAMBA-BOLIVIA', code: 'c2b' },
        { name: 'PANDO-BOLIVIA', code: 'p2b' },
        { name: 'BENI-BOLIVIA', code: 'bb' },
    ]

    return (<>
        <div className={validados ? "field error p-error mb-5" : "field mb-5"}>
            <span className="w-full p-float-label font-bold p-input-icon-right">
                <i className={modificado ? "pi pi-save" : ""} />
                <Dropdown value={cities.find(item => item.name === cliente[campo]) || null}
                    onChange={(e) => cambioValores(campo, e.target.value, setCliente, cliente)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Seleccione la ciudad"
                    className={'w-full border-1 surface-border border-round-md py-2 px-3 text-color font-semibold text-lg transition-all transition-duration-150'}
                    style={{
                        background: '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)',
                        //transform: modificado ? 'translateY(5px)' : 'translateY(0)',
                        boxShadow: modificado ? generarCadenaSombra(1, 'var(--surface-hover)') : ""
                    }}
                    showClear
                    pt={{
                        clearIcon: {
                            className: "mr-3",
                            style: { color: "red" }
                        }
                    }}
                />
                <label>{titulo}: </label>
            </span>
            {validados && < small className="p-error font-bold errorMio">{`${validados} ${titulo} es requerido`}</small>}
        </div>

    </>

    )
}

export default SimpleListaMemo;
