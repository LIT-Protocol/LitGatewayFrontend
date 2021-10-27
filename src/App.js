import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Theme } from '@consta/uikit/Theme'

import Main from './Main'
import ScrollToTop from './ScrollToTop'

import { presetGpnDefault } from '../src/newPreset/presets/presetGpnDefault'

import { AppContextProvider } from './context/app'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContextProvider>
        <Theme preset={presetGpnDefault}>
          <Main />
        </Theme>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
