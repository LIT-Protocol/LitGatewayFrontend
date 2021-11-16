import zoomLogo from '../pages/SingleAppPage/assets/zoom.png'
import gDriveLogo from '../pages/SingleAppPage/assets/googleDrive.png'
import driveBack from '../pages/SingleAppPage/assets/driveBack.png'
import signInWithGoogle from '../pages/AppsPage/assets/sign_in_with_google.png'

import gatherLogo from '../pages/SingleAppPage/assets/gather.svg'
import gatherBack from '../pages/SingleAppPage/assets/gatherBack.jpg'

export const apps = [
  {
    id: 'zoom',
    title: 'Zoom',
    logo: zoomLogo,
    tags: ['Productivity'],
    url: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST + '/zoom',
    mainBtnLabel: 'Launch',
    backgroundImg: driveBack,
    shortDesc:
      'Grant access to Zoom meetings and webinars with blockchain requirements',
    textBlock: (
      <>
        <p>
          Create permissions based Zoom meetings and webinars based on ownership
          of crypto assets and blockchain identity.
        </p>
        <p>
          Connect your account and use the Lit Protocol permissions builder to
          allow access to Zoom meetings based on token or NFT ownership as well
          as other wallet attributes, like membership in a DAO.
        </p>
      </>
    ),
    more: [
      {
        title: 'Google Drive',
        titleIcon: gDriveLogo,
        id: 'google-drive',
        desc: 'Grant access to Google Drive files with blockchain requirements',
        img: driveBack,
      },
    ],
  },
  {
    id: 'google-drive',
    title: 'Google Drive',
    logo: gDriveLogo,
    url: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST + '/google',
    tags: ['Productivity'],
    mainBtnLabel: 'Launch',
    backgroundImg: driveBack,
    mainBtnImage: signInWithGoogle,
    shortDesc:
      'Grant access to Google Drive files with blockchain requirements',
    textBlock: (
      <>
        <p>
          Added token and blockchain identity access control to your Google
          Drive files.
        </p>
        <p>
          Connect your Google account and use the Lit Protocol permissions
          builder to allow read, write, or edit access to your Google Drive
          folders, files, sheets, and more.
        </p>
        <p>
          This app requirements minimal permissions. Lit Protocol's use and
          transfer to any other app of information received from Google APIs
          will adhere to{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <p>Google Chrome is the recommended browser for using this app.</p>
      </>
    ),
    more: [
      {
        title: 'Zoom',
        titleIcon: zoomLogo,
        id: 'zoom',
        desc: 'Grant access to Zoom with blockchain requirements',
        img: driveBack,
      },
    ],
  },
  {
    id: 'gather-town',
    title: ' Gather.Town - NFT Demo',
    logo: gatherLogo,
    url: null,
    launchClickedHandler: ({ performWithAuthSig }) => {
      performWithAuthSig((authSig) => {
        const q = {
          authSig: JSON.stringify(authSig),
        }
        const redirectUrl =
          process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL +
          '/oauth/gather/callback?' +
          new URLSearchParams(q).toString() +
          '&'
        // console.log('redirectUrl', redirectUrl)
        window.location = `https://gather.town/getPublicId?redirectTo=${encodeURIComponent(
          redirectUrl,
        )}`
      })
    },
    tags: ['Social'],
    mainBtnLabel: 'Launch',
    backgroundImg: gatherBack,
    shortDesc: 'Try token gated Gather and sign up to create your own',
    textBlock: (
      <>
        <p>
          Gather makes spending time with your communities just as easy as real
          life. With this app, you can demo the Gather x Lit Protocol
          experience. If you’d like to create a customized Gather space for your
          crypto community, please get in touch{' '}
          <a href="https://airtable.com/shrF5AFku12YbLP0n">here</a>.
        </p>
        <p>
          In this Gather space, you must own one or more of the following NFT to
          enter the private lounge:
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
          <a href="https://airtable.com/shrF5AFku12YbLP0n">here</a>.
        </p>
      </>
    ),
    more: [
      {
        title: 'Zoom',
        titleIcon: zoomLogo,
        id: 'zoom',
        desc: 'Grant access to Zoom with blockchain requirements',
        img: driveBack,
      },
    ],
  },
]
