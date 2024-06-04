import axios from "axios";
import { baseUrl } from "@/lib/ip";

export class LoginServicio {
    async listar(datosLogin) {
        const datos = await axios.post(baseUrl + "api/login", datosLogin);
        return datos.data;
    }
    async verificar() {
        const datos = await axios.get(baseUrl + "api/login");
        return datos.data;
    }
    async eliminar() {
        const datos = await axios.delete(baseUrl + "api/login");
        return datos;
    }
    async imagen(id) {
        const datos = await axios.put(baseUrl + "api/login", { id });
        return datos.data;
    }
    async prueba() {
        const datos = await axios.get(baseUrl + "api/usuarios/usuario");
        return datos.data;
    }
    async prueba2() {
        const datos = await axios.get("http://localhost:3000/api/rol/rol");
        return datos.data;
    }
    async ListarOrden() {
        const datos = await axios.get(baseUrl + "api/orden/orden");
        return datos.data;
    }
    async agregarConf(usuario, campo, valor) {
        const datos = await axios.put(baseUrl + "api/usuarios/" + usuario, { campo, valor });
        return datos.data;
    }
    async listarConf(usuario, valor, objeto) {
        //console.log("USUARIO", usuario);
        return await axios.post(baseUrl + "api/usuarios/" + usuario, { valor, objeto });

    }

    async listarDatos(usuario) {
        const datos = await axios.get(baseUrl + "api/usuarios/" + usuario);
        return datos.data;
    }
}