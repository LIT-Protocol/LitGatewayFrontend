import React from 'react'

import MinterHeader from "../MinterHeader";
import Header from "../Header"
import SideBar from "../SideBar"

import { useAppContext } from '../../context/app'

import useWindowDimensions from "../../hooks/useWindowDimensions";

const Navigation = () => {

  const { width } = useWindowDimensions();

  const {
    minterHeader
  } = useAppContext()

  return (
    <>
      {minterHeader? (
        <MinterHeader />
      ): null}
      {!minterHeader? (
        <>
          {width < 1040 ? <Header /> : null}
          <SideBar />
        </>
      ): null}
    </>
  )
}

export default Navigation