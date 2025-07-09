'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { LatLngLiteral } from '@/types/place';
// import usePlaces from '@/hooks/usePlaces';
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { PlaceDetailsCard } from '@/components/PlaceDetailsCard';

// const Map = dynamic(() => import('@/components/Map'), { ssr: false });
// const InputForm = dynamic(() => import('@/components/InputForm'), { ssr: false });
// const ShowInputFormButton = dynamic(() => import('@/components/ShowInputFormButton'), { ssr: false });
// const BackToLocationButton = dynamic(() => import('@/components/BackToLocationButton'), { ssr: false });

export default function HomePage() {
  // const [userPosition, setUserPosition] = useState<LatLngLiteral | null>(null);
  // const [places, setPlaces] = useState<any[]>([]);
  // const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  // const [shouldFollowUser, setShouldFollowUser] = useState(false);
  // const [showInputForm, setShowInputForm] = useState(true);

  // const { fetchPlaces } = usePlaces();

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const coords = {
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //       };
  //       setUserPosition(coords);
  //     },
  //     (err) => {
  //       console.error('Geolocation failed:', err);
  //       const fallback = { lat: 11.5564, lng: 104.9282 };
  //       setUserPosition(fallback);
  //     }
  //   );
  // }, []);

  // const handleSearch = async (options: { type: string; radius: number; price_level?: number }) => {
  //   if (!userPosition) return;
  //   const results = await fetchPlaces({ ...userPosition, ...options });
  //   setPlaces(results);
  //   setShowInputForm(false);
  // };

  // if (!userPosition) return <p className="text-center p-8">Getting your location...</p>;

  return (
    <main className="relative h-screen w-full">
      {/* <Map
        center={userPosition}
        userPosition={userPosition}
        places={places}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        shouldFollowUser={shouldFollowUser}
        setShouldFollowUser={setShouldFollowUser}
      />

      <BackToLocationButton onClick={() => setShouldFollowUser(true)} />
      <ShowInputFormButton onClick={() => setShowInputForm(true)} />

      {showInputForm && (
        <InputForm onSubmit={handleSearch} onClose={() => setShowInputForm(false)} />
      )}

      {selectedPlace && (
        <PlaceDetailsCard
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onGetDirections={() => setShouldFollowUser(true)}
        />
      )} */}
      <PlaceDetailsCard />
    </main>
  );
}
