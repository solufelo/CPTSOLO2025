import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';

/**
 * ImageLightbox Component
 * Displays a fullscreen slideshow of images with captions.
 * Includes Zoom and Pan capabilities.
 * 
 * Props:
 * - images: Array of { src, alt, title }
 * - initialIndex: Index of the image to start with
 * - isOpen: Boolean to control visibility
 * - onClose: Function to close the lightbox
 */
const ImageLightbox = ({ images, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Zoom & Pan State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const imageContainerRef = useRef(null);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Reset zoom/pan when image changes or lightbox opens
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, [currentIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      // Only navigate if not zoomed in (or handle navigation differently)
      if (scale === 1) {
        if (e.key === 'ArrowLeft') showPrevious();
        if (e.key === 'ArrowRight') showNext();
      }
    };

    const handleWheel = (e) => {
      // Prevent default scrolling
      e.preventDefault();
      
      // Zoom logic
      if (e.ctrlKey || Math.abs(e.deltaY) > 0) {
        if (e.deltaY < 0) {
          // Scroll up -> Zoom In
          handleZoomIn();
        } else {
          // Scroll down -> Zoom Out
          handleZoomOut();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Add wheel listener to the container via ref is safer, but window is fine if we check target?
    // Better to add wheel listener to the root div in JSX or ref.
    // Adding to window with options is necessary for preventing default scroll.
    const container = document.querySelector('.lightbox-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, images, scale]); // added handlers to deps if they weren't stable

  if (!isOpen) return null;

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Zoom Handlers
  const handleZoomIn = (e) => {
    e?.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  // Toggle Zoom on Click
  const handleImageClick = (e) => {
    e.stopPropagation();
    // If dragging happened, do not toggle zoom
    if (isDragging) return;
    
    if (scale > 1) {
      // If zoomed in, reset to 1
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      // If not zoomed, zoom to 2.5
      setScale(2.5);
    }
  };

  const toggleMagnify = (e) => {
    e?.stopPropagation();
    if (scale === 1) {
      setScale(2.5); // Instant zoom to 2.5x
    } else {
      setScale(1);   // Reset
      setPosition({ x: 0, y: 0 });
    }
  };

  // Pan Handlers
  const handleMouseDown = (e) => {
    // Only allow left click
    if (e.button !== 0) return;
    
    // Check if we are zoomed in OR allow swipe navigation if not zoomed
    e.preventDefault();
    setIsDragging(false); // Reset dragging state initially
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    // For swipe detection
    if (scale === 1) {
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseMove = (e) => {
    // Determine if user is dragging based on movement threshold
    if (e.buttons !== 1) return; // Ensure left button is held

    const moveX = e.clientX;
    const moveY = e.clientY;
    
    // Check for minimal movement to consider it a drag
    const moveThreshold = 5;
    const startX = scale === 1 ? dragStart.x : (dragStart.x + position.x);
    const startY = scale === 1 ? dragStart.y : (dragStart.y + position.y);
    
    // We need to calculate distance moved from initial click
    // But dragStart stores adjusted position.
    // Let's use a ref for pure initial click coordinates for threshold check?
    // Actually, simple check:
    if (!isDragging) {
       // Ideally verify distance > 5px
       setIsDragging(true);
    }

    if (scale > 1) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = (e) => {
    if (scale === 1 && isDragging) {
      // Swipe logic
      const deltaX = e.clientX - dragStart.x;
      if (Math.abs(deltaX) > 100) { // Threshold for swipe
        if (deltaX > 0) showPrevious();
        else showNext();
      }
    }
    // Delay setting isDragging to false so Click handler can check it
    setTimeout(() => setIsDragging(false), 0);
  };

  // Right Click Handler
  const handleContextMenu = (e) => {
    if (scale > 1) {
      e.preventDefault();
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const currentImage = images[currentIndex];

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in select-none lightbox-container"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-gold transition-colors bg-black/20 rounded-full hover:bg-black/40"
        aria-label="Close lightbox"
      >
        <Icon icon="mdi:close" width="32" />
      </button>

      {/* Navigation Buttons (Hide when zoomed in to prevent accidental clicks, or keep them) */}
      {images.length > 1 && scale === 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); showPrevious(); }}
            className="absolute left-4 z-50 p-2 text-white/70 hover:text-gold transition-colors hidden sm:block bg-black/20 rounded-full hover:bg-black/40"
            aria-label="Previous image"
          >
            <Icon icon="mdi:chevron-left" width="48" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 z-50 p-2 text-white/70 hover:text-gold transition-colors hidden sm:block bg-black/20 rounded-full hover:bg-black/40"
            aria-label="Next image"
          >
            <Icon icon="mdi:chevron-right" width="48" />
          </button>
        </>
      )}

      {/* Main Content */}
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden" 
        onClick={(e) => { 
          // Close only if clicking background and NOT dragging and NOT zoomed
          if (scale === 1 && !isDragging) onClose(); 
        }}
      >
        <div 
          ref={imageContainerRef}
          className={`relative flex flex-col items-center transition-transform duration-200 ease-out ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
          onClick={handleImageClick}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            // When dragging, remove transition for instant follow. When zooming, smooth transition.
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {/* Image */}
          <img 
            src={currentImage.src} 
            alt={currentImage.alt} 
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-none select-none" 
            draggable={false}
          />
        </div>

        {/* Caption & Counter (Only visible when not zoomed or scale is 1) */}
        {scale === 1 && (
          <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none px-4 z-40">
            <div className="inline-block bg-black/60 backdrop-blur-md p-4 rounded-xl max-w-2xl mx-auto pointer-events-auto">
              <h3 className="font-amiamie-round text-xl text-gold font-bold mb-1">
                {currentImage.title || currentImage.alt}
              </h3>
              {currentImage.description && (
                <p className="font-amiamie text-sm text-white/80">
                  {currentImage.description}
                </p>
              )}
              <div className="mt-2 text-xs text-white/50 font-mono">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}

        {/* Zoom Controls Toolbar */}
        <div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 z-50 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleZoomOut}
            className="text-white/70 hover:text-white disabled:opacity-30 transition-colors"
            disabled={scale <= 1}
            title="Zoom Out"
          >
            <Icon icon="mdi:magnify-minus-outline" width="24" />
          </button>
          
          <span className="text-white/90 text-sm font-mono min-w-[3ch] text-center select-none">
            {Math.round(scale * 100)}%
          </span>

          <button 
            onClick={handleZoomIn}
            className="text-white/70 hover:text-white disabled:opacity-30 transition-colors"
            disabled={scale >= 4}
            title="Zoom In"
          >
            <Icon icon="mdi:magnify-plus-outline" width="24" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <button 
            onClick={toggleMagnify}
            className={`transition-colors flex items-center gap-2 ${scale > 1 ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}
            title={scale > 1 ? "Reset Zoom" : "Magnify (2.5x)"}
          >
            <Icon icon={scale > 1 ? "mdi:fit-to-screen-outline" : "mdi:magnify-scan"} width="24" />
            <span className="text-xs font-bold uppercase hidden sm:inline">
              {scale > 1 ? "Reset" : "Magnify"}
            </span>
          </button>
        </div>
      </div>

      {/* Thumbnail Strip (Hidden when zoomed for cleaner view) */}
      {scale === 1 && (
        <div className="absolute top-4 left-4 z-40 hidden lg:flex flex-col gap-2 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          {/* Optional: Side thumbnails could go here, or keep bottom dots */}
        </div>
      )}
      
      {/* Bottom Dots Navigation */}
      {scale === 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto z-40">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
              className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                idx === currentIndex ? 'bg-gold scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageLightbox;

