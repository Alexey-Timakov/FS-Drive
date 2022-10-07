import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { AxiosRequestConfig } from 'axios';
import { $api, controller } from "../../http";

import { IThumbnailFile } from "../../Interfaces/IThumbnailFile";
import { IUserFile } from '../../Interfaces/IUserFile';
import { IState } from '../../Interfaces/IState';
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';

import "./FileThumbnail.scss";

export function FileThumbnail({ file, deleteFile, changeUploadErrors }: IThumbnailFile) {
  const imagePreview = useRef<HTMLImageElement>(null);
  const imageSrc = URL.createObjectURL(file);

  const [percent, setPercent] = useState<number>(0);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [isFileError, setFileError] = useState<boolean>(false);

  const userID = useSelector((state: IState) => state?.user?.id);
  const fileInfo = new IUserFile(file);

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

  const uploadFile = () => {
    setLoadingStatus(true);

    const filName: string = userID + "_" + file.name;
    const formData = new FormData();
    formData.append('file', file, filName);

    $api.post<boolean>("/files/upload-file", formData, axiosConfig)
      .then((res) => {
        setFileError(false);
        changeUploadErrors(-1);
      })
      .catch((error) => {
        changeUploadErrors(+1);
        setFileError(true);
      })
      .finally(() => {
        setLoadingStatus(false);
      })
  }

  const stopUpload = (): void => {
    controller.abort()
  }

  useEffect(() => {
    const image = imagePreview.current;
    image.onload = () => {
      URL.revokeObjectURL(image.src);
    }
    uploadFile();
  }, [])

  return (
    <div className='thumbnail__wrapper'>
      <div className='thumbnail__image'>
        <img ref={imagePreview} src={imageSrc} alt="Уменьшенное изображение файла" />
        {(isLoading || isFileError) && <CircleProgressBar
          percent={percent}
          isLoading={isLoading}
          isError={isFileError}
          stop={stopUpload}
          reload={uploadFile} />}
      </div>
      <div className='thumbnail__btn-and-description'>
        <div className='thumbnail__description'>
          <p className='thumbnail__name'>{fileInfo.name}</p>
          {!isFileError && <p className='thumbnail__info'>{fileInfo.size}, {fileInfo.ext}</p>}
          {isFileError && <p className='thumbnail__info thumbnail__info_error'>Не удалось загрузить файл</p>}
        </div>
        <div className='thumbnail__btn'>
          {!isLoading && <button onClick={() => deleteFile(file.name)}>
            <i className="icon-trash_green"></i>
          </button>}
        </div>
      </div>
    </div>
  )
}