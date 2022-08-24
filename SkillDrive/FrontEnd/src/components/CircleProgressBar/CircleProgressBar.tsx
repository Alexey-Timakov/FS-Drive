import React, { useEffect, useRef, useState } from 'react'
import { ICircleProgressBar } from "../../Interfaces/ICircleProgressBar";
import "./CircleProgressBar.scss";

function CircleProgressBar({ percent, stop }: ICircleProgressBar) {
  const circleCanvas = useRef(null);

  const drawCircle = (percent: number) => {
    const currentCanvas: HTMLCanvasElement = circleCanvas.current;
    if (currentCanvas) {
      const ctx = currentCanvas.getContext("2d");
      const PI = Math.PI;
      const startAngle = Math.round(-90 * PI / 180);
      const endAngle = Math.round((((percent * 360 / 100) - 90) * PI) / 180);

      ctx.clearRect(0, 0, 48, 48);
      ctx.beginPath();
      // ctx.imageSmoothingEnabled = true;
      // ctx.imageSmoothingQuality = "medium";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 5;
      ctx.arc(24, 24, 24, startAngle, endAngle);
      ctx.stroke();
    }
  }

  useEffect(() => {
    drawCircle(percent);
  }, [percent])

  return (
    <>
      <div className="circle-progress-bar__out-wrapper">
        <div className="circle-progress-bar__inner-wrapper">
          <canvas width={48} height={48} className="circle-progress-bar__canvas" ref={circleCanvas} />
          <i className="icon-close-cross" onClick={stop}></i>
        </div>
      </div>
    </>
  )
}

export default CircleProgressBar