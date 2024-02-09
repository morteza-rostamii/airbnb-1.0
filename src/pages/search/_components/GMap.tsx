
import React, { useEffect, useState } from 'react'

// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useRouter } from 'next/router'

export default function GMap(props: any) {
  const { zoom } = props
  
  // auto: name to geoCode -------------
  const [position, setPosition] = useState<any>([35.6892, 51.3890]);
  const router = useRouter();
  const {location} = router.query;

  const goToLocation = async (query:any) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([lat, lon]);
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error geocoding:', error);
    }
  }

  useEffect(() => {
    if (location && (location as any).trim() !== '') {
      goToLocation(location);
    }
  }, [location]);

  return (
    <MapContainer 
    // re render map if position changes
    key={position.join(',')}
    center={position} 
    zoom={zoom} 
    scrollWheelZoom={true}
    style={{height: "100%", width: "100%"}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
      position={position}
      draggable={true}
      //animate={true}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}