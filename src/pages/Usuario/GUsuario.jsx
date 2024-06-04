
    //carpeta services pages
    import VistaUsuario from "@/components/Usuario/UsuarioDatos";
import UsuarioContextProvider from "@/context/UsuarioContext";
const Usuario = () => {
    return (
        <UsuarioContextProvider>
            <VistaUsuario />
        </UsuarioContextProvider>
    )
}
export default Usuario;
