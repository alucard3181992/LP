import { addLocale } from 'primereact/api';
export const Validacion = {
    numeros: (event, campo) => {
        const pattern = /^[0-9]*$/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
            document.getElementById("mensaje").innerHTML = campo + ": Campo válido solo para números";
            document.getElementById("mensaje").style.display = 'block';
        } else {
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").style.display = 'none';
        }
    },
    letras: (event, campo) => {
        const pattern = /^[a-zA-Z]*$/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
            document.getElementById("mensaje").innerHTML = campo + ": Campo válido solo para letras";
            document.getElementById("mensaje").style.display = 'block';
        } else {
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").style.display = 'none';
        }
    },
    numerosPuntoComa: (event, campo) => {
        const pattern = /^[0-9.,\b]+$/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
            document.getElementById("mensaje").innerHTML = campo + ": Campo válido solo para números, punto y coma";
            document.getElementById("mensaje").style.display = 'block';
        } else {
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").style.display = 'none';
        }
    },
    soloCorreo: (event, campo) => {
        //const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // eslint-disable-next-line
        const pattern = /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/;
        if (!pattern.test(event.target.value)) {
            document.getElementById("mensaje").innerHTML = campo + ": Ingrese un correo valido";
            document.getElementById("mensaje").style.display = 'block';
        } else {
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").style.display = 'none';
        }
    },
    numerosYGuion: (event, campo) => {
        const pattern = /^[0-9-]*$/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
            document.getElementById("mensaje").innerHTML = campo + ": Campo válido solo para números y guiones";
            document.getElementById("mensaje").style.display = 'block';
        } else {
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").style.display = 'none';
        }
    },
    mayusculas: (event) => {
        event.target.value = event.target.value.toUpperCase();
    },

    addLocale: () => {
        addLocale('es', {
            firstDayOfWeek: 1,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Limpiar'
        });
    },
    formatoDMA(date) {
        if (date !== null) {
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear().toString().substr(-2);
            const fec = `${day}${month}${year}`;
            const fe = fec.slice(0, 4);
            return fe;
        }
    },
    formatoDMA2(date) {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const date2 = new Date(date);
        let mes = meses[date2.getMonth()];
        if (mes < 10) {
            mes = "0" + mes
        }
        let dia = date2.getDate()
        if (dia < 10) {
            dia = "0" + dia
        }
        let fe = dia + "-" + mes + "-" + date2.getFullYear();
        return fe;
    },//confirmado este funciona bien 16/09/2023
    formatoDMABIEN(date) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
        const fechaFormateada = new Date(date).toLocaleDateString('en-US', options);
        return fechaFormateada.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
    },
    formatoDMA3(date) {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const date2 = new Date(date);
        let mes = meses[date2.getMonth()];
        if (mes < 10) {
            mes = "0" + mes
        }
        let dia = date2.getDate()
        if (dia < 10) {
            dia = "0" + dia
        }
        let hora = date2.getHours()
        if (hora < 10) {
            hora = "0" + hora
        }
        let minu = date2.getMinutes()
        if (minu < 10) {
            minu = "0" + minu
        }
        let fe = dia + "-" + mes + "-" + date2.getFullYear() + "-" + hora + "-" + minu;
        return fe;
    },
    formatoAMD2(date) {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const date2 = new Date(date);
        let mes = meses[date2.getMonth()];
        if (mes < 10) {
            mes = "0" + mes
        }
        let dia = date2.getDate()
        if (dia < 10) {
            dia = "0" + dia
        }
        let fe = date2.getFullYear() + "-" + mes + "-" + dia;
        return fe;
    },
    formatoAMD(date) {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const date2 = new Date(date);
        let mes = meses[date2.getMonth()];
        let fe = date2.getFullYear() + "-" + mes + "-" + date2.getDate();
        return fe;
    },
    formatoLiteral(isoDate) {
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const date = new Date(isoDate);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let fecha = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year}`;
        return fecha.toUpperCase();
    },
    formatoLiteralMes2(isoDate) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const date = new Date(isoDate);
        const month = months[date.getMonth()];
        let fecha = `${month}`;
        return fecha.toUpperCase();
    },
    formatoLiteralMes(mes) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const month = months[mes];
        let fecha = `${month}`;
        return fecha.toUpperCase();
    },
    formatoLiteralMesAño(isoDate) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const date = new Date(isoDate);
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let fecha = `${month} de ${year}`;
        return fecha.toUpperCase();
    },
    formatoLiteralHora(isoDate) {
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const date = new Date(isoDate);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let fecha = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year} Hora: ${date.getHours()}:${date.getMinutes()}`;
        return fecha.toUpperCase();
    },
    formatoHoraBD(isoDate) {
        const options = { hour12: false, timeZone: 'UTC' };
        const horaActual = new Date(isoDate).toLocaleTimeString('en-US', options);
        return horaActual === '24:00:00' ? '00:00:00' : horaActual;
    },
    formatoHora(isoDate) {
        const date = new Date(isoDate);
        let hora = date.getHours()
        if (hora < 10) {
            hora = "0" + hora
        }
        let minu = date.getMinutes()
        if (minu < 10) {
            minu = "0" + minu
        }
        let seg = date.getSeconds()
        if (seg < 10) {
            seg = "0" + seg
        }
        const horaActual = `${hora}:${minu}:${seg}`;
        return horaActual;
    },
    pasarBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        var base64 = window.btoa(binary)
        var datos = "data:image/png;base64," + base64;
        return datos;
    },
    fechaLiteralBien(date) {
        const fecha = new Date(date);

        const diasSemana = [
            'DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'
        ];

        const meses = [
            'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
            'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
        ];

        const diaSemana = diasSemana[fecha.getUTCDay()];
        const dia = fecha.getUTCDate();
        const mes = meses[fecha.getUTCMonth()];
        const anio = fecha.getUTCFullYear();
        const hora1 = fecha.getUTCHours();
        const minutos = fecha.getUTCMinutes();
        let hora = hora1
        if (hora < 10) {
            hora = "0" + hora
        }
        let minu = minutos
        if (minu < 10) {
            minu = "0" + minu
        }
        let seg = fecha.getUTCSeconds()
        if (seg < 10) {
            seg = "0" + seg
        }
        const fechaFormateada = `${diaSemana} ${dia} DE ${mes} DE ${anio} HORA: ${hora}:${minu}:${seg}`;
        return fechaFormateada;
    },
    fechaNormalBien() {
        const date = new Date();
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const year = date.getFullYear();
        let mes = meses[date.getMonth()];
        if (mes < 10) {
            mes = "0" + mes
        }
        let dia = date.getDate()
        if (dia < 10) {
            dia = "0" + dia
        }
        let hora = date.getHours()
        if (hora < 10) {
            hora = "0" + hora
        }
        let minu = date.getMinutes()
        if (minu < 10) {
            minu = "0" + minu
        }
        let seg = date.getSeconds()
        if (seg < 10) {
            seg = "0" + seg
        }
        const fecha = `${year}-${mes}-${dia}T${hora}:${minu}:${seg}Z`;
        //`2023-09-18T00:00:00Z`
        return fecha;
    },
    fechaNormalBien2(fechaStr) {
        const fecha = new Date(fechaStr);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const horasUTC = fecha.getUTCHours();
        const minutosUTC = fecha.getUTCMinutes();
        const segundosUTC = fecha.getUTCSeconds();

        const fechaLocal = new Date(año, fecha.getMonth(), dia, horasUTC, minutosUTC, segundosUTC);
        const horasLocal = String(fechaLocal.getHours()).padStart(2, '0');
        const minutosLocal = String(fechaLocal.getMinutes()).padStart(2, '0');
        const segundosLocal = String(fechaLocal.getSeconds()).padStart(2, '0');

        return `${año}-${mes}-${dia}T${horasLocal}:${minutosLocal}:${segundosLocal}Z`;

    },
    formatoReloj(date) {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const date2 = new Date(date);
        let mes = meses[date2.getMonth()];
        if (mes < 10) {
            mes = "0" + mes
        }
        let dia = date2.getDate()
        if (dia < 10) {
            dia = "0" + dia
        }
        let fe = dia + "/" + mes + "/" + date2.getFullYear();
        return fe;
    },
    generarCadenaSombra(numPasos, color) {
        const resultado = Array.from({ length: numPasos }, (_, index) => {
            const offsetPos = (index + 1) * 5;
            const offsetNeg = (index + 1) * -5;
            return `${color} ${offsetNeg}px ${offsetPos}px`;
        }).join(',');

        return resultado;
    }

};

export function addFooterAndTitle(doc, pages, title, imageFilePath, bannerHeight, titulo) {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(10);

    for (let j = 1; j < pages + 1; j++) {
        let horizontalPos = pageWidth / 2;
        let verticalPos = pageHeight - 10;
        doc.setPage(j);
        doc.text(`Página ${j} de ${pages}`, horizontalPos, verticalPos, {
            align: 'center'
        });
    }

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255);
    if (titulo) {
        for (let j = 1; j < pages + 1; j++) {
            let horizontalPos = pageWidth / 2;
            doc.setPage(j);
            doc.text(title, horizontalPos, 45, {
                align: 'center'
            });
            doc.addImage(imageFilePath, "JPG", 0, 0, doc.internal.pageSize.width, bannerHeight, null, "SLOW", 0);
        }
    }

}