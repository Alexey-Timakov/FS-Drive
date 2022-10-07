import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import NoScript from '../Common/NoScript';
import Header from '../Header/Header';
import MainPage from './MainPage';
import MainPageReg from './MainPageReg';

export default function MainPagesWrapper() {
  const userId = useSelector((state: IState) => state?.user?.id);
  return (
    <>
      <Header />
      <NoScript />
      {userId && <MainPageReg />}
      {!userId && <MainPage />}
    </>
  )
}