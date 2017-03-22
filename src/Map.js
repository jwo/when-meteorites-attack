import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import 'whatwg-fetch';

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 25.363882, lng: -95 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={marker.id}
        icon="meteorite.png"
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export default Map;
