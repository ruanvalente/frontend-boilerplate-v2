'use client';

import { useState, useRef } from 'react';
import {
  LatLngExpression,
  LatLngTuple,
  Map,
  Marker as LMarker,
  divIcon
} from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker,
  useMapEvents,
  useMap
} from 'react-leaflet';
import { InputText } from 'primereact/inputtext';

import { BiMapPin } from 'react-icons/bi';
import ReactDOMServer from 'react-dom/server';

export default function MapDropPage() {
  const initialPosition: LatLngExpression = [-22.9426727, -43.2489744];
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const mapRef = useRef<Map | null>(null);

  const tijuca: LatLngExpression[] = [
    [-22.912205, -43.239071],
    [-22.914201, -43.231708],
    [-22.917158, -43.2266],
    [-22.923415, -43.224248],
    [-22.930164, -43.229484],
    [-22.935512, -43.234917],
    [-22.93889, -43.243267],
    [-22.935574, -43.248001],
    [-22.930202, -43.247578],
    [-22.924987, -43.244911],
    [-22.918611, -43.24374],
    [-22.914963, -43.24387],
    [-22.912205, -43.239071]
  ];

  const copacabana: LatLngExpression[] = [
    [-22.971177, -43.187759],
    [-22.969814, -43.17954],
    [-22.972843, -43.177695],
    [-22.977105, -43.179245],
    [-22.979067, -43.182568],
    [-22.980631, -43.186031],
    [-22.981689, -43.189323],
    [-22.978601, -43.191693],
    [-22.975694, -43.190509],
    [-22.973081, -43.188923],
    [-22.971177, -43.187759]
  ];

  const ipanema: LatLngExpression[] = [
    [-22.985683, -43.198959],
    [-22.986752, -43.191429],
    [-22.989276, -43.188416],
    [-22.992143, -43.1882],
    [-22.994504, -43.191238],
    [-22.995574, -43.194813],
    [-22.994255, -43.198111],
    [-22.991672, -43.200619],
    [-22.988878, -43.200314],
    [-22.985683, -43.198959]
  ];

  function getPolygonCenter(polygon: LatLngExpression[]): LatLngTuple {
    let latSum = 0;
    let lngSum = 0;
    const len = polygon.length;

    polygon.forEach((point: any) => {
      latSum += point[0];
      lngSum += point[1];
    });

    return [latSum / len, lngSum / len];
  }

  const tijucaOptions = { color: 'blue' };
  const copacabanaOptions = { color: 'green' };
  const ipanemaOptions = { color: 'purple' };

  const tijucaCenter = getPolygonCenter(tijuca);
  const copacabanaCenter = getPolygonCenter(copacabana);
  const ipanemaCenter = getPolygonCenter(ipanema);

  const svgString = ReactDOMServer.renderToStaticMarkup(
    <BiMapPin size={24} className="text-slate-800" />
  );

  const svgIcon = divIcon({
    html: svgString,
    className: '',
    iconSize: [24, 24]
  });

  const handleBoxDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('text/plain', '');
  };

  const handleBoxDragEnd = (event: React.DragEvent) => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const mapElement = map.getContainer();
    const mapRect = mapElement.getBoundingClientRect();
    const mapX = event.clientX - mapRect.left;
    const mapY = event.clientY - mapRect.top;

    const latLng = map.containerPointToLatLng([mapX, mapY]);
    setMarkers((prevMarkers) => [...prevMarkers, [latLng.lat, latLng.lng]]);
  };

  function MapWrapper({ children }: { children: React.ReactNode }) {
    const map = useMap();
    mapRef.current = map;
    return <>{children}</>;
  }

  return (
    <>
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
        className="z-0 w-full"
      >
        <MapWrapper>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon pathOptions={tijucaOptions} positions={tijuca}>
            <Popup>Tijuca</Popup>
          </Polygon>
          <Marker position={tijucaCenter} icon={svgIcon}>
            <Popup>Centro da Tijuca</Popup>
          </Marker>
          <Polygon pathOptions={copacabanaOptions} positions={copacabana}>
            <Popup>Copacabana</Popup>
          </Polygon>
          <Marker position={copacabanaCenter} icon={svgIcon}>
            <Popup>Centro de Copacabana</Popup>
          </Marker>
          <Polygon pathOptions={ipanemaOptions} positions={ipanema}>
            <Popup>Ipanema</Popup>
          </Polygon>
          <Marker position={ipanemaCenter} icon={svgIcon}>
            <Popup>Centro de Ipanema</Popup>
          </Marker>
          {markers.map((position, idx) => (
            <Marker key={idx} position={position} icon={svgIcon}>
              <Popup>
                Latitude: {position[0]}, Longitude: {position[1]}
              </Popup>
            </Marker>
          ))}
        </MapWrapper>
      </MapContainer>
      <div className="absolute top-6 right-6 z-10 bg-white p-4 flex items-center justify-center w-32 h-32">
        <div
          draggable={true}
          onDragStart={handleBoxDragStart}
          onDragEnd={handleBoxDragEnd}
          style={{ cursor: 'move', width: '24px', height: '24px' }}
        >
          <BiMapPin size={24} />
        </div>
      </div>
      <div className="absolute top-6 left-6 z-10">
        <InputText
          className="relative w-80"
          placeholder="Latitude"
          value={
            markers.length ? markers[markers.length - 1][0].toString() : ''
          }
          readOnly
        />
        <InputText
          className="relative w-80"
          placeholder="Longitude"
          value={
            markers.length ? markers[markers.length - 1][1].toString() : ''
          }
          readOnly
        />
      </div>
    </>
  );
}
