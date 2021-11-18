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
    btnsWithoutMargin: true,
  },
  {
    id: 'gather-town',
    title: ' Gather.Town - NFT Demo',
    logo: gatherLogo,
    url: null,
    launchClickedHandler: ({ performWithAuthSig }) => {
      performWithAuthSig(async (authSig) => {
        // check if they are eligible
        const accessControlConditionTemplate = [
          {
            contractAddress: '',
            standardContractType: 'ERC721',
            chain: 'ethereum',
            method: 'balanceOf',
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: '>',
              value: '0',
            },
          },
        ]

        const resourceIds = [
          {
            addr: '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xb7f7f6c52f2e2fdb1963eab30438024864c313f6',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xb7f7f6c52f2e2fdb1963eab30438024864c313f6"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xff488fd296c38a24cccc60b43dd7254810dab64e',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xff488fd296c38a24cccc60b43dd7254810dab64e"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0x4b3406a41399c7FD2BA65cbC93697Ad9E7eA61e5',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0x4b3406a41399c7FD2BA65cbC93697Ad9E7eA61e5"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0x57a204aa1042f6e66dd7730813f4024114d74f37',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0x57a204aa1042f6e66dd7730813f4024114d74f37"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0x7EA3Cca10668B8346aeC0bf1844A49e995527c8B',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0x7EA3Cca10668B8346aeC0bf1844A49e995527c8B"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0x10daa9f4c0f985430fde4959adb2c791ef2ccf83',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0x10daa9f4c0f985430fde4959adb2c791ef2ccf83"}',
            },
            chain: 'ethereum',
          },
          {
            addr: '0xA3D109E28589D2AbC15991B57Ce5ca461Ad8e026',
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"polygon","contractAddress":"0xA3D109E28589D2AbC15991B57Ce5ca461Ad8e026"}',
            },
            chain: 'polygon',
          },
        ]
        const jwts = await Promise.all(
          resourceIds.map(async (rid) => {
            const accessControlConditions = [...accessControlConditionTemplate]
            accessControlConditions[0].contractAddress = rid.addr
            const resourceId = rid.resourceId
            const chain = rid.chain
            accessControlConditions[0].chain = chain
            try {
              const jwt = await window.litNodeClient.getSignedToken({
                accessControlConditions,
                chain,
                authSig,
                resourceId,
              })
              return { rid, jwt }
            } catch (e) {
              return { rid, error: e }
            }
          }),
        )
        console.log('jwts: ', jwts)
        const q = {
          authSig: JSON.stringify(authSig),
        }
        const redirectUrl =
          process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL +
          '/oauth/gather/callback?' +
          new URLSearchParams(q).toString() +
          '&'
        console.log('redirectUrl', redirectUrl)
        // window.location = `https://gather.town/getPublicId?redirectTo=${encodeURIComponent(
        // redirectUrl,
        // )}`
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
