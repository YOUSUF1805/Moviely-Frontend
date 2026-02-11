import React from "react";

const TrailerModal = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-2">
      <div className="relative w-full sm:w-[80%] lg:w-[60%] aspect-video">
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 text-white text-lg"
        >
          ✕
        </button>

        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
