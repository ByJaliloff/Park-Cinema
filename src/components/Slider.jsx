import { useState, useRef } from 'react';

const slides = [
  '/images/slide1.webp',
  '/images/slide2.webp',
  '/images/slide3.webp',
  '/images/slide4.webp',
  '/images/slide5.webp',
  '/images/slide6.webp',
  '/images/slide7.webp',
  '/images/slide8.webp',
  '/images/slide9.webp'
];

function Slider() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const onMouseDown = (e) => {
    setDragging(true);
    startX.current = e.clientX;
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const diff = e.clientX - startX.current;
    setDragOffset(diff);
  };

  const onMouseUp = () => {
    if (!dragging) return;
    setDragging(false);

    const threshold = 100;
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  const onMouseLeave = () => {
    if (!dragging) return;
    setDragging(false);
    setDragOffset(0);
  };

  const nextIndex = (current + 1) % slides.length;
  const prevIndex = (current - 1 + slides.length) % slides.length;

  let opacityPrev = 0;
  let opacityCurrent = 1;
  let opacityNext = 0; 

  const absOffset = Math.min(Math.abs(dragOffset), 150);
  const ratio = absOffset / 150;

  if (dragOffset < 0) {
    opacityCurrent = 1 - ratio;
    opacityNext = ratio;
  } else if (dragOffset > 0) {
    opacityCurrent = 1 - ratio;
    opacityPrev = ratio;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden cursor-grab select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={slides[current]}
        alt={`slide-${current}`}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: opacityCurrent }}
        draggable={false}
      />

      {dragOffset < 0 && (
        <img
          src={slides[nextIndex]}
          alt={`slide-${nextIndex}`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: opacityNext }}
          draggable={false}
        />
      )}

      {dragOffset > 0 && (
        <img
          src={slides[prevIndex]}
          alt={`slide-${prevIndex}`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: opacityPrev }}
          draggable={false}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-2 rounded-full text-white z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Slider;
