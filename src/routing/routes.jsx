import { Route, Switch, Redirect } from 'react-router-dom'

import styles from '../app.module.scss'

import { Informer } from '@consta/uikit/Informer'

import DiscoverPage from '../pages/DiscoverPage'
import SingleAppPage from '../pages/SingleAppPage'
import GuidePage from '../pages/GuidePage'
import SingleGuidePage from '../pages/GuidePage/SingleGuidePage'
import ViewFilePage from '../pages/ViewFilePage'
import FilesPage from '../pages/FilesPage'
import GalleryPage from '../pages/GalleryPage'
import GalleryItemPage from '../pages/GalleryPage/GalleryItemPage'
import MinterPage from '../pages/MinterPage'
import BuildPage from '../pages/BuildPage'
import OffersPage from '../pages/OffersPage'
import TwitterClaimNftStep2Page from '../pages/TwitterClaimNftStep2Page'
import SingleOfferPage from '../pages/SingleOfferPage'
import AppsPage from '../pages/AppsPage'
import AboutPage from '../pages/AboutPage'
import FramePage from '../pages/FramePage'
import CryptoArcadeGatherPage from '../pages/CryptoArcadeGatherPage/CryptoArcadeGatherPage'

import Navigation from '../components/Navigation'

import { useAppContext } from '../context/app'

const Routes = () => {
  const { globalError } = useAppContext()

  return (
    <>
      <Navigation />
      <Switch>
        <>
          <div id="appWrap" className={styles.wrap}>
            {globalError ? (
              <div className={styles.globalError}>
                <div style={{ height: 24 }} />
                <Informer
                  status="alert"
                  view="filled"
                  title={globalError.title}
                  label={globalError.details}
                />
              </div>
            ) : null}
            <Route exact path="/" render={() => <Redirect to="/discover" />} />
            <Route path="/discover" exact component={DiscoverPage} />
            <Route path="/apps/:id" exact component={SingleAppPage} />
            <Route path="/guide/:title" exact component={SingleGuidePage} />
            <Route path="/guide" exact component={GuidePage} />
            <Route path="/files/view/:fileId" exact component={ViewFilePage} />
            <Route path="/files/folders/:folderId" component={FilesPage} />
            <Route path="/files" exact component={FilesPage} />
            <Route path="/gallery" exact component={GalleryPage} />
            <Route path="/gallery/:litId" exact component={GalleryItemPage} />
            <Route path="/minter" component={MinterPage} />
            <Route path="/build" component={BuildPage} />
            <Route path="/apps" exact component={AppsPage} />
            <Route path="/offers" exact component={OffersPage} />
            <Route path="/offers/:title" exact component={SingleOfferPage} />
            <Route path="/frame/:frameType" exact component={FramePage} />
            <Route
              path="/twitterClaimNftStep2"
              component={TwitterClaimNftStep2Page}
            />
            <Route path="/about" exact component={AboutPage} />
            <Route
              path="/discord"
              component={() => {
                window.location.href = 'https://discord.gg/nm9aBG8z9w'
                return null
              }}
            />
            <Route
              path="/cryptoarcade"
              exact
              component={CryptoArcadeGatherPage}
            />
            <Route
              path="/calendar"
              component={() => {
                window.location.href =
                  'https://calendar.google.com/calendar/u/5?cid=Y19hMnVxZDNjaHVqZ2Q0a3FqbGlvcDdxY2JhMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t'
                return null
              }}
            />
          </div>
        </>
      </Switch>
    </>
  )
}

export default Routes
