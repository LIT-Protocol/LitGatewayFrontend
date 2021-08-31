import { BrowserRouter, Route, Switch } from 'react-router-dom'

import styles from './app.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Routes from './routing/routes'

import { Theme, presetGpnDefault } from '@consta/uikit/Theme'

import { AppContextProvider } from './context/app'

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Theme preset={presetGpnDefault}>
          <div className={styles.app}>
            <Routes />
          </div>
        </Theme>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
