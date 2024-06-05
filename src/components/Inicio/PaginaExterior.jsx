import React from "react";
import Link from 'next/link';
import { Bienvenida } from "./PaginaInicio";
import Login from "../Login/Login";
import LoginVista from "@/pages/IngresoSistema/Ingreso";

const VistaExterior = () => {

    return (<React.Fragment>
        <div className="top">
            <Link href={"/IngresoSistema/Ingreso"} className='menus' style={{ position: 'absolute', marginRight: 10, right: 0}} >
                <i className='pi pi-fw pi-home' />
                <span >Ingresar al sistema</span>
            </Link>
        </div>
        <div className="">
            {Bienvenida()}
        </div>
        {/* <LoginVista /> */}
        {/* <Login /> */}
    </React.Fragment>)
}
export default VistaExterior