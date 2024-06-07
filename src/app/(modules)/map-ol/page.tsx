'use client';

import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';

export default function MapWithOlPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef(new VectorSource());

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          new VectorLayer({
            source: vectorSourceRef.current
          })
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2
        })
      });

      mapInstanceRef.current = map;
    }
  }, []);

  const addMarker = (coordinate: [number, number]) => {
    const marker = new Feature({
      geometry: new Point(coordinate)
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
      })
    );

    vectorSourceRef.current.clear(); // Clear previous markers
    vectorSourceRef.current.addFeature(marker);
  };

  const searchLocation = async (query: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const view = mapInstanceRef.current!.getView();
        const coordinate = fromLonLat([parseFloat(lon), parseFloat(lat)]);

        addMarker(coordinate); // Add marker at the new location

        view.animate({
          center: coordinate,
          zoom: 14,
          duration: 2000 // 2 seconds
        });
      }
    } catch (error) {
      console.error('Error fetching location data', error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    searchLocation(query);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Enter zip code or address"
          required
          className="px-4 py-4 w-2/6 text-gray-700 bg-white border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        />
        <button
          className="px-4 py-4 text-white bg-indigo-600 border border-transparent rounded-tr-md rounded-br-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Search
        </button>
      </form>
      <div
        className="mt-4"
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </>
  );
}
