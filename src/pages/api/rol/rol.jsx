
import prisma from '@/lib/prisma';

const RolBD = async (req, res) => {
    const { method } = req;
    //console.log("METODO ", method);
    switch (method) {
        case "PUT": {
            try {
                const { idr, nombre, descrip, estado } = req.body
                const valores = { nombre, descrip, estado }
                await prisma.roles.update({
                    where: {
                        idr: idr
                    },
                    data: valores
                })
                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "GET": {
            try {
                const data = await prisma.roles.findMany({
                    include: {
                        rolmenu: {
                            select: {
                                menu: {
                                    select: {
                                        idm: true,
                                        nom: true,
                                        estado: true,
                                    }
                                }
                            }
                        }
                    }
                })
                return res.status(200).json(data)
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }
        case "DELETE": {
            try {
                const { idr, estado } = req.body
                const estadoreal = estado ? false : true
                const msg = estado ? "DADO DE BAJA" : "DADO DE ALTA"
                const valores = { estado: estadoreal }
                await prisma.roles.update({
                    where: {
                        idr: idr
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
                await prisma.roles.create({
                    data: req.body
                })
                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                console.log("ERROR", error);
                return res.status(200).json({ message: "ERROR: " + error })
            }
        }

    }

}
export default RolBD