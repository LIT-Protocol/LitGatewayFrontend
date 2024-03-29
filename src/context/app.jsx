import React, { createContext, useContext, useEffect, useState } from 'react'
import LitJsSdk from 'lit-js-sdk'

import { getUsername } from '../utils'
import { getUserHoldings, putUser } from '../api/users'

export const AppContext = createContext({
  sideBar: true,
})

export const AppContextProvider = (props) => {
  const { children } = props

  const [appIsLoaded, setAppIsLoaded] = useState(false)
  const [sideBar, setSideBar] = useState(false)
  const [authSig, setAuthSig] = useState(null)
  const [username, setUsername] = useState(null)
  const [tokenList, setTokenList] = useState(null)
  const [globalError, setGlobalError] = useState(null)
  const [userHoldings, setUserHoldings] = useState(null)
  const [eligibleOffes, setEligibleOffers] = useState(null)

  let obtainingAuthSig = false

  const performWithAuthSig = async (
    action,
    { chain, getHoldings } = { chain: 'ethereum', getHoldings: true },
  ) => {
    // only do this one at a time
    if (obtainingAuthSig) {
      return
    }
    obtainingAuthSig = true
    setGlobalError(null) // clear out any errors
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
          obtainingAuthSig = false
          return false
        } else if (e?.errorCode === 'wrong_network') {
          setGlobalError({
            title: e.message,
            details: '',
          })
          obtainingAuthSig = false
          return false
        } else {
          obtainingAuthSig = false
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

    window.gtag('config', 'G-LT17LQFBL8', {
      user_id: currentAuthSig.address,
    })
    window.gtag('set', 'user_properties', {
      wallet_address: currentAuthSig.address,
    })

    obtainingAuthSig = false
    return await action(currentAuthSig)
  }

  const handleLogout = () => {
    LitJsSdk.disconnectWeb3()
    setUsername(null)
    setAuthSig(null)
  }

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  useEffect(() => {
    const go = async () => {
      const tokens = await LitJsSdk.getTokenList()
      setTokenList(tokens)
      setAppIsLoaded(true)
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
        validateEmail,
        appIsLoaded,
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
