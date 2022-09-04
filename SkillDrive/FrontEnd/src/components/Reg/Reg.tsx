import React, { useState } from "react";

import Header from "../Header/Header";
import NoScript from "../Common/NoScript";
import RegStep1 from "./RegStep1";

import RegStep2 from "./RegStep2";

import "./Reg.scss";
import RegStep3 from "./RegStep3";

function Reg() {
  const [errorBarIsActive, setErrorBarIsActive] = useState(false);
  const [regStepNumber, setRegStepNumber] = useState<number>(3);
  const [errorNumber, setErrorNumber] = useState<number>(0);

  const errors: string[] = [
    "Не удалось продолжить регистрацию. Попробуйте ещё раз.",
    "Не удалось загрузить фото."
  ]
  const toggleErrorBar = (isError: boolean, errorNumber: number): void => {
    setErrorNumber(errorNumber);
    setErrorBarIsActive(isError);
  }

  const changeRegStep = (increment: number): void => {
    if (regStepNumber > 0) setRegStepNumber(regStepNumber + increment)
  }

  return (
    <>
      <Header />
      <NoScript />
      <div className={`reg__form-error ${errorBarIsActive ? "is-active" : ""}`}>{errors[errorNumber]}</div>
      <div className="reg__step-number">Шаг {regStepNumber} из 3</div>
      {regStepNumber !== 1 && <div className="reg__back-button" onClick={() => changeRegStep(-1)}>
        <i className="arrow-left"></i>Назад
      </div>}
      {regStepNumber === 1 && <RegStep1 changeRegStep={changeRegStep} toggleErrorBar={toggleErrorBar} />}
      {regStepNumber === 2 && <RegStep2 changeRegStep={changeRegStep} toggleErrorBar={toggleErrorBar} />}
      {regStepNumber === 3 && <RegStep3 changeRegStep={changeRegStep} toggleErrorBar={toggleErrorBar} />}
    </>
  )
}

export default Reg;