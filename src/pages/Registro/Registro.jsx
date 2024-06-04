//carpeta services pages
import VistaPrincipalRegistro from "@/components/Registro/Registro";
import RegistroContextProvider from "@/context/RegistroContext";
const VistaRegistro = () => {
    return (
        <RegistroContextProvider>
            <VistaPrincipalRegistro></VistaPrincipalRegistro>
        </RegistroContextProvider>
    )
}
export default VistaRegistro;
