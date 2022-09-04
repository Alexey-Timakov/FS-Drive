import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { $api, controller } from "../../http";
import { IRegStep } from '../../interfaces/IRegStep';
import { UserState } from '../../interfaces/UserState';
import { IUserAvatarInfo } from '../../Interfaces/IUserAvatarInfo';
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';
import "./RegStep2.scss";
import { addUserInfoToStateAction } from '../../Actions/addUserInfoToStateAction';

export default function RegStep2({ changeRegStep, toggleErrorBar }: IRegStep) {

  const videoContainer = useRef(null);
  const photoContainer = useRef(null);
  const cameraVideo = useRef(null);
  const cameraPhoto = useRef(null);
  const submitButton = useRef(null);

  const userID = useSelector((state: UserState) => state.user.id);
  const dispatch = useDispatch();

  const [percent, setPercent] = useState<number>(0);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [isPhotoError, setPhotoError] = useState<boolean>(false);

  const calculateUploadPercent = (loaded: number, total: number) => {
    const result = Math.round(loaded * 100 / total);
    setPercent(result);
  }

  const axiosConfig: AxiosRequestConfig = {
    signal: controller.signal,
    onUploadProgress: ((progressEvent: ProgressEvent) => {
      calculateUploadPercent(progressEvent.loaded, progressEvent.total);
    })
  }

  const enableSubmitButton = () => {
    const submitButtonCurrent = submitButton.current;
    submitButtonCurrent.classList.add("is-active");
    submitButtonCurrent.disabled = false;
  }

  const disableSubmitButton = () => {
    const submitButtonCurrent = submitButton.current;
    submitButtonCurrent.classList.remove("is-active");
    submitButtonCurrent.disabled = true;
  }

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

  const saveAvatarLink = (link: string): void => {
    console.log(link);
    dispatch(addUserInfoToStateAction("userAvatarLink", link));
  }

  const capturePhoto = (): void => {
    const video: HTMLVideoElement = videoContainer.current;
    const canvas = photoContainer.current;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    stopCamera();
    togglePhotoAndVideoContainers();
    uploadPhoto();
  }

  const deletePhoto = (): void => {
    disableSubmitButton();
    const canvas = photoContainer.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    togglePhotoAndVideoContainers();
    saveAvatarLink("");
    startCamera();
  }

  const uploadPhoto = () => {
    setLoadingStatus(true);
    const fileName = `${userID}_avatar.jpeg`;
    const canvas = photoContainer.current;

    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, fileName);
      $api.post<IUserAvatarInfo>("/upload/avatar", formData, axiosConfig)
        .then((res) => {
          toggleErrorBar(false, 1);
          setPhotoError(false);
          saveAvatarLink(res.data.userAvatarLink)
          enableSubmitButton();
        })
        .catch((error) => {
          toggleErrorBar(true, 1);
          setPhotoError(true);
        })
        .finally(() => {
          setLoadingStatus(false);
        })
    }, "image/jpeg", 1)
  }

  const stopUpload = () => {
    controller.abort()
  }

  useEffect(() => {
    disableSubmitButton()
  }, []);

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
          <canvas ref={photoContainer} id="photo-container" className={isPhotoError ? "photo-container_error" : ""} width={430} height={320} />
          {isLoading && <CircleProgressBar percent={percent} stop={stopUpload} />}
          {!isLoading && !isPhotoError && <button onClick={deletePhoto} className="btn btn_delete">
            <i className="icon-trash"></i>
          </button>}
          {!isLoading && isPhotoError && <button onClick={uploadPhoto} className="btn btn_reload">
            <i className="icon-refresh"></i>
          </button>}
        </div>
      </div>
      <div className="step__footer">
        <button className="step__submit" ref={submitButton} onClick={() => changeRegStep(+1)}>Продолжить</button>
      </div>
    </div>
  )
}
