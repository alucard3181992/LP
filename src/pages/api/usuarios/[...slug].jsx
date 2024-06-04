

import prisma from '@/lib/prisma';

const UsuarioBDP = async (req, res) => {
    const { method } = req;
    //console.log("METODO ", method);
    switch (method) {
        case "POST": {
            try {
                const { slug } = req.query
                const idu2 = parseInt(slug[0])
                console.log("SOY POST AHORA", slug, "BODY", req.body);
                console.log("SLUG", slug);
                const { objeto, valor } = req.body
                const { login, idu } = objeto
                console.log("LOGIN", login, "IDU", idu);

                if (idu === idu2) {
                    await prisma.datos.update({
                        where: {
                            login,
                            idu
                        },
                        data: {
                            contrasenia: valor
                        }
                    })
                }


                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "PUT": {
            try {
                const { slug } = req.query
                const { campo, valor } = req.body
                const idu = parseInt(slug[0])
                const existingConf = await prisma.conf.findFirst({
                    where: {
                        idu: idu,
                    }
                })
                //console.log("EL VALOR ES", existingConf, "CAMPO ", campo, "VALOR", valor);
                if (existingConf) {
                    // Si existe, actualiza el registro
                    await prisma.conf.update({
                        where: { idconf: existingConf.idconf },
                        data: {
                            [campo]: valor
                        },
                    })
                    //return updatedConf;
                } else {
                    // Si no existe, inserta un nuevo registro
                    await prisma.conf.create({
                        data: {
                            [campo]: valor,
                            idu: idu
                        },
                    })
                    //return newConf;
                }
                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "DELETE": {
            try {

                return res.status(200).json({ message: 'TODO BIEN', msg: msg })
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }

        case "GET": {
            try {
                const { slug } = req.query
                const idu = parseInt(slug[0])
                const data = await prisma.usuario.findFirst({
                    where: {
                        idu: idu
                    },
                    select: {
                        persona: {
                            select: {
                                nombre: true,
                                idpe: true,
                                ap: true,
                                am: true,
                                ci: true
                            }
                        },
                        sexo: true,
                        fecnac: true,
                        idu: true,
                        datos: {
                            select: {
                                login: true,
                                contrasenia: true,
                            }
                        },
                        conf: true,
                    }
                })
                const usuario = data.persona.nombre + " " + data.persona.ap + " " + data.persona.am
                const datos = {
                    idu: data.idu,
                    login: data.datos[0].login,
                    contrasenia: data.datos[0].contrasenia,
                    sexo: data.sexo,
                    fecnac: data.fecnac,
                    ci: data.persona.ci,
                    idpe: data.persona.idpe,
                    concat: usuario,
                    conf: data.conf
                }
                return res.status(200).json(datos)
            } catch (error) {
                console.log("ERROR", error);
                return res.status(200).json({ message: "ERROR: " + error })
            }
        }

    }

}
export default UsuarioBDP
