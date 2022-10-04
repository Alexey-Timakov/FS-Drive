import React, { useEffect } from "react";
import Logo from "./Logo";
import TopMenu from "./TopMenu";
import TopMenuCompact from "./TopMenuCompact";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../interfaces/UserState";
import { $api, API_URL } from "../../http";
import { IUserDataOnReload } from "../../Interfaces/IUserDataOnReload";
import { addUserInfoToStateAction } from "../../Actions/addUserInfoToStateAction";
import { addInitialLoadingData } from "../../Actions/addInitialLoadingData";
import { UserDataWithTokens } from "../../Interfaces/UserDataWithTokens";
import axios from "axios";
import { setAccessToken } from "../../services/setToken";

function Header() {
  // const userID = useSelector((state: UserState) => state?.user?.id);
  // const userAvatarLink = useSelector((state: UserState) => state?.user?.userAvatarLink);
  const isLoadedOnRefresh = useSelector((state: UserState) => state?.user?.isLoadedOnRefresh);
  const dispatch = useDispatch();

  const getUserInfo = (id: string) => {
    $api.get<IUserDataOnReload>(`${API_URL}/users/get-user-data/${id}`)
      .then(data => {
        dispatch(addUserInfoToStateAction("userAvatarLink", data.data.userAvatarLink));
        dispatch(addUserInfoToStateAction("userName", data.data.userName));
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
    <header>
      <Logo />
      <TopMenuCompact />
      <TopMenu />
    </header>
  )
}

export default Header;