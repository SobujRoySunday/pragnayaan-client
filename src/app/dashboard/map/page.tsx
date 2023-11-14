"use client"
import { getCurrentLocation } from '@/utils/getCurrentLocation';
import { mappls } from 'mappls-web-maps';
import { useEffect } from 'react';

export default function Map() {
  const styleMap = { width: '99%', height: '99vh', display: 'inline-block' }
  const loc = [0, 0]

  useEffect(() => {
    getCurrentLocation(function (error, location) {
      if (error) {
        console.error("Error getting location:", error.message);
      } else {
        console.log("Current location:", location);
        var mapplsClassObject = new mappls();



        // Marker
        mapplsClassObject.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          icon: 'https://apis.mapmyindia.com/map_v3/2.png', // icon url or Path
          width: 150, // marker's icon width
          height: 150, // marker's icon height
        })

        // Map
        mapplsClassObject.Map(
          {
            id: "map",
            key: process.env.MAP_API_KEY,
            properties:
            {
              center: [location.latitude, location.longitude],
              zoom: 15
            }
          }
        );

      }
    });
  })

  return (
    <div>
      <div id="map" style={styleMap}></div>
    </div>
  );
}