import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';

import React, { useState, useContext, useRef, useEffect } from 'react';
import { PrincipalContext } from '@/context/PrincipalContext';

export const CambioContraseña = ({ dialog, setDialog, mensajeFlotante, mensajeEstatico, msgs }) => {

    useEffect(() => {
        console.log("ME LLAMAN CAMBIO");
        //console.log("DATOS", Datos);
    }, []);

    const { CambioContra } = useContext(PrincipalContext)

    const datos = {
        nueva: { valor: "", titulo: "NUEVA CONTRASEÑA", key: "nueva" },
        nueva2: { valor: "", titulo: "REPITA LA CONTRASEÑA", key: "nueva2" },
    }
    const [datosNuevos, setDatosNuevos] = useState(datos)
    const cambioDatos = (e, campo2) => {
        setDatosNuevos({
            ...datosNuevos,
            [campo2]: {
                ...datosNuevos[campo2],
                valor: e
            }
        })
    }

    const campos = (object, campo, titulo) => {
        return (<React.Fragment key={titulo}>
            <div className="field mb-8">
                <span className="w-full p-float-label font-bold p-input-icon-right">
                    <Password
                        defaultValue={datos[campo]}
                        pt={{
                            root: {
                                className: 'w-full'
                            },
                            input: {
                                className: 'w-full border-1 surface-border border-round-md py-3 px-4 text-color font-semibold text-lg transition-all transition-duration-150',
                                style: {
                                    background: '-webkit-linear-gradient(top, var(--surface-ground) 0%, var(--surface-card) 100%)',
                                }
                            }
                        }}
                        maxLength={10}
                        footer={"Maximo 10 caracteres"}
                        onChange={(e) => cambioDatos(e.target.value, object.key)}
                        toggleMask
                        promptLabel={titulo}
                        weakLabel="Facil"
                        mediumLabel="Medio"
                        strongLabel="Dificil"
                    />
                    <label>{titulo}: </label>
                </span>
            </div>
        </React.Fragment>)
    }




    const enviarDatos = async () => {
        const resp = await CambioContra(datosNuevos.nueva.valor)
        resp.message === "TODO BIEN" ? (
            mensajeFlotante(false, "success", "EXITO", "CAMBIO REALIZADO", 4000),
            setDialog(false)
        ) : (mensajeEstatico(false, "info", "ERROR", resp.message, 1000))
    }

    return (<React.Fragment>
        <Dialog
            visible={dialog}
            onHide={(e) => setDialog(false)}
            header={"Cambio de Contraseña"}
        >
            <div className='mt-6'>
                <Messages ref={msgs} />
                {datosNuevos && Object.values(datosNuevos).map((campo) => (
                    campos(campo, campo.valor, campo.titulo)
                ))}

                <div className="text-center">
                    {datosNuevos.nueva.valor === datosNuevos.nueva2.valor && datosNuevos.nueva.valor !== ""
                        ? (
                            <Button label='Aceptar'
                                onClick={(e) => { e.preventDefault(), enviarDatos() }} />
                        ) : (
                            <Message severity="error" text="NO COINCIDEN" />
                        )
                    }
                </div>
            </div>
        </Dialog>
    </React.Fragment>)
}