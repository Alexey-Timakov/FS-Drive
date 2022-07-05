import React from "react";
import "../../images/close_cross.svg";
import "../../images/check_mail.svg";

import "../../scss/check_mail_after_reset_pass.scss";

function CheckMailAfterResetPass () {

    const hideCheckMailWindow = () => {
        document.querySelector(".check-mail__wrapper").classList.remove("active");
        document.querySelector(".check-mail__fade").classList.remove("active");
    }

    return (
        <>
        <div className="check-mail__fade">
            <div className="check-mail__wrapper">
                <div className="check-mail__close">
                    <a onClick={hideCheckMailWindow} target="_blank" aria-label="Закрыть окно восстановления пароля"><img src="./images/close_cross.svg" alt="" aria-hidden="true" title="Закрыть окно восстановления пароля"/></a>
                </div>
                <div className="check-mail__description">
                    <img src="./images/check_mail.svg" alt="Векторное изображение человека с письмом" />
                    <h1>Проверьте почту</h1>
                    <p>Мы отправили письмо на вашу почту. Пройдите по ссылке, которую мы отправили и измените пароль.</p>
                </div>
            </div>
        </div>
    </>

    )
}

export default CheckMailAfterResetPass;