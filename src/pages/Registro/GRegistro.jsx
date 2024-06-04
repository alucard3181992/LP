
//carpeta services pages
import VistaRegistro from "@/components/Registro/RegistroDatos";
import RegistroContextProvider from "@/context/RegistroContext";
const Registro = () => {
    return (
        <RegistroContextProvider>
            <VistaRegistro />
        </RegistroContextProvider>
    )
}
export default Registro;
