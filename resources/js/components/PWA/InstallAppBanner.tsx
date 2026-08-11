import React, { useState } from 'react';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import IOSInstallInstructions from './IOSInstallInstructions';

export default function InstallAppBanner() {
  const { showBanner, isIOS, triggerInstall, dismissBanner } = usePwaInstall();
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);

  if (!showBanner) return null;

  const handleInstallClick = async () => {
    if (isIOS) {
      setIsIosModalOpen(true);
    } else {
      const installed = await triggerInstall();
      if (installed) {
        dismissBanner();
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-24 md:bottom-6 right-4 left-4 md:left-auto md:w-96 bg-white border border-[#d4af37]/30 rounded-xl shadow-2xl p-4 z-40 flex items-start gap-3 animate-slide-up">
        {/* App Logo/Icon representation */}
        <div className="w-12 h-12 rounded-lg bg-[#4a0e0e] flex items-center justify-center text-white shrink-0 border border-[#d4af37]/20 shadow-md">
          <i className="fa-solid fa-gem text-xl text-[#d4af37]" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="font-serif font-bold text-sm text-[#4a0e0e] leading-tight">Gehna Jewellery App</h4>
            <button 
              onClick={dismissBanner}
              className="text-gray-400 hover:text-[#4a0e0e] p-0.5"
              aria-label="Dismiss banner"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 leading-normal">
            Install the app on your home screen for faster access &amp; premium updates.
          </p>
          <button
            onClick={handleInstallClick}
            className="mt-3 px-4 py-1.5 bg-[#4a0e0e] hover:bg-[#b76e79] text-white text-xs font-semibold rounded-md transition-colors"
          >
            Install App
          </button>
        </div>
      </div>

      <IOSInstallInstructions 
        isOpen={isIosModalOpen} 
        onClose={() => setIsIosModalOpen(false)} 
      />
    </>
  );
}
