import { Validacion } from "@/recursos/js/Validacion";
import { Funciones } from "../Tabla/Funciones";

/* export function Datos(data) {
    const d = data
    const d1 = {
        departamento: d.dp,
        provincia: d.pv,
        nombre: d.nombre,
        ubicacion: d.ubicacion,
        perforador: d.perforador,
        fecha: new Date(d.fecha),
    }
    const d2 = {
        tipo: d.filtro,
        tamaño: d.filtrom,
        medida: d.filtroum,
    }
    const d3 = {
        produndidadDePerforacion: "",
        produndidadDeEntubado: "",
        diametroDeEntubado: "",
        tipoDeCañeria: d.tipo
    }
    d.dt.forEach(item => {
        switch (item.nombre) {
            case "PROFUNDIDAD DE ENTUBADO":
                d3.produndidadDeEntubado = item.medida;
                break;
            case "PROFUNDIDAD DE PERFORACION":
                d3.produndidadDePerforacion = item.medida;
                break;
            case "DIAMETRO DE ENTUBADO":
                d3.diametroDeEntubado = item.medida;
                break;
            // Agrega más casos según sea necesario para otros nombres
        }
    });
    const d4 = {
        lat: d.lat,
        lng: d.longi,
        ubicado: "Ubicacion Real"
    }
    const d5 = {
        NivelEstatico: 0, NivelDinamico: 0,
        CaudalDeExplotacion: 0, ProfundidadDeInstalacionDeBomba: 0,
        TipoDeBombaRecomendada: 0
    }
    const d5Medidas = {
        NivelEstatico: 0, NivelDinamico: 0,
        CaudalDeExplotacion: 0, ProfundidadDeInstalacionDeBomba: 0,
        TipoDeBombaRecomendada: 0
    }
    d.dh.forEach(item => {
        switch (item.nombre) {
            case "NIVEL ESTATICO":
                d5Medidas.NivelEstatico = item.medida + " " + item.unidad
                d5.NivelEstatico = item.medida
                break;
            case "NIVEL DINAMICO":
                d5Medidas.NivelDinamico = item.medida + " " + item.unidad
                d5.NivelDinamico = item.medida
                break;
            case "CAUDAL DE EXPLOTACION":
                d5Medidas.CaudalDeExplotacion = item.medida + " " + item.unidad
                d5.CaudalDeExplotacion = item.medida
                break;
            case "PROFUNDIDAD DE INSTALACION DE BOMBA":
                d5Medidas.ProfundidadDeInstalacionDeBomba = item.medida + " " + item.unidad
                d5.ProfundidadDeInstalacionDeBomba = item.medida
                break;
            case "TIPO DE BOMBA RECOMENDADA":
                d5Medidas.TipoDeBombaRecomendada = item.medida + " " + item.unidad
                d5.TipoDeBombaRecomendada = item.medida
                break;
        }
    });
    const observa = d.observa
    const udf = d.udf
    const det = d.det
    return { d1, d2, d3, d4, d5, observa, udf, d5Medidas, det }
} */
export function Datos(data) {
    return new Promise((resolve) => {
        const d = data;
        const d1 = {
            iddg: d.iddg,
            departamento: d.dp,
            provincia: d.pv,
            nombre: d.nombre,
            ubicacion: d.ubicacion,
            perforador: d.perforador,
            fecha: Funciones.fechabien(d.fecha),
        }

        const d2 = {
            tipo: d.filtro,
            tamaño: d.filtrom,
            medida: d.filtroum,
        };
        const d3 = {
            profundidadDePerforacion: "",
            profundidadDeEntubado: "",
            diametroDeEntubado: "",
            tipoDeCañeria: d.tipo
        };
        d.dt.forEach(item => {
            switch (item.nombre) {
                case "PROFUNDIDAD DE ENTUBADO":
                    d3.profundidadDeEntubado = item.medida;
                    break;
                case "PROFUNDIDAD DE PERFORACION":
                    d3.profundidadDePerforacion = item.medida;
                    break;
                case "DIAMETRO DE ENTUBADO":
                    d3.diametroDeEntubado = item.medida;
                    break;
            }
        });
        const d4 = {
            lat: d.lat,
            lng: d.longi,
            ubicado: "Ubicacion Real"
        };
        const d5 = {
            NivelEstatico: 0, NivelDinamico: 0,
            CaudalDeExplotacion: 0, ProfundidadDeInstalacionDeBomba: 0,
            TipoDeBombaRecomendada: 0
        };
        const d5Medidas = {
            NivelEstatico: 0, NivelDinamico: 0,
            CaudalDeExplotacion: 0, ProfundidadDeInstalacionDeBomba: 0,
            TipoDeBombaRecomendada: 0
        };
        d.dh.forEach(item => {
            switch (item.nombre) {
                case "NIVEL ESTATICO":
                    d5Medidas.NivelEstatico = item.medida + " " + item.unidad;
                    d5.NivelEstatico = item.medida;
                    break;
                case "NIVEL DINAMICO":
                    d5Medidas.NivelDinamico = item.medida + " " + item.unidad;
                    d5.NivelDinamico = item.medida;
                    break;
                case "CAUDAL DE EXPLOTACION":
                    d5Medidas.CaudalDeExplotacion = item.medida + " " + item.unidad;
                    d5.CaudalDeExplotacion = item.medida;
                    break;
                case "PROFUNDIDAD DE INSTALACION DE BOMBA":
                    d5Medidas.ProfundidadDeInstalacionDeBomba = item.medida + " " + item.unidad;
                    d5.ProfundidadDeInstalacionDeBomba = item.medida;
                    break;
                case "TIPO DE BOMBA RECOMENDADA":
                    d5Medidas.TipoDeBombaRecomendada = item.medida + " " + item.unidad;
                    d5.TipoDeBombaRecomendada = item.medida;
                    break;
            }
        });
        const observa = d.observa;
        const udf = d.udf;
        const det = d.det;
        resolve({ d1, d2, d3, d4, d5, observa, udf, d5Medidas, det });
    });
}

