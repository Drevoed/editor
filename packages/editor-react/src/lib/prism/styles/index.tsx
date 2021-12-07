import { NordLightTheme, Theme } from './nord.theme'
import React from "react";

export const GlobalStyles = () => {
  return (
    <>
      <Theme />
      {/*<NordDarkTheme />*/}
      <NordLightTheme />
    </>
  )
}
