import { Route, Switch } from 'react-router-dom'

import styles from '../app.module.scss'

import DiscoverPage from '../pages/DiscoverPage'
import SingleAppPage from '../pages/SingleAppPage'
import GuidePage from '../pages/GuidePage'
import SingleGuidePage from '../pages/GuidePage/SingleGuidePage'
import ViewFilePage from '../pages/ViewFilePage'
import FilesPage from '../pages/FilesPage'
import GalleryPage from '../pages/GalleryPage'
import GalleryItemPage from '../pages/GalleryPage/GalleryItemPage'
import MinterPage from '../pages/MinterPage'
// import MyLitsPage from "../pages/MinterPage/MyLitsPage";
// import LitPage from "../pages/MinterPage/LitPage";

import Navigation from '../components/Navigation'

const Routes = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <>
          <div className={styles.wrap}>
            <Route path={['/', '/discover']} exact component={DiscoverPage} />
            <Route path="/app" component={SingleAppPage} />
            <Route path="/guide" component={GuidePage} />
            <Route path="/requirement" component={SingleGuidePage} />
            <Route path="/files/view/:fileId" component={ViewFilePage} />
            <Route path="/files/folders/:folderId" component={FilesPage} />
            <Route path="/files" component={FilesPage} />
            <Route path="/gallery" exact component={GalleryPage} />
            <Route path="/gallery/:litId" exact component={GalleryItemPage} />
            <Route path="/minter" component={MinterPage} />
          </div>
        </>
      </Switch>
    </>
  )
}

export default Routes
