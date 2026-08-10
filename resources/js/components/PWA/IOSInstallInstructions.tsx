import React from 'react';

interface IOSInstallInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IOSInstallInstructions({ isOpen, onClose }: IOSInstallInstructionsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-[#fff8f0] rounded-t-2xl border-t border-[#d4af37]/30 shadow-2xl px-6 pt-5 pb-8 relative text-[#5c1a1b] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle for drag indicator aesthetic */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-serif font-bold text-xl tracking-wide">Install Gehna App</h3>
            <p className="text-xs text-gray-500 mt-0.5">Add to your Home Screen for the best experience</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#5c1a1b]/5 hover:bg-[#5c1a1b]/10 flex items-center justify-center text-[#5c1a1b] transition-colors"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        <div className="space-y-4 my-5 text-sm">
          <div className="flex items-center gap-3.5 bg-white/50 p-3 rounded-lg border border-[#d4af37]/10">
            <span className="w-7 h-7 rounded-full bg-[#5c1a1b] text-white flex items-center justify-center font-bold text-xs">1</span>
            <p className="flex-1 leading-relaxed">
              Tap the <strong className="font-semibold">Share</strong> button in Safari's bottom toolbar <i className="fa-solid fa-arrow-up-from-bracket text-[#d4af37] mx-1 text-base inline-block" />.
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/50 p-3 rounded-lg border border-[#d4af37]/10">
            <span className="w-7 h-7 rounded-full bg-[#5c1a1b] text-white flex items-center justify-center font-bold text-xs">2</span>
            <p className="flex-1 leading-relaxed">
              Scroll down and select <strong className="font-semibold">Add to Home Screen</strong> <i className="fa-regular fa-square-plus text-[#d4af37] mx-1 text-base inline-block" />.
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/50 p-3 rounded-lg border border-[#d4af37]/10">
            <span className="w-7 h-7 rounded-full bg-[#5c1a1b] text-white flex items-center justify-center font-bold text-xs">3</span>
            <p className="flex-1 leading-relaxed">
              Tap <strong className="font-semibold">Add</strong> in the top right corner.
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 bg-[#5c1a1b] hover:bg-[#7a2426] text-white rounded-lg font-semibold tracking-wide transition-colors shadow-lg shadow-[#5c1a1b]/10"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
