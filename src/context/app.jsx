import React, { useState, useEffect, useContext, createContext } from 'react'
import LitJsSdk from 'lit-js-sdk'

import { getUsername } from '../utils'
import { getUserHoldings, putUser } from '../api/users'

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
  const [userHoldings, setUserHoldings] = useState(null)
  const [eligibleOffes, setEligibleOffers] = useState(null)

  const performWithAuthSig = async (
    action,
    { chain, getHoldings } = { chain: 'ethereum', getHoldings: true },
  ) => {
    //TODO add chain selection???

    let currentAuthSig = authSig
    if (!currentAuthSig) {
      try {
        currentAuthSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        setAuthSig(currentAuthSig)
        setUsername(await getUsername())
        await putUser({ authSig: currentAuthSig })
      } catch (e) {
        console.log(e)
        if (e?.errorCode === 'no_wallet') {
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
        } else if (e?.errorCode === 'wrong_network') {
          setGlobalError({
            title: e.message,
            details: '',
          })
          return false
        } else {
          throw e
        }
      }
    }

    if (!userHoldings && getHoldings) {
      // don't wait for this, run in the background
      getUserHoldings({ authSig: currentAuthSig }).then((resp) => {
        setUserHoldings(resp.holdings)
        setEligibleOffers(resp.offerEligibilities)
      })
    }

    return await action(currentAuthSig)
  }

  const handleLogout = () => {
    localStorage.removeItem('lit-auth-signature')
    setUsername(null)
    setAuthSig(null)
  }

  useEffect(() => {
    window.performWithAuthSig = performWithAuthSig
    const go = async () => {
      const tokens = await LitJsSdk.getTokenList()
      setTokenList(tokens)
    }
    go()

    const accountsChanged = async function (accounts) {
      handleLogout()
      setUsername(await getUsername())
    }
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', accountsChanged)
      }
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
        setGlobalError,
        handleLogout,
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
