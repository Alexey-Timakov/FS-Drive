import React, { useEffect, useRef, useState } from 'react'
import { ICircleProgressBar } from "../../Interfaces/ICircleProgressBar";
import "./CircleProgressBar.scss";

function CircleProgressBar({ percent, isLoading, isError, stop, reload, remove }: ICircleProgressBar) {
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
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.lineWidth = 5;
      ctx.arc(24, 24, 24, startAngle, endAngle);
      ctx.stroke();
    }
  }

  const clickStop = () => {
    stop();
  }

  const clickRefresh = () => {
    reload();
  }

  const clicRemove = () => {
    remove();
  }

  useEffect(() => {
    drawCircle(percent);
  }, [percent])

  return (
    <>
      <div className="circle-progress-bar__out-wrapper">
        <div className="circle-progress-bar__inner-wrapper">
          {isLoading && <canvas width={48} height={48} className="circle-progress-bar__canvas" ref={circleCanvas} />}
          {isLoading && <i className="icon-close-cross" onClick={clickStop}></i>}
          {!isLoading && isError && <i className="icon-refresh" onClick={clickRefresh}></i>}
          {remove && !isLoading && !isError && <i className="icon-trash" onClick={clicRemove}></i>}
        </div>
      </div>
    </>
  )
}

export default CircleProgressBar