export function exportPDf(data) {
    return new Promise(async (resolve) => {
        const dataNueva = await Datos(data);

        const nuevoUdf = dataNueva.udf.map(e => ({
            inicio: e.inicio,
            final: e.final,
            unidad: e.unidad
        }));
        const des = `FILTRO ${dataNueva.d2.tipo} ${dataNueva.d2.tamaño} ${dataNueva.d2.medida}`
        const nuevoUdf2 = dataNueva.udf.map(e => ({
            inicio: e.inicio,
            final: e.final,
            unidad: e.unidad,
            descripcion: des
        }));
        //det(d.d2, d.d3, d.udf)
        const nuevoDet2 = det(dataNueva.d2, dataNueva.d3, dataNueva.udf)
        const nuevoDet = nuevoDet2.map(e => ({
            profundidad: e.profundidad,
            descripcion: e.descrip
        }));
        const dataPlana = {
            "I.- DATOS GENERALES": {
                ...dataNueva.d1,
                fecha: Validacion.formatoDMABIEN(dataNueva.d1.fecha),
                latitud: dataNueva.d4.lat,
                longitud: dataNueva.d4.lng
            },
            "II.- DATOS TÈCNICOS": {
                ...dataNueva.d3,
                profundidadDePerforacion: dataNueva.d3.profundidadDePerforacion + " m",
                profundidadDeEntubado: dataNueva.d3.profundidadDeEntubado + " m",
                diametroDeEntubado: dataNueva.d3.diametroDeEntubado + " pulgadas",
                filtros: `${dataNueva.d2.tipo} ${dataNueva.d2.tamaño} ${dataNueva.d2.medida}`
            },
            FILTROS: nuevoUdf,
            "III.- DATOS HIDRAULICOS": dataNueva.d5Medidas,
            OBSERVACIONES: { "": dataNueva.observa },
            "EL POZO FUE ENTUBADO DE ACUERDO AL SIGUIENTE DISEÑO": nuevoDet

        };
        const verQR = {
            ver: true,
            datos: `https://maps.google.com/?q=${dataNueva.d4.lat},${dataNueva.d4.lng}`,
        };
        const verLogo = {
            ver: true,
            ruta: "/icons/img/report.png"
        };
        resolve({ dataPlana, verLogo, verQR, nuevoUdf2 });
    });
}

