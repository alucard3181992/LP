

import prisma from '@/lib/prisma';
const { generateReport } = require("node-json-jasper");

const InformeRegistroBD = async (req, res) => {
    const { method } = req;
    //console.log("METODO ", method);
    switch (method) {
        case "POST": {
            try {

                const { props } = req.body
                //console.log("LO QUE LLEGA ES 2", props);
                const report = generateReport(
                    "Registro",
                    "public/icons/Registro3.jasper",
                    "E:/qr/",
                    "E:/qr/data.json",
                );
                res.status(200).send(report);
            } catch (error) {
                return res.status(400).json({ message: "ERROR SOY: " + error })
            }
        }
        case "PUT": {
            try {

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
                console.log("SOY GET ", req.body);
                /* const data = await prisma.dg.findFirst({
                    where: {
                        iddg: id
                    },
                    include: {
                        dt: true,
                        udf: true,
                        dh: true,
                        det: true,
                    }
                })
                return res.status(200).json(data) */
            } catch (error) {
                console.log("ERROR", error);
                return res.status(200).json({ message: "ERROR: " + error })
            }
        }

    }

}
export default InformeRegistroBD
