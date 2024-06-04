


const InformeRegistroBD = async (req, res) => {
    const { method } = req;
    //console.log("METODO ", method);
    switch (method) {
        case "POST": {
            try {

                return res.status(200).json({ message: "TODO BIEN" });
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

                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                return res.status(400).json({ message: "ERROR: " + error })
            }
        }

        case "GET": {
            try {
                return res.status(200).json({ message: "TODO BIEN" });
            } catch (error) {
                console.log("ERROR", error);
                return res.status(200).json({ message: "ERROR: " + error })
            }
        }

    }

}
export default InformeRegistroBD
