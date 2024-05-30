'use client';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import {
  Circle,
  CircleMarker,
  Polygon,
  Polyline,
  Popup,
  Rectangle
} from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export default function MapPage() {
  const position: LatLngExpression = [51.505, -0.09];

  const polyline: LatLngExpression[] = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12]
  ];

  const multiPolyline: LatLngExpression[][] = [
    [
      [51.5, -0.1],
      [51.5, -0.12],
      [51.52, -0.12]
    ],
    [
      [51.5, -0.05],
      [51.5, -0.06],
      [51.52, -0.06]
    ]
  ];

  const polygon: LatLngExpression[] = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12]
  ];

  const multiPolygon: LatLngExpression[][] = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13]
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07]
    ]
  ];

  const rectangle: LatLngBoundsExpression = [
    [51.49, -0.08],
    [51.5, -0.06]
  ];

  const fillBlueOptions = { fillColor: 'blue' };
  const blackOptions = { color: 'black' };
  const limeOptions = { color: 'lime' };
  const purpleOptions = { color: 'purple' };
  const redOptions = { color: 'red' };

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={position} pathOptions={fillBlueOptions} radius={200} />
      <CircleMarker
        center={[51.51, -0.12]}
        pathOptions={redOptions}
        radius={20}
      >
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <Polyline pathOptions={limeOptions} positions={polyline} />
      <Polyline pathOptions={limeOptions} positions={multiPolyline} />
      <Polygon pathOptions={purpleOptions} positions={polygon} />
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />
    </MapContainer>
  );
}
