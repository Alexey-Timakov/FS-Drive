import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import MainPage from './MainPage';
import MainPageReg from './MainPageReg';

export default function MainPagesWrapper() {
  const userId = useSelector((state: IState) => state?.user?.id);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {userId && <MainPageReg />}
      {!userId && <MainPage />}
    </>
  )
}