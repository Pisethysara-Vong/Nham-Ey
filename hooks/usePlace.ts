import { useCallback } from "react";

const usePlaces = () => {
  const fetchPlaces = useCallback(
    async (params: {
      lat: number;
      lng: number;
      type: string;
      radius: number;
      price_level?: number;
      keyword?: string;
      fetch_all?: boolean;
    }) => {
      const query = new URLSearchParams(params as any).toString();
      const res = await fetch(`/api/places?${query}`);
      return res.json();
    },
    []
  );

  const fetchPlaceDetails = useCallback(async (placeId: string) => {
    const res = await fetch(`/api/places/details?placeId=${placeId}`);
    return res.json();
  }, []);

  return { fetchPlaces, fetchPlaceDetails };
};

export default usePlaces;
