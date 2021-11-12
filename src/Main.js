import { BrowserRouter } from 'react-router-dom'
import cx from 'classnames'

import styles from './app.module.scss'

import Routes from './routing/routes'

import { Button } from '@consta/uikit/Button'

import ScrollToTop from './ScrollToTop'

import { Icons } from './components'

import { useAppContext } from './context/app'

import useWindowDimensions from './hooks/useWindowDimensions'

const Main = () => {
  const { sideBar } = useAppContext()

  const { width } = useWindowDimensions()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={cx(styles.app, sideBar && styles.withOpenSidebar)}>
        <Routes />

        {width > 1024 || sideBar ? (
          <div className={width <= 1024 && sideBar && styles.mobileFooter}>
            <div className={styles.backgroundLogo} />

            <div className={styles.linksWrapper}>
              <a href="https://litgateway.com/discord" target="_blank">
                <Icons.Discord />
              </a>

              <a href="https://twitter.com/litprotocol" target="_blank">
                <Icons.Twitter />
              </a>

              <a
                href="https://developer.litprotocol.com/docs/intro"
                className={styles.developerDocs}
              >
                Developer Docs <Icons.Outside />
              </a>

              <a href="https://airtable.com/shrghp9jsN4KtEHKK" target="_blank">
                <Button size="s" view="secondary" label="Submit Feedback" />
              </a>

              <a
                className={styles.privacyPolicy}
                href="https://litgateway.com/LitPrivacyPolicy.html"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </BrowserRouter>
  )
}

export default Main
