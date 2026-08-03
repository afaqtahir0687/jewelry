import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface DiscountBadgeProps {
    text?: string;
    subtitle?: string;
    footer?: string;
    circularText?: string;
    className?: string;
}

export default function DiscountBadge({
    text = "40% OFF",
    subtitle = "UP TO",
    footer = "GRAND SALE",
    circularText = "• EXCLUSIVE OFFER • GRAND SALE • UP TO 40% OFF ",
    className = ""
}: DiscountBadgeProps) {
    const badgeRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<SVGSVGElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const shimmerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);

    // Animations
    useEffect(() => {
        const ring = ringRef.current;
        const glow = glowRef.current;
        const shimmer = shimmerRef.current;
        const particles = particlesRef.current?.children;

        const ctx = gsap.context(() => {
            // Main ring rotation (18s default)
            const rotationAnim = gsap.to(ring, {
                rotation: 360,
                duration: 18,
                ease: "none",
                repeat: -1,
                transformOrigin: "50% 50%"
            });

            // Glow pulse
            const glowAnim = gsap.to(glow, {
                opacity: 0.8,
                scale: 1.05,
                duration: 3.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            // Shimmer sweep
            const shimmerAnim = gsap.to(shimmer, {
                rotation: 360,
                duration: 2,
                ease: "none",
                repeat: -1,
                transformOrigin: "50% 50%"
            });

            // Particles animation
            if (particles) {
                gsap.set(particles, {
                    x: "random(-60, 60)",
                    y: "random(-60, 60)",
                    scale: "random(0.5, 1.5)",
                    opacity: 0
                });

                gsap.to(particles, {
                    y: "-=30",
                    x: "+=random(-20, 20)",
                    rotation: "random(-180, 180)",
                    opacity: "random(0.4, 0.8)",
                    duration: "random(2, 4)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.2,
                        repeat: -1,
                        yoyo: true
                    }
                });
            }

            // Hover state management
            if (isHovered) {
                gsap.to(badgeRef.current, { scale: 1.05, duration: 0.4, ease: "power2.out" });
                gsap.to(glowAnim, { duration: 2, ease: "power2.out" }); // faster pulse
                gsap.to(rotationAnim, { timeScale: 1.5, duration: 0.4 }); // speed up ring
                gsap.to(shimmerAnim, { timeScale: 1.5, duration: 0.4 }); // speed up shimmer
                gsap.to(glow, { opacity: 1, duration: 0.4 }); // increase glow brightness
            } else {
                gsap.to(badgeRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
                gsap.to(glowAnim, { duration: 3.5, ease: "power2.out" }); // reset pulse
                gsap.to(rotationAnim, { timeScale: 1, duration: 0.4 }); // reset ring speed
                gsap.to(shimmerAnim, { timeScale: 1, duration: 0.4 }); // reset shimmer speed
                gsap.to(glow, { opacity: 0.5, duration: 0.4 }); // reset glow brightness
            }
        }, badgeRef);

        return () => ctx.revert();
    }, [isHovered]);

    return (
        <div 
            ref={badgeRef}
            className={`relative flex items-center justify-center cursor-pointer group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: '100%', height: '100%', maxWidth: '320px', maxHeight: '320px', aspectRatio: '1/1' }}
        >
            {/* Google Fonts Import for luxury serif font */}
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&display=swap');
                .font-luxury-cinzel { font-family: 'Cinzel', serif; }
                .gold-gradient-text {
                    background: linear-gradient(135deg, #FFD700 0%, #C9A227 50%, #B8860B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .gold-gradient-bg {
                    background: linear-gradient(135deg, #FFD700 0%, #C9A227 50%, #B8860B 100%);
                }
            `}} />

            {/* Pulsing Outer Glow */}
            <div 
                ref={glowRef}
                className="absolute inset-2 rounded-full opacity-50 blur-xl transition-all duration-300"
                style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(11,19,43,0) 70%)',
                }}
            />

            {/* Floating Particles */}
            <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 rounded-full gold-gradient-bg shadow-[0_0_4px_#FFD700]" />
                ))}
            </div>

            {/* Main Badge Container (Dark Navy) */}
            <div className="relative w-full h-full rounded-full bg-[#0B132B] shadow-[0_0_30px_rgba(11,19,43,0.8)] border border-[#C9A227]/30 flex items-center justify-center overflow-hidden z-10">
                
                {/* Inner Shimmer Effect */}
                <div 
                    ref={shimmerRef}
                    className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20 pointer-events-none"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 90deg, #FFD700 120deg, transparent 150deg, transparent 360deg)'
                    }}
                />

                {/* Rotating Luxury Ring (SVG) */}
                <svg 
                    ref={ringRef}
                    className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] drop-shadow-[0_0_5px_rgba(255,215,0,0.3)] pointer-events-none"
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
                    <text className="font-luxury-cinzel uppercase" fill="url(#goldGrad)" fontSize="7.5" letterSpacing="2" fontWeight="600">
                        <textPath href="#circlePath" startOffset="0%" textLength="276">
                            {circularText}
                        </textPath>
                    </text>
                    
                    {/* Inner Thin Ring */}
                    <circle cx="50" cy="50" r="39" stroke="url(#goldGrad)" strokeWidth="0.2" opacity="0.5" />
                    <circle cx="50" cy="50" r="38" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.3" strokeDasharray="1 2" />
                </svg>

                {/* Text Content */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center p-4">
                    <span className="font-luxury-cinzel text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] text-[#C9A227] mb-1 opacity-90">
                        {subtitle}
                    </span>
                    <span className="font-luxury-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none gold-gradient-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] my-1">
                        {text.split(' ').map((word, i, arr) => (
                            <React.Fragment key={i}>
                                {word}
                                {i !== arr.length - 1 && <br/>}
                            </React.Fragment>
                        ))}
                    </span>
                    <span className="font-luxury-cinzel text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] text-[#C9A227] mt-2 opacity-90 border-t border-[#C9A227]/30 pt-2 w-3/4">
                        {footer}
                    </span>
                </div>
            </div>
        </div>
    );
}
