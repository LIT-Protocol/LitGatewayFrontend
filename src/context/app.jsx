import React, { useState, useContext, createContext } from 'react'

export const AppContext = createContext({
  sideBar: true,
  minterHeader: false
})

export const AppContextProvider = (props) => {
  const { children } = props

  const [sideBar, setSideBar] = useState(false)

  const [minterHeader, setMinterHeader] = useState(false)

  return (
    <AppContext.Provider
      value={{
        sideBar,
        setSideBar,
        minterHeader,
        setMinterHeader
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
