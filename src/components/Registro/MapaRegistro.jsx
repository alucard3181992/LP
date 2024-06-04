import React, { useState, useEffect, useRef } from 'react';
import Map from "../Map"
import QRCode from "qrcode.react"
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';

const VistaMapaRegistro = (props) => {
    const lat = props.props.latitud,
        long = props.props.longitud,
        nombre = props.props.nombre,
        ubicacion = props.props.ubicacion,
        departamento = props.props.departamento

    return (<React.Fragment>

        <Map style={{ height: "400px" }} center={[lat, long]} zoom={15} Localizar={"NO"}>
            {({ TileLayer, Marker, Popup }) => (
                <>
                    <TileLayer
                        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[lat, long]}>
                        <Popup>
                            {"BIENVENIDO"}<br /><a href={"https://maps.google.com/?q=" + lat + "," + long}>IR</a>
                        </Popup>
                        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                            <QRCode value={"https://maps.google.com/?q=" + lat + "," + long} />
                        </div>
                        <div className="color-fondo w-full" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 999 }}>
                            <div className="grid" style={{ marginBottom: 10 }}>
                                <div className="col-6 md:col-4 lg:col-4" >
                                    <div>{ubicacion}</div>
                                    <div>{departamento}</div>
                                </div>
                                <div className="col-6 md:col-4 lg:col-4" >
                                    <div>{nombre}</div>
                                    <div>sdhjsadhk@gmail.com</div>
                                </div>
                                <div className="col-6 md:col-4 lg:col-4" >
                                    <div>NUMERO DE TELEFONO</div>
                                    <div>+591- 7555-55 5 </div>
                                </div>
                            </div>

                        </div>
                    </Marker>
                </>
            )}
        </Map>
    </React.Fragment>)
}
export default VistaMapaRegistro

export function VistaMapaLocalizar({ Coordenadas }) {
    useEffect(() => {
        //console.log(registros);
    }, [])

    return (<React.Fragment>

        <Map style={{ height: "400px" }} Coordenadas={Coordenadas} center={[-21.529647364461, -64.7255585849643]} zoom={15} Localizar={"SI"}>
            {({ TileLayer }) => (
                <>
                    <TileLayer
                        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </>
            )}
        </Map>

    </React.Fragment>)
}

export function VistaMapaNoLocalizar({ vista, Coordenadas }) {
    useEffect(() => {
        //console.log(registros);
    }, [])

    return (<React.Fragment>
        <Map style={{ height: "400px" }} Coordenadas={Coordenadas} center={[vista.ubicacion.lat, vista.ubicacion.lng]} zoom={15} Localizar={"SI"}>
            {({ TileLayer, Marker }) => (
                <>
                    <TileLayer
                        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker
                        position={[vista.ubicacion.lat, vista.ubicacion.lng]}
                    >
                        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                            <QRCode value={`https://maps.google.com/?q=${vista.ubicacion.lat},${vista.ubicacion.lng}`} />
                        </div>
                    </Marker>
                </>
            )}
        </Map>
    </React.Fragment>)
}

export function VistaMapaRegistroGeneral({ lista }) {

    const router = useRouter();
    function registroOCF(codigo) {
        router.push({
            pathname: "/Registro/Registro", // Cambia esto a la ruta correcta
            query: { registroOC: codigo },
        });
    }
    return (<React.Fragment>
        <div className={'text-center'}>
            <div className="font-bold mb-3 text-2xl"><i className="pi pi-prime"></i>&nbsp;LUZAM S.R.L</div>
        </div>
        <Map style={{ height: "600px" }} center={[-21.529647364461, -64.7255585849643]} zoom={15} Localizar={"NO"}>
            {({ TileLayer, Marker, Popup }) => (
                <>
                    <TileLayer
                        style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {lista.map(({ lat, longi, nombre, dp, pv, perforador, iddg }) => (
                        <Marker
                            key={iddg}
                            position={[lat, longi]}
                        >
                            <Popup>
                                <center>
                                    <a href={`https://maps.google.com/?q=${lat},${longi}`}>MAPA</a>
                                    <div>{`Nombre: ${nombre}`}</div>
                                    <div>{`Ubicación: ${dp}, ${pv}`}</div>
                                    <div>{`Perforador: ${perforador}`}</div>
                                </center>
                                <center>
                                    <QRCode value={`https://maps.google.com/?q=${lat},${longi}`} />
                                </center>
                                <center>
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            registroOCF(iddg)
                                        }}
                                        label='Ir al Registro'
                                        text />
                                </center>
                            </Popup>
                        </Marker>
                    ))}
                </>
            )}
        </Map>
    </React.Fragment>)
}




