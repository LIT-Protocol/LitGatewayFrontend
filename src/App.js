import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Theme } from '@consta/uikit/Theme'

import Main from './Main'

import { presetGpnDefault } from '../src/newPreset/presets/presetGpnDefault'

import { AppContextProvider } from './context/app'

function App() {
  return (
    <AppContextProvider>
      <Theme preset={presetGpnDefault}>
        <Main />
      </Theme>
    </AppContextProvider>
  )
}

export default App
