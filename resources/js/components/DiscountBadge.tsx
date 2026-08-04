import React from 'react';

interface DiscountBadgeProps {
    text?: string;
    subtitle?: string;
    circularText?: string;
    className?: string;
}

export default function DiscountBadge({
    text = "40% OFF",
    subtitle = "UP TO",
    circularText = "UPTO 40% OFF   .   GRAND SALE   .   EXCLUSIVE OFFER   .   ",
    className = ""
}: DiscountBadgeProps) {
    return (
        <div
            className={`relative flex items-center justify-center cursor-pointer group ${className}`}
            style={{ width: '100%', height: '100%', aspectRatio: '1/1' }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&display=swap');
                .font-luxury-cinzel { font-family: 'Cinzel', serif; }
                .gold-gradient-text {
                    background: linear-gradient(135deg, #FFD700 0%, #C9A227 50%, #B8860B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @keyframes slow-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-slow-spin {
                    animation: slow-spin 12s linear infinite;
                    transform-origin: 50% 50%;
                }
                .group:hover .animate-slow-spin {
                    animation-duration: 6s;
                }
            `}} />

            {/* Main Badge Container */}
            <div className="relative w-full h-full rounded-full bg-[#0B132B] shadow-[0_4px_15px_rgba(11,19,43,0.5)] border border-[#C9A227]/30 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">

                {/* Rotating Luxury Ring (SVG) */}
                <svg
                    className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] pointer-events-none origin-center animate-slow-spin"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#C9A227" />
                            <stop offset="100%" stopColor="#B8860B" />
                        </linearGradient>
                        <path id="circlePath" d="M 50, 6 a 44,44 0 1,1 0,88 a 44,44 0 1,1 0,-88" />
                    </defs>

                    {/* Outer Thin Ring */}
                    <circle cx="50" cy="50" r="49" stroke="url(#goldGrad)" strokeWidth="0.2" opacity="0.5" />

                    {/* Circular Text */}
                    <text className="font-luxury-cinzel uppercase" fill="#C9A227" fontSize="7.5" letterSpacing="1.5" fontWeight="400">
                        <textPath href="#circlePath" startOffset="0%" textLength="276" lengthAdjust="spacing">
                            {circularText}
                        </textPath>
                    </text>

                    {/* Inner Thin Ring */}
                    <circle cx="50" cy="50" r="41" stroke="url(#goldGrad)" strokeWidth="0.2" opacity="0.4" />
                    <circle cx="50" cy="50" r="40" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.2" strokeDasharray="1 3" />
                </svg>

                {/* Text Content */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center p-3">
                    <span className="font-luxury-cinzel text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] text-[#C9A227] mb-0.5 opacity-90">
                        {subtitle}
                    </span>
                    <span className="font-luxury-cinzel text-xl sm:text-2xl md:text-3xl font-bold leading-none gold-gradient-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] my-0.5">
                        {text.split(' ').map((word, i, arr) => (
                            <React.Fragment key={i}>
                                {word}
                                {i !== arr.length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </span>
                    {/* Grand sale footer removed as requested */}
                </div>
            </div>
        </div>
    );
}
