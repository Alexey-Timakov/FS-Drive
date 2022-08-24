import React from "react";
import { useState, useEffect } from "react";
import validator from "validator";

import "./images/arrow_left.svg";
import "./images/close_cross.svg";
import "./images/reset_password.svg";
import { UserDataToResetPass } from "../../interfaces/UserDataToResetPass";

import "./ResetPass.scss";
import { $api } from "../../http";

function ResetPass() {
  let [userMailToReset, changedUserMailToReset] = useState("");

  const resetButton: HTMLButtonElement = document.querySelector("#reset-button");

  useEffect(() => {
    if (resetButton && validator.isEmail(userMailToReset)) {
      resetButton.disabled = false;
    } else if (resetButton && !validator.isEmail(userMailToReset)) {
      resetButton.disabled = true;
    }
  })

  const hideResetPassWindow = () => {
    document.querySelector<HTMLDivElement>(".reset-window__wrapper").classList.remove("active");
    document.querySelector<HTMLDivElement>(".reset-window__fade").classList.remove("active");
  }

  const showLoginWindow = () => {
    hideResetPassWindow();
    document.querySelector<HTMLDivElement>(".login-window__wrapper").classList.add("active");
    document.querySelector<HTMLDivElement>(".login-window__fade").classList.add("active");
  }

  const showErrorMessage = () => {
    document.querySelector<HTMLParagraphElement>(".reset-window__error").classList.add("active");
  }

  const hideErrorMessage = () => {
    document.querySelector<HTMLParagraphElement>(".reset-window__error").classList.remove("active");
  }

  const resetButtonWaiting = () => {
    resetButton.innerHTML = '<i class="is-waiting"></i>';
  }

  const resetButtonStatic = () => {
    resetButton.innerHTML = "Отправить";
    resetButton.classList.remove("is-waiting");
  }

  const checkMailAfterResetShow = () => {
    hideResetPassWindow();
    document.querySelector<HTMLDivElement>(".check-mail__wrapper").classList.add("active");
    document.querySelector<HTMLDivElement>(".check-mail__fade").classList.add("active");
  }

  const userMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = event.target;
    const label: HTMLLabelElement = target.previousElementSibling as HTMLLabelElement;
    changedUserMailToReset(event.target.value);
    if (target.value != "") {
      label.classList.add("changed");
    } else {
      label.classList.remove("changed");
    }
  }

  const resetPass = (event: React.SyntheticEvent) => {
    event.preventDefault();

    hideErrorMessage();
    resetButtonWaiting();

    const body: UserDataToResetPass = {
      "userMail": userMailToReset
    };

    $api.post("users/resetpass", body)
      .then(res => {
        resetButtonStatic();
        checkMailAfterResetShow();
      })
      .catch(err => {
        resetButtonStatic();
        showErrorMessage();
        console.log(err);
      })
  };

  return (
    <>
      <div className="reset-window__fade">
        <div className="reset-window__wrapper">
          <div className="reset-window__close">
            <a onClick={showLoginWindow} target="_blank" aria-label="Назад к форме входа"><img src="./arrow_left.svg" alt="" aria-hidden="true" title="Назад к форме входа" /></a>
            <a onClick={hideResetPassWindow} target="_blank" aria-label="Закрыть окно восстановления пароля"><img src="./close_cross.svg" alt="" aria-hidden="true" title="Закрыть окно восстановления пароля" /></a>
          </div>
          <div className="reset-window__description">
            <img src="./reset_password.svg" alt="Векторное изображение человека" />
            <h1>Восстановление пароля</h1>
            <p>Мы отправим ссылку для восстановления пароля на вашу электронную почту</p>
            <p className="reset-window__error">Возникла ошибка при отправке ссылки</p>
          </div>
          <div className="reset-window__form-wrapper">
            <form id="reset-window__form" name="reset-window__form">
              <div className="block-input__wrapper">
                <label htmlFor="userMailToReset">Электронная почта</label>
                <input className="" type="text" id="userMailToReset" name="userMailToReset" value={userMailToReset} onChange={userMailChange} />
              </div>
            </form>
          </div>
          <div className="reset-window__footer">
            <button type="button" onClick={resetPass} id="reset-button" className="reset-button">Отправить</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default ResetPass;