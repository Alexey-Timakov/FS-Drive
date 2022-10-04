import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

import { $api, API_URL } from "../../http";

import Login from "../LoginAndResetPass/Login";
import ResetPass from "../LoginAndResetPass/ResetPass";
import CheckMailAfterResetPass from "../LoginAndResetPass/CheckMailAfterResetPass";
import defaultAvatar from "./images/default-user.jpg";
import { UserState } from "../../interfaces/UserState";

function TopMenu() {
  const location = useLocation();

  const userID = useSelector((state: UserState) => state?.user?.id);
  const userAvatarLink = useSelector((state: UserState) => state?.user?.userAvatarLink);
  const showLoginWindow = () => {
    document.querySelector(".login-window__wrapper").classList.add("active");
    document.querySelector(".login-window__fade").classList.add("active");
  }

  return (
    <>
      <div className="menu-right">
        {(!userID || location.pathname === "/Reg") && <nav className="menu-right__nav">
          <div><Link to="/about" aria-label="О нас">О нас</Link></div>
          <div><Link to="/" aria-label="Условия">Условия</Link></div>
          <div><Link to="/faq" aria-label="Частые вопросы">Частые вопросы</Link></div>
        </nav>}
        {userID && location.pathname !== "/Reg" && <nav className="menu-right__nav">
          <div><Link to="" aria-label="Бронирования">Бронирования</Link></div>
          <div><Link to="" aria-label="Мои автомобили">Мои автомобили</Link></div>
          <div><Link to="" aria-label="Сообщения">Сообщения</Link></div>
        </nav>}
        {(!userID || location.pathname === "/Reg") && <button className="menu-right__button" onClick={showLoginWindow}>Войти</button>}
        {userID && location.pathname !== "/Reg" && userAvatarLink && <div className="menu-right__avatar"><img src={`${API_URL}/${userAvatarLink}`} /></div>}
        {userID && location.pathname !== "/Reg" && !userAvatarLink && <div className="menu-right__avatar"><img src={defaultAvatar} /></div>}
      </div>
      <Login />
      <ResetPass />
      <CheckMailAfterResetPass />
    </>
  )
}

export default TopMenu;