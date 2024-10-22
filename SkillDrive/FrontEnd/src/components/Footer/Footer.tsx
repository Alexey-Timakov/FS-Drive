import React from "react";

import "./Footer.scss";

import "./images/vk_vector.svg";
import "./images/inst_vector.svg";
import "./images/face_vector.svg";

function Footer () {
    return (
        <footer>
        <div className="footer__item-left">© SkillDrive Inc. 2020</div>
        <div className="footer__item-right">
            <a href="https://vk.com" target="_blank" aria-label="Ссылка на вКонтакте"><img src="./vk_vector.svg" alt="" aria-hidden="true" title="Перейти на страницу в вКонтакте"/></a>
            <a href="https://instagramm.com" target="_blank" aria-label="Ссылка на Instagramm"><img src="./inst_vector.svg" alt="" aria-hidden="true" title="Перейти на страницу в Instagramm"/></a>
            <a href="https://facebook.com" target="_blank" aria-label="Ссылка на Facebook"><img src="./face_vector.svg" alt="" aria-hidden="true" title="Перейти на страницу в Facebook"/></a>
        </div>
    </footer>
    )
}

export default Footer;