export function det(datosFiltros, datosTecnicos, ubicacionFiltrosLista) {
    const descrip2 = `FILTRO ${datosFiltros.tipo} ${datosTecnicos.diametroDeEntubado} PULGADAS DE DIAMETRO y ${datosFiltros.tamaño} ${datosFiltros.medida} DE ABERTURA`
    const descrip3 = `${datosTecnicos.tipoDeCañeria} ${datosTecnicos.diametroDeEntubado} PULGADAS DE DIAMETRO`
    const descrip4 = `${datosTecnicos.tipoDeCañeria} DECANTADOR DE SEDIMIENTOS`
    const resultado = [];
    const profundidad = datosTecnicos.profundidadDePerforacion
    ubicacionFiltrosLista.sort((a, b) => a.inicio - b.inicio)
    let pos = 0
    ubicacionFiltrosLista.map((e, index) => {
        if (index === 0) {
            resultado.push({ pos: pos += 1, profundidad: `+0.5 - ${e.inicio}`, descrip: descrip3 });
        }
        if (index < ubicacionFiltrosLista.length - 1) {
            const inicio = ubicacionFiltrosLista[index + 1].inicio
            resultado.push({ pos: pos += 1, profundidad: `${e.inicio} - ${e.final}`, descrip: descrip2 })
            resultado.push({ pos: pos += 1, profundidad: `${e.final} - ${inicio}`, descrip: descrip3 })
        }
        if (index === ubicacionFiltrosLista.length - 1) {
            resultado.push({ pos: pos += 1, profundidad: `${e.inicio} - ${e.final}`, descrip: descrip2 })
            resultado.push({ pos: pos += 1, profundidad: `${e.final} - ${profundidad}`, descrip: descrip4 })
        }

    })
    return resultado
}
export const compararObjetos = (original, nuevo, original2, modificado) => {
    //console.log("EL ORIGINAL QUE LLEGA ES", original2.dg.iddg);
    const resultado = {
        iddg: original2.dg.iddg,
        nuevos: [],
        modificados: [],
        eliminados: [],
        dg: [],
        dt: [],
        dh: []
    };

    // Crear un mapa de los objetos originales por su iduf
    const originalMap = new Map(original.map(item => [item.iduf, item]));

    // Crear un mapa de los nuevos objetos por su iduf (si lo tienen)
    const nuevoMap = new Map(nuevo.map(item => [item.iduf, item]));

    // Detectar elementos nuevos y modificados
    for (const item of nuevo) {
        if (!item.iduf) {
            // Es un nuevo objeto (no tiene iduf)
            resultado.nuevos.push(item);
        } else {
            const originalItem = originalMap.get(item.iduf);
            if (!originalItem) {
                // No se encuentra en los originales, es nuevo
                resultado.nuevos.push(item);
            } else {
                // Comparar atributos para detectar modificaciones
                const cambios = {};
                ['inicio', 'final', 'unidad'].forEach(attr => {
                    if (item[attr] !== originalItem[attr]) {
                        cambios[attr] = item[attr];
                    }
                });
                if (Object.keys(cambios).length > 0) {
                    resultado.modificados.push({
                        iduf: item.iduf,
                        iddg: item.iddg,
                        ...cambios
                    });
                }
            }
        }
    }

    // Detectar elementos eliminados
    for (const item of original) {
        if (!nuevoMap.has(item.iduf)) {
            resultado.eliminados.push({
                iduf: item.iduf,
                iddg: item.iddg
            });
        }
    }
    //aqui para dg,dt,dh
    // Función para comparar y agregar campos modificados
    const agregarModificados = (original, modificado, clave, resultado) => {
        for (const key in original) {
            if (key !== "iddg" && original[key] !== modificado[key]) {
                if (key !== "tipoDeCañeria") {
                    resultado.push({ [key]: modificado[key] });
                }
            }
        }
    };

    // Comparar 'dg'
    agregarModificados(original2.dg, modificado.dg, 'dg', resultado.dg);
    // Siempre añadir iddg
    if (!resultado.dg.some(obj => obj.iddg)) {
        resultado.dg.push({ iddg: original2.dg.iddg });
    }

    // Comparar 'dt'
    agregarModificados(original2.dt, modificado.dt, 'dt', resultado.dt);

    // Comparar 'dh'
    agregarModificados(original2.dh, modificado.dh, 'dh', resultado.dh);

    const dgSinIddg = resultado.dg.filter(obj => !obj.hasOwnProperty('iddg')).length === 0;

    if (dgSinIddg && resultado.dt.length === 0 && resultado.dh.length === 0 && resultado.eliminados.length === 0 && resultado.modificados.length === 0 && resultado.nuevos.length === 0) {
        return null
    }
    return resultado;
}

