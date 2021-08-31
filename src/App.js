import { BrowserRouter, Route, Switch } from 'react-router-dom'

import styles from './app.module.scss'

import { Theme, presetGpnDefault } from '@consta/uikit/Theme'

import DiscoverPage from './pages/DiscoverPage'
import GuidePage from './pages/GuidePage'
import SingleAppPage from './pages/SingleAppPage'
import SingleGuidePage from './pages/GuidePage/SingleGuidePage'
import FilesPage from './pages/FilesPage'
import ViewFilePage from './pages/ViewFilePage'

import SideBar from './components/SideBar'
import Header from './components/Header'

import useWindowDimensions from './hooks/useWindowDimensions'

import { AppContextProvider } from './context/app'

function App() {
  const { width } = useWindowDimensions()

  return (
    <BrowserRouter>
      <AppContextProvider>
        <Theme preset={presetGpnDefault}>
          <div className={styles.app}>
            {width < 1040 ? <Header /> : null}
            <SideBar />
            <div className={styles.wrap}>
              <Switch>
                <Route
                  path={['/', '/discover']}
                  exact
                  component={DiscoverPage}
                />
                <Route path="/app" component={SingleAppPage} />
                <Route path="/guide" component={GuidePage} />
                <Route path="/requirement" component={SingleGuidePage} />
                <Route path="/files/view/:fileId" component={ViewFilePage} />
                <Route path="/files/folders/:folderId" component={FilesPage} />
                <Route path="/files" component={FilesPage} />
              </Switch>
            </div>
          </div>
        </Theme>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
