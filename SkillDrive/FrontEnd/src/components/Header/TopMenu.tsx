import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { $api, API_URL } from "../../http";
import { IUserDataOnReload } from "../../Interfaces/IUserDataOnReload";
import CheckMailAfterResetPass from "../LoginAndResetPass/CheckMailAfterResetPass";
import Login from "../LoginAndResetPass/Login";
import ResetPass from "../LoginAndResetPass/ResetPass";
import { UserDataWithTokens } from "../../Interfaces/UserDataWithTokens";
import { setAccessToken } from "../../services/setToken";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfoToStateAction } from "../../Actions/addUserInfoToStateAction";
import { addInitialLoadingData } from "../../Actions/addInitialLoadingData";
import { UserState } from "../../interfaces/UserState";

function TopMenu() {
  const userID = useSelector((state: UserState) => state?.user?.id);
  const isLoadedOnRefresh = useSelector((state: UserState) => state?.user?.isLoadedOnRefresh);
  const dispatch = useDispatch();

  const showLoginWindow = () => {
    document.querySelector(".login-window__wrapper").classList.add("active");
    document.querySelector(".login-window__fade").classList.add("active");
  }

  const getUserInfo = (id: string) => {
    $api.get<IUserDataOnReload>(`${API_URL}/users/get-user-data/${id}`)
      .then(data => {
        console.log(data.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateTokens = () => {
    dispatch(addInitialLoadingData("isLoadedOnRefresh", true));

    axios.get<UserDataWithTokens>(`${API_URL}/users/refresh`, { withCredentials: true })
      .then(data => {
        setAccessToken(data.data.accessToken);
        dispatch(addUserInfoToStateAction("id", data.data.id));
        dispatch(addUserInfoToStateAction("userAvatarLink", data.data.userAvatarLink));
        getUserInfo(data.data.id);
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!isLoadedOnRefresh) {
      updateTokens();
    }
  }, [])

  return (
    <>
      <div className="menu-right">
        <nav className="menu-right__nav">
          {!userID && <div>
            <div><Link to="/about" aria-label="О нас">О нас</Link></div>
            <div><Link to="/">Условия</Link></div>
            <div><Link to="/faq" aria-label="Частые вопросы">Частые вопросы</Link></div>
          </div>}
          {userID && <div>
            <div><Link to="/about" aria-label="О нас">1</Link></div>
            <div><Link to="/">2</Link></div>
            <div><Link to="/faq" aria-label="Частые вопросы">3</Link></div>
          </div>}
        </nav>
        {!userID && <button className="menu-right__button" onClick={showLoginWindow}>Войти</button>}
        {userID && <div><img src={`${API_URL}/files/get-file`} /></div>}
      </div>
      <Login />
      <ResetPass />
      <CheckMailAfterResetPass />
    </>
  )
}

export default TopMenu;