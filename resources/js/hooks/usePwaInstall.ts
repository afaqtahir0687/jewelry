import { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from '../types/pwa';

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      // iOS Safari specific detection
      const isIOSStandalone = ('standalone' in window.navigator) && (window.navigator as any).standalone;
      setIsStandalone(isStandaloneMedia || !!isIOSStandalone);
    };

    // Check if platform is iOS
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIOSDevice);
    };

    checkStandalone();
    checkIOS();

    // Load banner dismissal status
    const dismissed = localStorage.getItem('pwa_install_banner_dismissed') === 'true';
    setIsDismissed(dismissed);

    // Handler for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return false;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  const dismissBanner = () => {
    localStorage.setItem('pwa_install_banner_dismissed', 'true');
    setIsDismissed(true);
  };

  // The application is installable if:
  // 1. We have a deferred prompt (Android/Chrome/Edge) OR it is an iOS device
  // 2. It is not already running in standalone mode (installed)
  const isInstallable = (!!deferredPrompt || isIOS) && !isStandalone;

  // We should show the banner/prompt if:
  // 1. It is installable
  // 2. The user has not already dismissed the banner
  const showBanner = isInstallable && !isDismissed;

  return {
    isInstallable,
    isStandalone,
    isIOS,
    showBanner,
    triggerInstall,
    dismissBanner,
  };
}
