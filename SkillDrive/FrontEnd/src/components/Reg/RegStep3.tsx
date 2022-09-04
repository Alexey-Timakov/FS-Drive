import React, { useEffect, useRef, useState } from 'react'
import { IRegStep } from '../../interfaces/IRegStep'
import { IUserFile } from "../../Interfaces/IUserFile";

import uploadCloud from "./Images/upload-cloud.svg";
import rectangleBig from "./Images/rectangle-big.svg";

import "./RegStep3.scss";

export default function RegStep3({ changeRegStep, toggleErrorBar }: IRegStep) {
  const submitButton = useRef(null);
  const inputFiles = useRef(null);
  const [userFiles, changeUserFiles] = useState<IUserFile[]>(null);

  const clickOnInput = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (inputFiles) {
      const input: HTMLInputElement = inputFiles.current;
      input.click();
    }
  }

  const handleFiles = (): void => {
    const userInputs = [] as IUserFile[];

    if (inputFiles) {
      const input: HTMLInputElement = inputFiles.current;
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        const file = new IUserFile(files[i]);
        userInputs.push(file);
      }
      changeUserFiles(userInputs);
    }
  }

  // useEffect(() => {
  //   console.log(userFiles);
  // }, [userFiles])

  return (
    <div className='step'>
      <h1 className='step__title'>Загрузите документы</h1>
      <p className='step__description'>Разворот паспорта и страницу с пропиской, а также водительское удостоверение с двух сторон.</p>
      <div className='step__thumbnails'>
        <input type="file" id="input-files" ref={inputFiles} multiple accept="image/png, image/jpg, image/jpeg" onChange={handleFiles} />
        <div id='drop-zone' className='drop-zone__wrapper'>
          <img className='drop-zone__image' src={rectangleBig} />
          <div className='drop-zone__body'>
            <div className='drop-zone__icon'><img src={uploadCloud} /></div>
            <div className='drop-zone__description'>
              <p className='drop-zone__text'>Перетащите или <span onClick={clickOnInput}>выберите файл</span></p>
              <p className='drop-zone__reminder'>JPG, JPEG или PNG, не более 30 мб</p>
            </div>
          </div>
        </div>
      </div>
      <div className="step__footer">
        <button className="step__submit" ref={submitButton} onClick={() => changeRegStep(+1)}>Продолжить</button>
      </div>
    </div>
  )
}