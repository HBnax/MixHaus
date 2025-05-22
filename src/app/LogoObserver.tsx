"use client";
import { useEffect, useRef, useState } from "react";
import { mouseSubject } from "./MousePositionObserver";
import Image from "next/image";

const LOGO_IMAGES = [
  "/mixhaus1.svg",
  "/mixhaus3.svg",
  "/mixhaus2.svg",
  "/mixhaus3.svg",
];

export default function LogoObserver() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState("/mixhaus1.svg");
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = (x: number, y: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (isInside && !animationRef.current) {
        let index = 0;
        animationRef.current = setInterval(() => {
          setCurrentImage(LOGO_IMAGES[index]);
          index = (index + 1) % LOGO_IMAGES.length;
        }, 100);
      } else if (!isInside && animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
        setCurrentImage("/mixhaus1.svg");
      }
    };

    mouseSubject.subscribe(observer);
    return () => {
      mouseSubject.unsubscribe(observer);
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Image src={currentImage} alt="MixHaus Logo" width={60} height={60} />
    </div>
  );
}
