'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLngLiteral } from '@/types/place';
import usePlaces from '@/hooks/usePlace';
import { AnimatePresence, motion } from "framer-motion";
import { PlaceDetailsCard } from '@/components/PlaceDetailsCard';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
// const InputForm = dynamic(() => import('@/components/InputForm'), { ssr: false });
// const ShowInputFormButton = dynamic(() => import('@/components/ShowInputFormButton'), { ssr: false });
// const BackToLocationButton = dynamic(() => import('@/components/BackToLocationButton'), { ssr: false });

export default function HomePage() {
  const [userPosition, setUserPosition] = useState<LatLngLiteral | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [shouldFollowUser, setShouldFollowUser] = useState(true);
  // const [showInputForm, setShowInputForm] = useState(true);

  const { fetchPlaces } = usePlaces();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        console.log("Got position:", coords);
        setUserPosition(coords);

        // ✅ Fetch places immediately after position is available
        const results = await fetchPlaces({
          lat: coords.lat,
          lng: coords.lng,
          type: "cafe",
          radius: 1000,
        });

        console.log("Fetched places:", results);
        setPlaces(results);
      },
      (err) => {
        console.error("Geolocation failed:", err);
        const fallback = { lat: 11.556326, lng: 104.9264433 };
        setUserPosition(fallback);
      }
    );
  }, []);

  // const handleSearch = async (options: { type: string; radius: number; price_level?: number }) => {
  //   if (!userPosition) return;
  //   const results = await fetchPlaces({ ...userPosition, ...options });
  //   setPlaces(results);
  //   setShowInputForm(false);
  // };

  // if (!userPosition) return <p className="text-center p-8">Getting your location...</p>;

  if (!userPosition) {
    return <p className="text-center p-8">Getting your location...</p>;
  }

  return (
    <main className="relative h-screen w-full">
      {userPosition && (
        <Map
          center={userPosition}
          userPosition={userPosition}
          places={places}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          shouldFollowUser={shouldFollowUser}
          setShouldFollowUser={setShouldFollowUser}
        />
      )}


      {/* <BackToLocationButton onClick={() => setShouldFollowUser(true)} />
      <ShowInputFormButton onClick={() => setShowInputForm(true)} />

      {showInputForm && (
        <InputForm onSubmit={handleSearch} onClose={() => setShowInputForm(false)} />
      )} */}
       
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            key="place-details"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 z-[1000] flex w-48 md:w-1/4 h-full"
          >
            <PlaceDetailsCard
              placeId={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