export function compararObjetos2(original, modificado) {
    const resultado = {
        dg: [],
        dt: [],
        dh: []
    };

    // Función para comparar y agregar campos modificados
    const agregarModificados = (original, modificado, clave, resultado) => {
        for (const key in original) {
            if (key !== "iddg" && original[key] !== modificado[key]) {
                resultado.push({ [key]: modificado[key] });
            }
        }
    };

    // Comparar 'dg'
    agregarModificados(original.dg, modificado.dg, 'dg', resultado.dg);
    // Siempre añadir iddg
    if (!resultado.dg.some(obj => obj.iddg)) {
        resultado.dg.push({ iddg: original.dg.iddg });
    }

    // Comparar 'dt'
    agregarModificados(original.dt, modificado.dt, 'dt', resultado.dt);

    // Comparar 'dh'
    agregarModificados(original.dh, modificado.dh, 'dh', resultado.dh);

    const dgSinIddg = resultado.dg.filter(obj => !obj.hasOwnProperty('iddg')).length === 0;

    if (dgSinIddg && resultado.dt.length === 0 && resultado.dh.length === 0) {
        return null; // No se encontraron cambios
    }

    return resultado;
}
/* export function exportPDf(data) {

    const dataNueva = Datos(data)

    const nuevoUdf = dataNueva.udf.map(e => ({
        inicio: e.inicio,
        final: e.final,
        unidad: e.unidad
    }))
    const nuevoUdf2 = dataNueva.udf.map(e => ({
        inicio: e.inicio,
        final: e.final,
        unidad: e.unidad,
        descripcion: e.descrip
    }))
    const nuevoDet = dataNueva.det.map(e => ({
        profundidad: e.profundidad,
        descripcion: e.descrip
    }))
    const dataPlana = {
        "I.- DATOS GENERALES": {
            ...dataNueva.d1,
            fecha: Validacion.formatoDMABIEN(dataNueva.d1.fecha),
            latitud: dataNueva.d4.lat,
            longitud: dataNueva.d4.lng
        },
        "II.- DATOS TÈCNICOS": {
            ...dataNueva.d3,
            profundidadDePerforacion: dataNueva.d3.produndidadDePerforacion + " m",
            produndidadDeEntubado: dataNueva.d3.produndidadDeEntubado + " m",
            diametroDeEntubado: dataNueva.d3.diametroDeEntubado + " pulgadas",
            filtros: `${dataNueva.d2.tipo} ${dataNueva.d2.tamaño} ${dataNueva.d2.medida}`
        },
        FILTROS: nuevoUdf,
        "III.- DATOS HIDRAULICOS": dataNueva.d5Medidas,
        OBSERVACIONES: { "": dataNueva.observa },
        "EL POZO FUE ENTUBADO DE ACUERDO AL SIGUIENTE DISEÑO": nuevoDet

    };
    const verQR = {
        ver: true,
        datos: `https://maps.google.com/?q=${dataNueva.d4.lat},${dataNueva.d4.lng}`,
    }
    const verLogo = {
        ver: true,
        ruta: "/icons/img/report.png"
    }
    return { dataPlana, verLogo, verQR, nuevoUdf2 }
} */
