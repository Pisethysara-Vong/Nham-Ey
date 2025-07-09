import { IoIosArrowBack } from 'react-icons/io'
import ImageCarousel from '@/components/ImageCarousel'
import CardTitle from '@/components/CardTitle'

export const PlaceDetailsCard = ({
  place,
  onClose,
}: {
  place: string;
  onClose: () => void;
}) => {
  return (
    <>
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close panel"
        className="absolute top-1/2 right-[-1.2rem] -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 z-20"
      >
        <IoIosArrowBack size={20} />
      </button>

      {/* Scrollable Container */}
      <div className="relative bg-white w-full h-full overflow-y-auto scrollbar-hide shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]">
        <ImageCarousel />
        <CardTitle />
      </div>
    </>
  );
};


