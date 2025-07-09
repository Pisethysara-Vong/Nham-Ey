import { useRef, useState } from "react";
import Image from "next/image";
import image1 from "@/public/photo_2023-06-18_01-35-24.jpg";
import image2 from "@/public/photo_2023-06-18_01-35-17.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const images = [image1, image2];

// ✅ Motion variants that accept custom direction
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prev) => {
      const nextIndex =
        (prev + newDirection + images.length) % images.length;
      return nextIndex;
    });
  };

  return (
    <div className="w-full min-h-64 max-h-64 relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentImageIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            fill
            className="object-cover pointer-events-none select-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Left arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1"
      >
        <IoIosArrowBack size={20} />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default ImageCarousel;
