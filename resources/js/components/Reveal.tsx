import React, { useEffect, useRef, useState } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom';

interface RevealProps {
    children: React.ReactNode;
    direction?: RevealDirection;
    delay?: number;
    className?: string;
    as?: React.ElementType;
}

/**
 * Wraps content in a scroll-triggered fade/slide-in animation.
 * Plays once when the element enters the viewport.
 */
export default function Reveal({ children, direction = 'up', delay = 0, className = '', as = 'div' }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const Tag = as as any;

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`reveal reveal-${direction} ${visible ? 'reveal-visible' : ''} ${className}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </Tag>
    );
}
