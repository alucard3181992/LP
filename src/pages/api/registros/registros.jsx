

import prisma from '@/lib/prisma';

const RegistroBD = async (req, res) => {
    const { method } = req;
    //console.log("METODO ", method);
    switch (method) {
        case "GET": {
            try {
                const data = await prisma.dg.findMany({
                    include: {
                        dt: true,
                        udf: true,
                        dh: true,
                        det: true,
                    }
                })

                return res.status(200).json(data)
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "POST": {
            try {
                //console.log("SOY POST ", req.body)
                const { dg, dt, dh, udf } = req.body
                let id = 0
                await prisma.$transaction(async (prisma) => {
                    const registroDG = await prisma.dg.create({
                        data: dg
                    })
                    id = registroDG.iddg
                    //agregar registros en dt
                    for (const [key, value] of Object.entries(dt)) {
                        const nombre = formatearCadena(key);
                        //console.log(`Procesando: ${nombre} con valor ${value}`);

                        // Buscar el registro de dett correspondiente
                        const ayuda = await prisma.dett.findFirst({
                            where: {
                                nombre: nombre
                            }
                        });

                        // Verificar si se encontró un registro en dett
                        if (ayuda) {
                            // Crear el nuevo registro en dt
                            await prisma.dt.create({
                                data: {
                                    iddg: registroDG.iddg,
                                    nombre: nombre,
                                    medida: value,
                                    unidad: ayuda.unmed, // Ajusta según sea necesario
                                    estado: true, // Ajusta según sea necesario
                                },
                            });
                            //console.log(`Registro creado para ${nombre}`);
                        } else {
                            //console.log(`No se encontró una unidad de medida para ${nombre}`);
                        }
                    }

                    //agregar registros en dh
                    for (const [key, value] of Object.entries(dh)) {
                        const nombre = formatearCadena(key);
                        //console.log(`Procesando: ${nombre} con valor ${value}`);

                        // Buscar el registro de dett correspondiente
                        const ayuda = await prisma.deth.findFirst({
                            where: {
                                nombre: nombre
                            }
                        });

                        // Verificar si se encontró un registro en dett
                        if (ayuda) {
                            // Crear el nuevo registro en dt
                            await prisma.dh.create({
                                data: {
                                    iddg: registroDG.iddg,
                                    nombre: nombre,
                                    medida: value,
                                    unidad: ayuda.unmed, // Ajusta según sea necesario
                                    estado: true, // Ajusta según sea necesario
                                },
                            });
                            //console.log(`Registro creado para ${nombre}`);
                        } else {
                            //console.log(`No se encontró una unidad de medida para ${nombre}`);
                        }
                    }
                    for (const nuevo of udf) {
                        await prisma.udf.create({
                            data: {
                                iddg: registroDG.iddg,
                                inicio: nuevo.inicio,
                                final: nuevo.final,
                                unidad: nuevo.unidad,
                            }
                        })
                    }


                })

                return res.status(200).json({ message: "TODO BIEN", id: id });
            } catch (error) {
                //console.log("ERROR", error);
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "DELETE": {
            try {
                //console.log("SOY DELETE", req.body)
                const { id, estado } = req.body
                const iddg = id
                const estadoreal = estado ? false : true
                const msg = estado ? "DADO DE BAJA" : "DADO DE ALTA"
                const valores = { estado: estadoreal }
                //console.log("ME LLAMAN ELIMINAR ", req.body);
                await prisma.dg.update({
                    where: {
                        iddg: iddg
                    },
                    data: valores
                })
                return res.status(200).json({ message: 'TODO BIEN', msg: msg })
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "PUT": {
            try {
                //console.log("SOY PUT ", req.body)
                const { iddg, nuevos, modificados, eliminados, dg, dt, dh } = req.body

                await prisma.$transaction(async (prisma) => {

                    //console.log("LA CLAVE ES", iddg)

                    // Manejar nuevos registros
                    for (const nuevo of nuevos) {
                        const nuevo1 = await prisma.udf.create({
                            data: {
                                iddg: iddg,
                                inicio: nuevo.inicio,
                                final: nuevo.final,
                                unidad: nuevo.unidad,
                                estado: true, // Valor por defecto
                            },
                        })
                    }

                    // Manejar registros modificados
                    for (const modificado of modificados) {
                        const { iduf, ...camposAActualizar } = modificado;
                        await prisma.udf.update({
                            where: { iduf: iduf, iddg: iddg },
                            data: camposAActualizar,
                        });
                    }

                    // Manejar registros eliminados
                    for (const eliminado of eliminados) {
                        await prisma.udf.delete({
                            where: { iduf: eliminado.iduf },
                        })
                    }

                    const dataToUpdate = {};

                    // Iterar sobre el array `dg` para construir el objeto `dataToUpdate`
                    for (const dgItem of dg) {
                        //console.log("EXISTEN DATOS EN DG");
                        // Obtener la clave y el valor del campo a actualizar
                        const [key, value] = Object.entries(dgItem)[0];
                        // Agregar el campo al objeto `dataToUpdate`
                        if (key !== 'iddg') {
                            dataToUpdate[key] = value;
                        }
                    }
                    if (Object.keys(dataToUpdate).length > 0) {
                        await prisma.dg.update({
                            where: {
                                iddg: iddg
                            },
                            data: dataToUpdate
                        })
                    } else {
                        //console.log("No hay campos a actualizar");
                    }
                    //buscar cambios en dt si en caso no existe se crea y se ayuda con dett
                    for (const cambio of dt) {
                        //console.log("EXITEN DATOS EN DT");
                        for (const [key, value] of Object.entries(cambio)) {
                            const nombre = formatearCadena(key);
                            // Actualizar el registro en la base de datos
                            const resultado = await prisma.dt.updateMany({
                                where: {
                                    iddg: iddg,
                                    nombre: nombre,
                                },
                                data: {
                                    medida: value,
                                },
                            })
                            if (resultado.count === 0) {
                                const ayuda = await prisma.dett.findFirst({
                                    where: {
                                        nombre: nombre
                                    }
                                })
                                await prisma.dt.create({
                                    data: {
                                        iddg: iddg,
                                        nombre: nombre,
                                        medida: value,
                                        unidad: ayuda.unmed, // Puedes ajustar esto según sea necesario
                                        estado: true, // Ajusta según sea necesario
                                    },
                                });
                            }
                        }
                    }

                    //buscar cambios en dh si en caso no existe se crea y se ayuda con deth
                    for (const cambio of dh) {
                        //console.log("EXITEN DATOS EN DH");
                        for (const [key, value] of Object.entries(cambio)) {
                            const nombre = formatearCadena(key);
                            // Actualizar el registro en la base de datos
                            const resultado = await prisma.dh.updateMany({
                                where: {
                                    iddg: iddg,
                                    nombre: nombre,
                                },
                                data: {
                                    medida: value,
                                },
                            });
                            if (resultado.count === 0) {
                                const ayuda = await prisma.deth.findFirst({
                                    where: {
                                        nombre: nombre
                                    }
                                })
                                await prisma.dh.create({
                                    data: {
                                        iddg: iddg,
                                        nombre: nombre,
                                        medida: value,
                                        unidad: ayuda.unmed, // Puedes ajustar esto según sea necesario
                                        estado: true, // Ajusta según sea necesario
                                    },
                                });
                            }
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
function formatearCadena(cadena) {
    return cadena
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Separa camelCase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Maneja casos como "DiferentesCasos"
        .replace(/_/g, ' ') // Reemplaza guiones bajos con espacios
        .toUpperCase()// Convierte todo a mayusculas
        .replace(/^./, function (str) {
            return str.toUpperCase(); // Convierte la primera letra a mayúscula
        });
}

export default RegistroBD
