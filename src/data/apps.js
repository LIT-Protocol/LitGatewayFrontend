import zoomLogo from '../pages/SingleAppPage/assets/zoom.png'
import gDriveLogo from '../pages/SingleAppPage/assets/googleDrive.png'
import driveBack from '../pages/SingleAppPage/assets/driveBack.png'

import gatherLogo from '../pages/SingleAppPage/assets/gather.svg'
import gatherBack from '../pages/SingleAppPage/assets/gatherBack.jpg'

export const apps = [
  // {
  //   id: 'zoom',
  //   title: 'Zoom',
  //   logo: zoomLogo,
  //   tags: ['Productivity'],
  //   url: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST + '/zoom',
  //   mainBtnLabel: 'Launch',
  //   backgroundImg: driveBack,
  //   shortDesc:
  //     'Grant access to Google Drive files with blockchain requirements',
  //   textBlock: (
  //     <>
  //       <p>
  //         Create permissions based on wallet contents for your already-existing
  //         Google Drive files. Our flexible permissions builders allows you to
  //         allow access based on token or NFT ownership as well as other wallet
  //         attributes, like membership in a DAO.
  //       </p>
  //       <p>
  //         Once files are permissioned on the Lit Google Docs App, you can edit
  //         wallet parameters, view/edit access, and delete it from the app which
  //         removes that access.
  //       </p>
  //       <p>
  //         Wallets that meet the conditions will enter their email address for
  //         access.
  //       </p>
  //     </>
  //   ),
  //   more: [
  //     {
  //       title: 'Google Drive',
  //       titleIcon: gDriveLogo,
  //       id: 'google-drive',
  //       desc: 'Grant access to Google Drive files with blockchain requirements',
  //       img: driveBack,
  //     },
  //   ],
  // },
  {
    id: 'google-drive',
    title: 'Google Drive',
    logo: gDriveLogo,
    url: '/frame/google',
    tags: ['Productivity'],
    mainBtnLabel: 'Launch',
    backgroundImg: driveBack,
    shortDesc:
      'Grant access to Google Drive files with blockchain requirements',
    textBlock: (
      <>
        <p>
          Create permissions based on wallet contents for your already-existing
          Google Drive files. Our flexible permissions builders allows you to
          allow access based on token or NFT ownership as well as other wallet
          attributes, like membership in a DAO.
        </p>
        <p>
          Once files are permissioned on the Lit Google Docs App, you can edit
          wallet parameters, view/edit access, and delete it from the app which
          removes that access.
        </p>
        <p>
          Wallets that meet the conditions will enter their email address for
          access.
        </p>
        <p>
          Lit Protocol's use and transfer to any other app of information
          received from Google APIs will adhere to{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <p>Google Chrome is the recommended browser for using this app.</p>
      </>
    ),
    more: [
      // {
      //   title: 'Zoom',
      //   titleIcon: zoomLogo,
      //   id: 'zoom',
      //   desc: 'Grant access to Zoom with blockchain requirements',
      //   img: driveBack,
      // },
    ],
  },
  {
    id: 'gather-town',
    title: 'Token Gated Gather.Town',
    logo: gatherLogo,
    url: '/connectGather',
    tags: ['Social'],
    mainBtnLabel: 'Launch',
    backgroundImg: gatherBack,
    shortDesc:
      'Gather makes spending time with your communities just as easy as real life',
    textBlock: (
      <>
        <p>
          Gather makes spending time with your communities just as easy as real
          life. With this app, you can spend time with your crypto communities!
        </p>
        <p>
          Once you login, you’ll notice that there is a private VIP lounge for
          members of the following NFT communities:
        </p>
        <p>
          <ul>
            <li>Lit Genesis Gate</li>
            <li>Axie</li>
            <li>Cryptopunks</li>
            <li>Bored Ape Yacht Club</li>
            <li>Zed Run</li>
            <li>LOSTPOETS</li>
            <li>VeeFriends</li>
            <li>CyberKongz</li>
            <li>Loot</li>
            <li>Meebits</li>
            <li>Metakey</li>
          </ul>
        </p>
        <p>
          If you’d like to create a customized Gather space for your crypto
          community, please get in touch{' '}
          <a href="https://airtable.com/shrghp9jsN4KtEHKK">here</a>.
        </p>
      </>
    ),
    more: [
      // {
      //   title: 'Zoom',
      //   titleIcon: zoomLogo,
      //   id: 'zoom',
      //   desc: 'Grant access to Zoom with blockchain requirements',
      //   img: driveBack,
      // },
    ],
  },
]
