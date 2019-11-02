import React from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin';
 
export default function MapCity(props) {
  const { citiesInTrip, city } = props;

  if (city && citiesInTrip) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, language: 'en' }}
          defaultCenter={{lat: city[0].coordinate_latitude, lng: city[0].coordinate_longitude }}
          defaultZoom={city[0].zoom}
        >
          <Pin
            lat={city[0].coordinate_latitude}
            lng={city[0].coordinate_longitude}
          />
          {citiesInTrip.map(city =>
          <Pin
            key={city.id}
            lat={city.coordinate_latitude}
            lng={city.coordinate_longitude}
          />
          )}
        </GoogleMapReact>
      </div>
    )
    } else {
    return (
      null
    )
  }
}