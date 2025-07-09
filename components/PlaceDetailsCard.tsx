import { useEffect, useState } from 'react'
import Image from 'next/image'
import image1 from '@/public/photo_2023-06-18_01-35-24.jpg'
import image2 from '@/public/photo_2023-06-18_01-35-17.jpg'
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import ImageCarousel from './ImageCarousel'

export const PlaceDetailsCard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const images = [image1, image2];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 200); // match the animation duration
        return () => clearTimeout(timer);
        } else {
        setShowButton(false); // hide instantly when closing
        }
    }, [isOpen]);

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
    <div className="fixed top-0 left-0 bottom-0 z-[1000] flex w-48 md:w-1/4 h-full">
        {isOpen && showButton && (
            <button
                onClick={() => setIsOpen(false)}
                aria-label="Close panel"
                className="absolute top-1/2 right-[-1.2rem] -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 z-20"
            >
                <IoIosArrowBack size={20} />
            </button>
        )}

        <AnimatePresence>
            {isOpen && (
                <motion.div
                key="panel"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", stiffness: 300, damping: 30 }}
                className="relative bg-white w-full h-full shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]"
                >
                    {/* <div className='w-full min-h-64 max-h-64 relative overflow-hidden'>
                        <AnimatePresence mode="wait">
                            <motion.div
                            key={currentImageIndex}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full h-full"
                            >
                            <Image
                                src={images[currentImageIndex]}
                                alt="Place Image"
                                fill
                                className="object-cover pointer-events-none select-none"
                            />
                            </motion.div>
                        </AnimatePresence>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1"
                        >
                            <IoIosArrowBack size={20} />
                        </button>
                        
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1"
                        >
                            <IoIosArrowForward size={20} />
                        </button>
                        
                    </div> */}
                    <ImageCarousel/>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
    );
}
