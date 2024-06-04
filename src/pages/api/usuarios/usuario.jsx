

import prisma from '@/lib/prisma';

const UsuarioBD = async (req, res) => {
    const { method } = req;
    //console.log("METODO ", method);
    switch (method) {
        case "GET": {
            try {
                const data = await prisma.usuario.findMany({
                    select: {
                        idpe: true,
                        idu: true,
                        fecnac: true,
                        sexo: true,
                        estado: true,
                        persona: {
                            include: {
                                telefono: true,
                            },
                        },
                        usurol: {
                            select:
                                { roles: true }
                        },
                    }
                })
                return res.status(200).json(data)
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "PUT": {
            try {
                //console.log("SOY PUT");
                //console.log("BODY", req.body);
                const { cliente } = req.body
                //console.log("CLIENTE", cliente);
                const persona = cliente
                const cambios = cliente.cambios
                const valores = {
                    ci: persona.ci,
                    nombre: persona.nombre,
                    ap: persona.ap,
                    am: persona.am,
                    direccion: persona.direccion,
                    email: persona.email,
                    base64: persona.base64
                }
                const valoresUsuario = {
                    sexo: persona.sexo,
                    fecnac: persona.fecnac,
                }

                await prisma.$transaction(async (prisma) => {
                    await prisma.persona.update({
                        where: {
                            idpe: persona.idpe
                        },
                        data: valores
                    })
                    await prisma.usuario.update({
                        where: {
                            idpe: persona.idpe,
                            idu: persona.idu
                        },
                        data: valoresUsuario

                    })
                    if (cambios.telefono.cambio === "SI") {
                        const telefonos = cambios.telefono.data
                        for (const tel of telefonos.nuevos) {
                            await prisma.telefono.create({
                                data: {
                                    estado: true,
                                    numero: tel,
                                    persona: { connect: { idpe: persona.idpe } }
                                }
                            })
                        }
                        for (const tel of telefonos.eliminados) {
                            const idtel = await prisma.telefono.findFirst({
                                where: {
                                    idpe: persona.idpe,
                                    numero: tel
                                }
                            })
                            await prisma.telefono.delete({
                                where: {
                                    idtel: idtel.idtel,
                                    idpe: persona.idpe,
                                    numero: tel
                                }
                            })
                        }
                    }

                    if (cambios.usurol.cambio === "SI") {
                        const roles = cambios.usurol.data
                        for (const rol of roles.nuevos) {
                            await prisma.usurol.create({
                                data: {
                                    idr: rol,
                                    idu: persona.idu
                                }
                            })
                        }
                        for (const rol of roles.eliminados) {
                            await prisma.usurol.delete({
                                where: {
                                    idr_idu: {
                                        idr: rol,
                                        idu: persona.idu,
                                    }
                                }
                            });
                        }
                    }
                })
                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                //console.log(error)
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "DELETE": {
            try {
                //console.log("SOY DELETE", req.body)
                const { id, estado } = req.body
                const idu = id
                const estadoreal = estado ? false : true
                const msg = estado ? "DADO DE BAJA" : "DADO DE ALTA"
                const valores = { estado: estadoreal }
                //console.log("ME LLAMAN ELIMINAR ", req.body);
                await prisma.usuario.update({
                    where: {
                        idu: idu
                    },
                    data: valores
                })
                return res.status(200).json({ message: 'TODO BIEN', msg: msg })
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }

        case "POST": {
            try {
                console.log("SOY POST", req.body)
                const {
                    ci,
                    nombre,
                    ap,
                    am,
                    direccion,
                    email,
                    base64,
                    sexo,
                    fecnac,
                    cambios
                } = req.body
                const valores = {
                    ci: ci,
                    nombre: nombre,
                    ap: ap,
                    am: am,
                    direccion: direccion,
                    email: email,
                    base64: base64,
                    estado: true,
                }

                await prisma.$transaction(async (prisma) => {
                    const personaNueva = await prisma.persona.create({
                        data: valores
                    })

                    const usuarioNuevo = await prisma.usuario.create({
                        data: {
                            sexo: sexo,
                            fecnac: fecnac,
                            persona: { connect: { idpe: personaNueva.idpe } }
                        }

                    })
                    const noInicial = nombre.slice(0, 2)
                    const apInicial = ap.slice(0, 2)
                    const amInicial = am.slice(0, 2)
                    const datos = `${noInicial}${apInicial}${amInicial}`
                    const login = datos.toLocaleUpperCase()
                    const contrasenia = '12345';
                    await prisma.conf.create({
                        data: {
                            responsivo: false,
                            tam: "normal",
                            tema: "mira",
                            usuario: { connect: { idu: usuarioNuevo.idu } }
                        }
                    })
                    await prisma.datos.create({
                        data: {
                            login: login,
                            contrasenia: contrasenia,
                            usuario: { connect: { idu: usuarioNuevo.idu } }
                        }
                    })

                    if (cambios.telefono.cambio === "SI") {
                        const telefonos = cambios.telefono.data
                        for (const tel of telefonos.nuevos) {
                            await prisma.telefono.create({
                                data: {
                                    estado: true,
                                    numero: tel,
                                    persona: { connect: { idpe: personaNueva.idpe } }
                                }
                            })
                        }
                    }

                    if (cambios.usurol.cambio === "SI") {
                        const roles = cambios.usurol.data
                        for (const rol of roles.nuevos) {
                            await prisma.usurol.create({
                                data: {
                                    idr: rol,
                                    idu: usuarioNuevo.idu
                                }
                            })
                        }
                    }
                })
                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                //console.log("ERROR", error);
                return res.status(200).json({ message: "ERROR: " + error })
            }
        }

    }

}
export default UsuarioBD
