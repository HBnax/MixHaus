"use client";
import { useEffect } from "react";
import { mouseSubject } from "./MousePositionObserver";

export default function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseSubject.notify(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null; // 시각적으로 아무것도 안 보여줌
}
