"use client";

import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { LatLngLiteral } from "@/types/place";

type MapProps = {
  center: LatLngLiteral;
  userPosition: LatLngLiteral;
  places: any[]; // You can replace `any` with a proper PlaceResult type
  selectedPlace: any | null;
  setSelectedPlace: (place: any | null) => void;
  shouldFollowUser: boolean;
  setShouldFollowUser: (value: boolean) => void;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  center,
  userPosition,
  places,
  selectedPlace,
  setSelectedPlace,
  shouldFollowUser,
  setShouldFollowUser,
}: MapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const selectedLatLng = selectedPlace?.geometry?.location;
  const showPolyline = selectedLatLng && shouldFollowUser;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
  });

  // Pan to user only if user hasn't manually moved map
  useEffect(() => {
    if (isLoaded && !userInteracted && shouldFollowUser && mapRef.current) {
      mapRef.current.panTo(userPosition);
      setShouldFollowUser(false); // Stop following user after initial pan
    }
  }, [isLoaded, userPosition, shouldFollowUser, userInteracted]);

  // When selectedPlace changes (user clicked a marker), reset userInteracted to false so it pans again
  useEffect(() => {
    if (isLoaded && selectedPlace && mapRef.current) {
      const place = places.find((p) => p.place_id === selectedPlace);
      if (place) {
        const { lat, lng } = place.geometry.location;
        mapRef.current.panTo({ lat, lng });
      }
    }
  }, [isLoaded, selectedPlace, places]);

  if (!isLoaded) return <p className="text-center p-8">Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      onClick={() => setSelectedPlace(null)}
      onDragStart={() => setUserInteracted(true)} // User started manual interaction
      onZoomChanged={() => setUserInteracted(true)} // User zoomed manually
    >
      {/* User marker */}
      <Marker
        position={userPosition}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "white",
        }}
      />

      {/* Place markers */}
      {places.map((place, idx) => (
        <Marker
          key={idx}
          position={{
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          }}
          onClick={() => setSelectedPlace(place.place_id)}
        />
      ))}

      {showPolyline && (
        <Polyline
          path={[
            userPosition,
            { lat: selectedLatLng.lat, lng: selectedLatLng.lng },
          ]}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
