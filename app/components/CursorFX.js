"use client";
import { useEffect, useRef } from "react";

export default function CursorFX() {
  const dotRef=useRef(null), ringRef=useRef(null);
  useEffect(()=>{
    const dot=dotRef.current, ring=ringRef.current;
    if(!dot||!ring||matchMedia("(pointer: coarse)").matches)return;
    let mx=0,my=0,rx=0,ry=0,raf;
    const move=e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate3d(${mx}px,${my}px,0)`};
    const down=()=>document.body.classList.add("cursor-click");
    const up=()=>document.body.classList.remove("cursor-click");
    const tick=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;raf=requestAnimationFrame(tick)};
    addEventListener("mousemove",move);addEventListener("mousedown",down);addEventListener("mouseup",up);tick();
    return()=>{cancelAnimationFrame(raf);removeEventListener("mousemove",move);removeEventListener("mousedown",down);removeEventListener("mouseup",up)};
  },[]);
  return <><div ref={ringRef} className="cursor-ring" aria-hidden="true"/><div ref={dotRef} className="cursor-dot" aria-hidden="true"/></>;
}
