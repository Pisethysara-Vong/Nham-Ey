import { IoIosArrowBack } from 'react-icons/io'
import ImageCarousel from '@/components/ImageCarousel'
import CardTitle from '@/components/CardTitle'
import { useEffect, useState } from 'react';
import usePlaces from '@/hooks/usePlace';

export const PlaceDetailsCard = ({
  placeId,
  onClose,
}: {
  placeId: string;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const { fetchPlaceDetails } = usePlaces();

  useEffect(() => {
    setLoading(true);
    fetchPlaceDetails(placeId)
      .then((details) => {
        setPlaceDetails(details);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [placeId, fetchPlaceDetails]);

  return (
    <>
      <button
        onClick={onClose}
        aria-label="Close panel"
        className="absolute top-1/2 right-[-1.2rem] -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 z-20 cursor-pointer"
      >
        <IoIosArrowBack size={20} />
      </button>

      <div className="relative bg-white w-full h-full overflow-y-auto scrollbar-hide shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]">
        {loading ? (
          <div className="p-4 text-center">Loading place details...</div>
        ) : (
          <>
            {/* For now, just display JSON for debugging */}
            <pre className="p-4">{JSON.stringify(placeDetails, null, 2)}</pre>
            {/* You can replace below with real UI components later */}
            {/* <ImageCarousel />
            <CardTitle /> */}
          </>
        )}
      </div>
    </>
  );
};



