import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { RegistroContext } from "@/context/RegistroContext";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const SimpleVistaNueva = () => {

    const { adicional, setAdicional } = useContext(RegistroContext)
    const [bloqueo, setBloqueo] = useState(false)
    const [form, setForm] = useState(false)

    useEffect(() => {
        //console.log("SOY ADICIONAL1", adicional);
        if (adicional.data && adicional.data !== "nada") {
            setBloqueo(true)
            setForm(true)
            //console.log("SOY ADICIONAL", adicional);
        }
    }, [adicional])



    function cerrarFomrulario() {
        setForm(false)
    }

    const footer = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" severity='danger' onClick={cerrarFomrulario} />
            <Button label={"Aceptar"} icon="pi pi-check" />
        </React.Fragment>
    )

    return (<React.Fragment>
        {bloqueo ? adicional.col.componente && <Dialog
            header={"Administrar"}
            visible={form}
            style={{ width: '62rem' }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            onHide={cerrarFomrulario}
            footer={footer}
            modal className="p-fluid"
            draggable={false}
            pt={{
                mask: {
                    style: {
                        background: '-webkit-linear-gradient(top, var(--highlight-bg) 0%, var(--highlight-bg) 100%)',

                    },
                }
            }}

        >
            <adicional.col.componenteModulo data={adicional.data} />
        </Dialog> : ""}
    </React.Fragment>)
}
export default SimpleVistaNueva