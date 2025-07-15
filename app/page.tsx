"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LatLngLiteral } from "@/types/place";
import usePlaces from "@/hooks/usePlace";
import { AnimatePresence, motion } from "framer-motion";
import { PlaceDetailsCard } from "@/components/PlaceDetailsCard";
import ShowInputFormButton from "@/components/ShowInputFormBtn";
import Snackbar from "@/utils/Snackbar";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const InputForm = dynamic(() => import("@/components/InputForm"), {
  ssr: false,
});
// const ShowInputFormButton = dynamic(() => import('@/components/ShowInputFormButton'), { ssr: false });
const BackToLocationButton = dynamic(
  () => import("@/components/UserLocationBtn"),
  { ssr: false }
);

export default function HomePage() {
  const [userPosition, setUserPosition] = useState<LatLngLiteral | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [shouldFollowUser, setShouldFollowUser] = useState(true);
  const [showInputForm, setShowInputForm] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

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
      },
      (err) => {
        console.error("Geolocation failed:", err);
        const fallback = { lat: 11.556326, lng: 104.9264433 };
        setUserPosition(fallback);
      }
    );
  }, []);

  const handleSearch = async ({
    type,
    radius,
    price_level,
    keyword,
    fetch_all,
  }: {
    type: string;
    radius: number;
    price_level?: number;
    keyword?: string;
    fetch_all?: boolean;
  }) => {
    if (!userPosition) return;
    setIsLoading(true);
    const results = await fetchPlaces({
      lat: userPosition.lat,
      lng: userPosition.lng,
      type: type,
      radius: radius,
      price_level: price_level,
      keyword: keyword,
      fetch_all: fetch_all,
    });
    setPlaces(results);
    setShowInputForm(false);
    setIsLoading(false);

    if (results.length === 0) {
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 3000);
    }
    console.log("results:", results);
    // console.log("working")
  };

  // if (!userPosition) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

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
          userInteracted={userInteracted}
          setUserInteracted={setUserInteracted}
        />
      )}

      <BackToLocationButton
        onClick={() => {
          setShouldFollowUser(true);
          setUserInteracted(false);
        }}
      />
      <ShowInputFormButton onClick={() => setShowInputForm(true)} />
      {/* <ShowInputFormButton onClick={() => {console.log("Show input form clicked");}} /> */}

      {showInputForm && (
        <>
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <InputForm
            onSubmit={handleSearch}
            onClose={() => setShowInputForm(false)}
            setIsLoading={setIsLoading}
          />
        </>
      )}

      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            key="place-details"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 z-[1000] flex w-48 md:w-1/4 h-full"
          >
            <PlaceDetailsCard
              placeId={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Snackbar
        visible={snackbarVisible}
        message="No places found for your search. Try different filters"
      />
    </main>
  );
}
