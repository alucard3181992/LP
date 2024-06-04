import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Badge } from "primereact/badge";

export function TablaFiltros({ lista, setLista }) {

    useEffect(() => {
        if (lista.length !== 0) {
            //lista.sort((a, b) => a.inicio - b.inicio)
            setListaNueva(lista)
        }
    }, [lista])

    const [listaNueva, setListaNueva] = useState([])

    const sombra = '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)'

    const sacar = (inicio) => {
        const nuevaLista = listaNueva.filter(item => item.inicio !== inicio)
        setLista(nuevaLista)
        setListaNueva(nuevaLista)
    }

    const modificarValor = (inicio, nuevoValor, campo) => {
        // Crea una nueva lista modificada basada en la lista original
        const listaModificada = listaNueva.map(item => {
            // Verifica si el iduf del elemento actual coincide con el iduf proporcionado
            if (item.inicio === inicio) {
                // Si coinciden, devuelve un nuevo objeto con el valor actualizado
                return {
                    ...item, // Mantiene las propiedades existentes del objeto
                    [campo]: nuevoValor // Actualiza la propiedad 'descripcion' con el nuevo valor
                };
            } else {
                // Si no coinciden, devuelve el mismo objeto sin cambios
                return item;
            }
        });

        // Imprime la nueva lista en la consola
        setLista(listaModificada)
        setListaNueva(listaModificada)
    }

    const bajar = (iduf) => {
        console.log("BAJAR");
        const index = listaNueva.findIndex(item => item.inicio === iduf);
        if (index < listaNueva.length - 1) {
            const temp = listaNueva[index];
            listaNueva[index] = listaNueva[index + 1];
            listaNueva[index + 1] = temp;
            // Aquí podrías realizar cualquier otra operación necesaria
            const nuevaLista = [...listaNueva]
            setListaNueva(nuevaLista)
            setLista(nuevaLista)
            //ayuda()
        }
    }

    const subir = (iduf) => {
        const index = listaNueva.findIndex(item => item.inicio === iduf)
        if (index > 0) {
            const temp = listaNueva[index]
            listaNueva[index] = listaNueva[index - 1]
            listaNueva[index - 1] = temp
            // Aquí podrías realizar cualquier otra operación necesaria
            const nuevaLista = [...listaNueva]
            setListaNueva(nuevaLista)
            setLista(nuevaLista)
            //ayuda()
        }
    }

    return (<React.Fragment>
        <div className="grid">
            <div className="col-4 sombra" >
                Inicio
            </div>
            <div className="col-4 sombra" >
                Final
            </div>
            <div className="col-4 sombra" >
                Medida
            </div>
            {listaNueva && listaNueva.map((item, index) => (<React.Fragment key={item.inicio * Math.random(1000)}>
                <div className={index % 2 === 0 ? "col-4 sombra" : "col-4"} >
                    <InputNumber value={item.inicio}
                        className="p-0 m-0"
                        pt={{
                            input: {
                                root: {
                                    className: "w-full p-0 m-0 border-none"
                                    ,
                                    style: { background: "transparent" }
                                }
                            }
                        }}
                        onValueChange={(e) => { e.preventDefault(); modificarValor(item.inicio, e.value, "inicio") }} />
                </div>
                <div className={index % 2 === 0 ? "col-4 sombra" : "col-4"}>
                    <InputNumber value={item.final}
                        pt={{
                            input: {
                                root: {
                                    className: "w-full p-0 m-0 border-none"
                                    ,
                                    style: { background: "transparent" }
                                }
                            }
                        }}
                        onValueChange={(e) => { e.preventDefault(); modificarValor(item.inicio, e.value, "final") }} />
                </div>
                <div className={index % 2 === 0 ? "col-4 sombra" : "col-4"}>
                    <div className="flex">
                        <div>{item.unidad}</div>
                        <Button
                            className="p-0 m-0"
                            icon="pi pi-trash"
                            size="small"
                            text
                            severity="danger"
                            tooltip="eliminar"
                            tooltipOptions={{ position: "right" }}
                            onClick={(e) => { e.preventDefault(); sacar(item.inicio) }} />
                        <Button
                            className="p-0 m-0"
                            icon="pi pi-angle-up"
                            size="small"
                            text
                            tooltip="subir"
                            tooltipOptions={{ position: "top" }}
                            onClick={(e) => { e.preventDefault(); subir(item.inicio) }} />
                        <Button
                            className="p-0 m-0"
                            icon="pi pi-angle-down"
                            size="small"
                            text
                            tooltip="bajar"
                            tooltipOptions={{ position: "top" }}
                            onClick={(e) => { e.preventDefault(); bajar(item.inicio) }} />
                        {!item.iduf && <Badge
                            style={{ background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)' }}
                            value="Nuevo"
                            severity="info"
                        />}
                    </div>
                </div>

            </React.Fragment>))}
        </div>
    </React.Fragment>)
}


export function TablaEntubado({ lista }) {
    //console.log("LA LISTA ES", lista);
    //const listaOrdenada = lista.sort((a, b) => a.iduf - b.iduf);
    const sombra = '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)'
    //console.log("LA LISTA QUE LLEGA ES", lista);
    return (<React.Fragment>
        <div className="grid">
            <div className="col-4 sombra  font-bold" >
                Profundidad
            </div>
            <div className="col-8 sombra  font-bold" >
                Descripcion
            </div>
            {lista && lista.map((item, index) => (<React.Fragment key={index * Math.random(10000)}>
                <div className={index % 2 === 0 ? "col-4 sombra" : "col-4"} >
                    {item.profundidad}
                </div>
                <div className={index % 2 === 0 ? "col-8 sombra" : "col-8"}>
                    {item.descrip}
                </div>

            </React.Fragment>))}
        </div>
    </React.Fragment>)
}