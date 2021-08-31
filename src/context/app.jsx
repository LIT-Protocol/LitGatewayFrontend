import React, { useState, useEffect, useContext, createContext } from 'react'
import LitJsSdk from 'lit-js-sdk'

export const AppContext = createContext({
  sideBar: true,
})

export const AppContextProvider = (props) => {
  const { children } = props

  const [sideBar, setSideBar] = useState(false)
  const [authSig, setAuthSig] = useState(null)

  const performWithAuthSig = async (
    action,
    { chain } = { chain: 'ethereum' },
  ) => {
    //TODO add chain selection???

    let currentAuthSig = authSig
    if (!currentAuthSig) {
      currentAuthSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
      setAuthSig(currentAuthSig)
    }

    return await action(currentAuthSig)
  }

  useEffect(() => {
    window.performWithAuthSig = performWithAuthSig
  }, [])

  return (
    <AppContext.Provider
      value={{
        sideBar,
        setSideBar,
        authSig,
        performWithAuthSig,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}
