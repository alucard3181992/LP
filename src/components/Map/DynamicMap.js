import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-fullscreen/styles.css';
import QRCode from 'qrcode.react';
import { FullscreenControl } from 'react-leaflet-fullscreen';

const { MapContainer,
  useMapEvents,
  Marker,
  Popup,
} = ReactLeaflet;

function LocationMarker({ Coordenadas }) {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    position !== null ? Coordenadas(position) : '';
  }, [Coordenadas, position]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{"lat:" + position.lat} <br /> {"lng:" + position.lng}</Popup>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
        <QRCode value={"https://maps.google.com/?q=" + position.lat + "," + position.lng} />
      </div>
    </Marker>
  )
}



const Map = ({ children, className, width, height, Coordenadas, Localizar, ...rest }) => {
  let mapClassName = { width: '100 %', height: 200 };

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }
  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/icons/marker-icon-2x.png',
        iconUrl: '/icons/marker-icon.png',
        shadowUrl: '/icons/marker-shadow.png',
      });
    })();
  }, []);
  
  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      {Localizar === "SI" ? <LocationMarker Coordenadas={Coordenadas} /> : ''}
      <FullscreenControl />
    </MapContainer>
  )
}

export default Map;

