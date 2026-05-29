'use client';

import React, { useRef, useState } from 'react';

interface GlassButtonProps {
  variant?: 'primary' | 'secondary' | 'neural';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassButton({
  variant = 'secondary',
  children,
  onClick,
  href,
  className = '',
  style = {},
}: GlassButtonProps) {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setCoords({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const buttonStyle: React.CSSProperties = {
    transform: isHovered ? `translate3d(${coords.x}px, ${coords.y}px, 0)` : 'translate3d(0, 0, 0)',
    transition: isHovered ? 'none' : 'transform 0.5s var(--ease-spring)',
    ...style,
  };

  const fullClassName = `btn btn-${variant} ${className}`;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>);
    }
  };

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        className={fullClassName}
        style={buttonStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleLinkClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleButtonClick}
      className={fullClassName}
      style={buttonStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
