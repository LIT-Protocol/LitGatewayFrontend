import { BrowserRouter } from 'react-router-dom'
import cx from 'classnames'

import styles from './app.module.scss'

import Routes from './routing/routes'

import { Button } from '@consta/uikit/Button'

import ScrollToTop from './ScrollToTop'

import { Icons } from './components'

import { useAppContext } from './context/app'

import useWindowDimensions from './hooks/useWindowDimensions'
import { useEffect, useState } from 'react'

const Main = () => {
  const { sideBar } = useAppContext()

  const { width } = useWindowDimensions()
  const [sideTopMeasure, setSideTopMeasure] = useState({
    top: 'calc(100vh - 300px)',
  })

  useEffect(() => {
    const height = window.innerHeight
    if (height < 640) {
      setSideTopMeasure({ top: '320px' })
    } else {
      setSideTopMeasure({ top: 'calc(100vh - 300px)' })
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={cx(styles.app, sideBar && styles.withOpenSidebar)}>
        <Routes />

        {width > 1024 || sideBar ? (
          <div className={width <= 1024 && sideBar && styles.mobileFooter}>
            <div className={styles.backgroundLogo} />

            <div style={sideTopMeasure} className={styles.linksWrapper}>
              <a
                href="https://litgateway.com/discord"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.Discord />
              </a>

              <a
                href="https://twitter.com/litprotocol"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.Twitter />
              </a>

              <a
                href="https://developer.litprotocol.com/docs/intro"
                className={styles.developerDocs}
              >
                Developer Docs <Icons.Outside />
              </a>

              <a
                href="https://airtable.com/shrghp9jsN4KtEHKK"
                target="_blank"
                rel="noreferrer"
              >
                <Button size="s" view="secondary" label="Submit Feedback" />
              </a>

              <div className={styles.privacyPolicy}>
                <a
                  target="_blank"
                  href="https://litgateway.com/LitPrivacyPolicy.html"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                <a
                  target="_blank"
                  href="https://litgateway.com/LitTermsofService.html"
                  rel="noreferrer"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </BrowserRouter>
  )
}

export default Main
