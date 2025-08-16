import React, { useEffect, useState, useRef } from 'react'
import { MoveLeft, MoveRight } from 'lucide-react';

const OnYourMind = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const containerRef = useRef(null);

  // Calculate items per view based on screen size
  useEffect(() => {
    const calculateItemsPerView = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 128; // w-32 = 128px
        const calculatedItemsPerView = Math.floor(containerWidth / itemWidth);
        setItemsPerView(Math.max(1, calculatedItemsPerView)); // Ensure at least 1 item is visible
      }
    };

    // Initial calculation
    calculateItemsPerView();

    // Recalculate on window resize
    window.addEventListener('resize', calculateItemsPerView);

    return () => window.removeEventListener('resize', calculateItemsPerView);
  }, []);

  // Reset current index when data changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [data.length]);

  const maxIndex = Math.max(0, data.length - itemsPerView);

  function handleNext() {
    setCurrentIndex((prev) => Math.min(prev + itemsPerView, maxIndex));
  }

  function handlePrev() {
    setCurrentIndex((prev) => Math.max(prev - itemsPerView, 0));
  }

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl ml-4'>What's on your mind?</h1>
        <div className='flex items-center gap-1'>
          <div
            onClick={handlePrev}
            className={
              `rounded-full p-2 cursor-pointer ` +
              (canScrollLeft ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-100")
            }
          >
            <MoveLeft
              className={
                `w-4 h-4 ` + (canScrollLeft ? "text-gray-800" : "text-gray-300")
              }
            />
          </div>
          <div
            onClick={handleNext}
            className={
              `rounded-full p-2 cursor-pointer ` +
              (canScrollRight ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-100")
            }
          >
            <MoveRight
              className={
                `w-4 h-4 ` + (canScrollRight ? "text-gray-800" : "text-gray-300")
              }
            />
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className='overflow-hidden mt-2'
      >
        <div
          className='flex gap-4 duration-300 ease-in-out'
          style={{
            transform: `translateX(-${currentIndex * 128}px)`,
            width: `${data.length * 128}px`
          }}
        >
          {data.map((item) => (
            <img
              key={item.id}
              className='w-36 flex-shrink-0'
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              alt=''
            />
          ))}
        </div>
      </div>
      <hr className="border text-gray-200 mt-8" />
    </>
  )
}

export default OnYourMind