import React, { useEffect, useRef, useState, DragEvent } from 'react';
import { IRegStep } from '../../interfaces/IRegStep';
import { FileThumbnail } from "./FileThumbnail";

import uploadCloud from "./Images/upload-cloud.svg";
import rectangleBig from "./Images/rectangle-big.svg";
import rectangleSmall from "./Images/rectangle-small.svg";

import "./RegStep3.scss";

// Can't figure out any additional cases for Error in this step. All errors handle in Thumbnail component.
export default function RegStep3({ changeRegStep, toggleErrorBar }: IRegStep) {
  const submitButton = useRef(null);
  const inputFiles = useRef(null);

  const [userFiles, changeUserFiles] = useState<File[]>([]);
  const [uploadErrors, setUploadErrors] = useState<number>(null);

  const breakpointMobile: number = 768;

  const changeUploadErrors = (increment: number): void => {
    const newErrorsNumber = Math.max(0, uploadErrors + increment);
    setUploadErrors(newErrorsNumber);
  }

  const clickOnInput = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (inputFiles) {
      const input: HTMLInputElement = inputFiles.current;
      input.click();
    }
  }

  const handleDopFiles = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    let newUserFiles = userFiles;

    if (event.dataTransfer.files) {
      const files: FileList = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        newUserFiles = [...newUserFiles, files[i]]
      }
      changeUserFiles(newUserFiles);
    }
  }

  const handleFiles = (): void => {
    let newUserFiles = userFiles;
    if (inputFiles) {
      const input: HTMLInputElement = inputFiles.current;
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        newUserFiles = [...newUserFiles, files[i]]
      }
      changeUserFiles(newUserFiles);
    }
  }

  const deleteFile = (fileName: string): void => {
    const newUserFiles = userFiles.filter(item => item.name !== fileName);
    changeUserFiles(newUserFiles);
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

  useEffect(() => {
    if (uploadErrors === 0) {
      enableSubmitButton();
    } else {
      disableSubmitButton();
    }
  }, [uploadErrors])

  return (
    <div className='step'>
      <h1 className='step__title'>Загрузите документы</h1>
      <p className='step__description'>Разворот паспорта и страницу с пропиской, а также водительское удостоверение с двух сторон.</p>
      <div className='step__thumbnails'>
        <input type="file" id="input-files" ref={inputFiles} multiple accept="image/png, image/jpg, image/jpeg" onChange={handleFiles} />
        {userFiles.length === 0 && document.body.clientWidth > breakpointMobile &&
          <div id='drop-zone' className='drop-zone__wrapper' onDrop={handleDopFiles}>
            <img className='drop-zone__image' src={rectangleBig} />
            <div className='drop-zone__body'>
              <div className='drop-zone__icon'><img src={uploadCloud} /></div>
              <div className='drop-zone__description'>
                <p className='drop-zone__text'>Перетащите или <span onClick={clickOnInput}>выберите файл</span></p>
                <p className='drop-zone__reminder'>JPG, JPEG или PNG, не более 30 мб</p>
              </div>
            </div>
          </div>
        }
        {userFiles.length !== 0 && userFiles.map(item => {
          return (
            <FileThumbnail
              file={item}
              key={item.name}
              deleteFile={deleteFile}
              changeUploadErrors={changeUploadErrors}
            />)
        })}
        {document.body.clientWidth < breakpointMobile &&
          <div className='add-zone__wrapper'>
            <div className='add-zone__icon'>
              <i className="icon-plus">+</i>
            </div>
            <div className='add-zone__description'>
              <p className='add-zone__text'><span onClick={clickOnInput}>Загрузить файл</span></p>
              <p className='add-zone__reminder'>JPG, JPEG или PNG, не более 30 мб</p>
            </div>

          </div>
        }
        {userFiles.length !== 0 && document.body.clientWidth > breakpointMobile &&
          <div id='drop-zone_small' className='drop-zone__wrapper drop-zone__wrapper_small'>
            <img className='drop-zone__image' src={rectangleSmall} />
            <div className='drop-zone__body'>
              <div className='drop-zone__icon'><img src={uploadCloud} /></div>
              <div className='drop-zone__description'>
                <p className='drop-zone__text'>Добавить <span onClick={clickOnInput}>еще файл</span></p>
                <p className='drop-zone__reminder'>JPG, JPEG или PNG, не более 30 мб</p>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="step__footer">
        <button className="step__submit" ref={submitButton} onClick={() => changeRegStep(+1)}>Зарегистрироваться</button>
      </div>
    </div>
  )
}