import React, { useState, useContext, createContext } from 'react'

export const AppContext = createContext({
  sideBar: true,
})

export const AppContextProvider = (props) => {
  const { children } = props

  const [sideBar, setSideBar] = useState(false)

  return (
    <AppContext.Provider
      value={{
        sideBar,
        setSideBar
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
