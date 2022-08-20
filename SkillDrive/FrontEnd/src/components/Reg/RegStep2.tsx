import React, { useRef } from 'react'
import { IRegStep } from '../../interfaces/IRegStep';
import "./RegStep2.scss";

export default function RegStep2({ changeRegStep, toggleErrorBar }: IRegStep) {
  const videoContainer = useRef(null);
  const photoContainer = useRef(null);
  const cameraVideo = useRef(null);
  const cameraPhoto = useRef(null);
  const submitButton = useRef(null);

  const firstStart = (): void => {
    startCamera();
    toggleStartCameraBtn();
    toggleCaptureCameraBtn();
  }

  const startCamera = (): void => {
    const video: HTMLVideoElement = videoContainer.current;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }
  }
  const stopCamera = (): void => {
    const video = videoContainer.current;
    video.srcObject.getVideoTracks().forEach((track) => track.stop());
  }

  const capturePhoto = (): void => {
    const video: HTMLVideoElement = videoContainer.current;
    const canvas = photoContainer.current;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    stopCamera();
    togglePhotoAndVideoContainers();
  }

  const deletePhoto = (): void => {
    const canvas = photoContainer.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    togglePhotoAndVideoContainers();
    startCamera();
  }
  
  const uploadPhoto = () => {
    const canvas = photoContainer.current;
    canvas.current.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, "newFileName.jpeg");
      fetch("http://localhost:3000/uploadfile", {
        method: "POST",
        body: formData
      });
    }, "image/jpeg", 1)
  }

  const togglePhotoAndVideoContainers = (): void => {
    const photoWrapper: HTMLDivElement = cameraPhoto.current;
    const videoWrapper: HTMLDivElement = cameraVideo.current;

    videoWrapper.classList.toggle("active");
    photoWrapper.classList.toggle("active");
  }

  const toggleStartCameraBtn = (): void => {
    const startBtn: HTMLButtonElement = document.querySelector(".btn_start");
    startBtn.classList.toggle("active");
  }

  const toggleCaptureCameraBtn = () => {
    const captureBtn: HTMLButtonElement = document.querySelector(".btn_capture");
    captureBtn.classList.toggle("active");
  }

  return (
    <div className='step'>
      <h1 className='step__title'>Загрузите селфи</h1>
      <p className='step__description'>Смотрите прямо в камеру, без солнцезащитных очков и головных уборов.</p>
      <div className='camera__wrapper'>
        <div ref={cameraVideo} className='camera__video active'>
          <video ref={videoContainer} autoPlay={false} id="video-container" />
          <button onClick={firstStart} className="btn btn_start active"><i className="icon-camera"></i></button>
          <button onClick={capturePhoto} className="btn btn_capture"><i className="icon-camera white"></i></button>
        </div>
        <div ref={cameraPhoto} className='camera__photo'>
          <canvas ref={photoContainer} id="photo-container" width={430} height={320} />
          <button onClick={deletePhoto} className="btn btn_delete"><i className="icon-trash trash"></i></button>
        </div>
      </div>
      <div className="step__footer">
        <button className="step__submit" ref={submitButton} onClick={uploadPhoto}>Продолжить</button>
      </div>
    </div>
  )
}
