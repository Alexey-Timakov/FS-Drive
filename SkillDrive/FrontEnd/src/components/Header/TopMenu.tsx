import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { $api, API_URL } from "../../http";
import { setAccessToken } from "../../services/setToken";
import { addUserInfoToStateAction } from "../../Actions/addUserInfoToStateAction";
import { addInitialLoadingData } from "../../Actions/addInitialLoadingData";

import Login from "../LoginAndResetPass/Login";
import ResetPass from "../LoginAndResetPass/ResetPass";
import CheckMailAfterResetPass from "../LoginAndResetPass/CheckMailAfterResetPass";
import defaultAvatar from "./images/default-user.jpg";
// import { IUserDataOnReload } from "../../Interfaces/IUserDataOnReload";
// import { UserDataWithTokens } from "../../Interfaces/UserDataWithTokens";
import { UserState } from "../../interfaces/UserState";

function TopMenu() {
  const userID = useSelector((state: UserState) => state?.user?.id);
  const userAvatarLink = useSelector((state: UserState) => state?.user?.userAvatarLink);
  // const isLoadedOnRefresh = useSelector((state: UserState) => state?.user?.isLoadedOnRefresh);
  // const dispatch = useDispatch();

  const showLoginWindow = () => {
    document.querySelector(".login-window__wrapper").classList.add("active");
    document.querySelector(".login-window__fade").classList.add("active");
  }

  // const getUserInfo = (id: string) => {
  //   $api.get<IUserDataOnReload>(`${API_URL}/users/get-user-data/${id}`)
  //     .then(data => {
  //       dispatch(addUserInfoToStateAction("userAvatarLink", data.data.userAvatarLink));
  //       console.log(data.data);
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // const updateTokens = () => {
  //   dispatch(addInitialLoadingData("isLoadedOnRefresh", true));

  //   axios.get<UserDataWithTokens>(`${API_URL}/users/refresh`, { withCredentials: true })
  //     .then(data => {
  //       setAccessToken(data.data.accessToken);
  //       dispatch(addUserInfoToStateAction("id", data.data.id));
  //       getUserInfo(data.data.id);
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // useEffect(() => {
  //   if (!isLoadedOnRefresh) {
  //     updateTokens();
  //   }
  // }, [])

  return (
    <>
      <div className="menu-right">
        {!userID && <nav className="menu-right__nav">
          <div><Link to="/about" aria-label="О нас">О нас</Link></div>
          <div><Link to="/" aria-label="Условия">Условия</Link></div>
          <div><Link to="/faq" aria-label="Частые вопросы">Частые вопросы</Link></div>
        </nav>}
        {userID && <nav className="menu-right__nav">
          <div><Link to="" aria-label="Бронирования">Бронирования</Link></div>
          <div><Link to="" aria-label="Мои автомобили">Мои автомобили</Link></div>
          <div><Link to="" aria-label="Сообщения">Сообщения</Link></div>
        </nav>}
        {!userID && <button className="menu-right__button" onClick={showLoginWindow}>Войти</button>}
        {userID && userAvatarLink && <div className="menu-right__avatar"><img src={`${API_URL}/${userAvatarLink}`} /></div>}
        {userID && !userAvatarLink && <div className="menu-right__avatar"><img src={defaultAvatar} /></div>}
      </div>
      <Login />
      <ResetPass />
      <CheckMailAfterResetPass />
    </>
  )
}

export default TopMenu;