"use client";

import Image, { StaticImageData } from "next/image";
import { FC, useState, MouseEvent, TouchEvent } from "react";

interface ImageMagnifierProps {
  src: StaticImageData;
  className?: string;
  width?: number;
  height?: number;
  alt: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

const ImageMagnifier: FC<ImageMagnifierProps> = ({
  src,
  className,
  width,
  height,
  alt,
  magnifierHeight = 300,
  magnifierWidth = 300,
  zoomLevel = 1.5,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState<[number, number]>([0, 0]);
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);

  const mouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const { top, left } = el.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  const touchStart = (e: TouchEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const touchMove = (e: TouchEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const { top, left } = el.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.pageX - left - window.scrollX;
    const y = touch.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseMove={mouseMove}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
    >
      <Image
        src={src}
        className={className}
        width={width}
        height={height}
        alt={alt}
      />
      <div
        className="zoom-box"
        style={{
          zIndex: 99999999,
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          opacity: "1",
          border: "1px solid lightgrey",
          backgroundColor: "white",
          borderRadius: "5px",
          backgroundImage: `url('${src.src}')`,
          backgroundRepeat: "no-repeat",
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
};

export default ImageMagnifier;
