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
import AppsPage from '../pages/AppsPage'
import OffersPage from '../pages/OffersPage'
import TwitterClaimNftPage from '../pages/TwitterClaimNftPage/TwitterClaimNftPage'
import TwitterClaimNftStep2Page from '../pages/TwitterClaimNftStep2Page'
import SingleOfferPage from '../pages/SingleOfferPage'
import AppsPage from '../pages/AppsPage'

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
            <Redirect from="/" to="/discover" />
            <Route path="/discover" exact component={DiscoverPage} />
            <Route path="/apps/:id" exact component={SingleAppPage} />
            <Route path="/guide/:title" exact component={SingleGuidePage} />
            <Route path="/guide" exact component={GuidePage} />
            <Route path="/files/view/:fileId" component={ViewFilePage} />
            <Route path="/files/folders/:folderId" component={FilesPage} />
            <Route path="/files" exact component={FilesPage} />
            <Route path="/gallery" exact component={GalleryPage} />
            <Route path="/gallery/:litId" exact component={GalleryItemPage} />
            <Route path="/minter" component={MinterPage} />
            <Route path="/build" component={BuildPage} />
            <Route path="/apps" exact component={AppsPage} />
            <Route path="/offers" exact component={OffersPage} />
            <Route path="/twitterClaimNft" component={TwitterClaimNftPage} />
            <Route path="/offers/:title" exact component={SingleOfferPage} />
            <Route
              path="/twitterClaimNftStep2"
              component={TwitterClaimNftStep2Page}
            />
          </div>
        </>
      </Switch>
    </>
  )
}

export default Routes
