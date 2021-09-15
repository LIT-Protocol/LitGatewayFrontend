import React, { useState, useEffect, useContext, createContext } from 'react'
import LitJsSdk from 'lit-js-sdk'

import { getUsername } from '../utils'

export const AppContext = createContext({
  sideBar: true,
})

export const AppContextProvider = (props) => {
  const { children } = props

  const [sideBar, setSideBar] = useState(false)
  const [authSig, setAuthSig] = useState(null)
  const [username, setUsername] = useState(null)
  const [tokenList, setTokenList] = useState(null)
  const [globalError, setGlobalError] = useState(null)

  const performWithAuthSig = async (
    action,
    { chain } = { chain: 'ethereum' },
  ) => {
    //TODO add chain selection???

    let currentAuthSig = authSig
    if (!currentAuthSig) {
      try {
        currentAuthSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        setAuthSig(currentAuthSig)

        setUsername(await getUsername())
      } catch (e) {
        console.log(e)
        if (e.errorCode === 'no_wallet') {
          setGlobalError({
            title: 'You need a wallet to use Lit Gateway',
            details: (
              <>
                Get one at{' '}
                <a href="https://metamask.io" target="_blank">
                  metamask.io
                </a>
              </>
            ),
          })
          return false
        } else {
          throw e
        }
      }
    }

    return await action(currentAuthSig)
  }

  useEffect(() => {
    window.performWithAuthSig = performWithAuthSig
    const go = async () => {
      const tokens = await LitJsSdk.getTokenList()
      setTokenList(tokens)
    }
    go()

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async function (accounts) {
        setUsername(await getUsername())
      })
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        sideBar,
        setSideBar,
        authSig,
        performWithAuthSig,
        username,
        tokenList,
        globalError,
        setUsername,
        setAuthSig,
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
