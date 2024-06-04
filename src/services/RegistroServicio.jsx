
//carpeta services
import axios from "axios";
import { baseUrl } from "@/lib/ip";

export class RegistroServicio {
    async listarRegistro() {
        const datos = await axios.get(baseUrl + "api/registros/registros");
        return datos.data;
    }
    async create(cliente) {
        return await axios.post(baseUrl + "api/registros/registros", cliente)
    }
    async modificar(cliente) {
        return await axios.put(baseUrl + "api/registros/registros", cliente);
    }
    async eliminar(cliente) {
        return await axios.delete(baseUrl + "api/registros/registros", { data: cliente });
    }

    async generarPdf(objeto) {
        const datos = await axios.post(baseUrl + "api/registros/informe", objeto);
        return datos;
    }
}
