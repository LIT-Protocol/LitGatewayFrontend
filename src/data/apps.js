import zoomLogo from '../pages/SingleAppPage/assets/zoom.png'
import gDriveLogo from '../pages/SingleAppPage/assets/googleDrive.png'
import driveBack from '../pages/SingleAppPage/assets/driveBack.png'
import signInWithGoogle from '../pages/AppsPage/assets/sign_in_with_google.png'
import shopifyBack from '../pages/SingleAppPage/assets/shopifyBack.jpg'
import gatherLogo from '../pages/SingleAppPage/assets/gather.svg'
import gatherBack from '../pages/SingleAppPage/assets/gatherBack.jpg'
import shopifyLogo from '../pages/SingleAppPage/assets/shopifyLogo.svg'
import cfLogo from '../pages/SingleAppPage/assets/cfLogo.png'
import cfBack from '../pages/SingleAppPage/assets/cfBack.jpg'
import wordpressLogo from '../pages/SingleAppPage/assets/wordpressLogo.png'

import { storeHoldingsFromLit } from '../api/users'

export const apps = [
  {
    id: 'shopify',
    title: 'Shopify',
    logo: shopifyLogo,
    tags: ['E-Commerce'],
    url: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST,
    mainBtnLabel: 'Get Early Access',
    backgroundImg: shopifyBack,
    showEmailSignup: false,
    shortDesc:
      'Provide coupons selectively on your Shopify store with blockchain requirements',
    textBlock: (
      <>
        <p>
          With this App, Shopify merchants can provide discounts and access to
          select items in their Shopify store based on token holdings and
          blockchain identity.
        </p>
        <p>
          For example, merchants can create a discount for a t-shirt that only
          the holder of a given NFT can claim or a hat that only DAO members are
          able to purchase.
        </p>
        {/*TODO: fill out instructions when deployed. These are for zoom. Only here for structure*/}
        {/*<h4>Documentation</h4>*/}
        {/*<p>*/}
        {/*  <u>Installation</u>: To install this, click the Launch button above*/}
        {/*  and connect your Zoom account.*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  <u>Usage</u>: To share meetings and webinars with other users based on*/}
        {/*  ownership of crypto assets and blockchain identity, you must grant our*/}
        {/*  Zoom app the following Zoom oAuth scopes: user:read, meeting:write,*/}
        {/*  and webinar:write. We use these scopes to grant users access to your*/}
        {/*  meetings and webinars if they meet the requirements you defined when*/}
        {/*  you shared a meeting or webinar. These will be automatically granted*/}
        {/*  when you connect your Zoom account by clicking the Launch button*/}
        {/*  above.*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  <u>Uninstallation</u>: To uninstall this, log in to your Zoom account*/}
        {/*  and and navigate to the Zoom App Marketplace. Click Manage {'>'}{' '}*/}
        {/*  Installed Apps or search for the Lit Protocol app. Click the Lit*/}
        {/*  Protocol app. Click "Uninstall".*/}
        {/*</p>*/}
      </>
    ),
    more: [],
  },
  {
    id: 'zoom',
    title: 'Zoom',
    logo: zoomLogo,
    tags: ['Productivity'],
    url: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST + '/zoom',
    mainBtnLabel: 'Coming Soon',
    githubLink: 'https://github.com/LIT-Protocol/lit-oauth',
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
        <p>
          <strong style={{ color: '#0c6edc' }}>
            NOTE: App will be live later this month pending Zoom security
            approval.
          </strong>
        </p>
        <h4>Documentation</h4>
        <p>
          <u>Installation</u>: To install this, click the Launch button above
          and connect your Zoom account.
        </p>
        <p>
          <u>Usage</u>: To share meetings and webinars with other users based on
          ownership of crypto assets and blockchain identity, you must grant our
          Zoom app the following Zoom oAuth scopes: user:read, meeting:write,
          and webinar:write. We use these scopes to grant users access to your
          meetings and webinars if they meet the requirements you defined when
          you shared a meeting or webinar. These will be automatically granted
          when you connect your Zoom account by clicking the Launch button
          above.
        </p>
        <p>
          <u>Uninstallation</u>: To uninstall this, log in to your Zoom account
          and and navigate to the Zoom App Marketplace. Click Manage {'>'}{' '}
          Installed Apps or search for the Lit Protocol app. Click the Lit
          Protocol app. Click "Uninstall".
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
    githubLink: 'https://github.com/LIT-Protocol/lit-oauth',
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
    id: 'cloudflare',
    title: 'Cloudflare Stream',
    logo: cfLogo,
    tags: ['Video', 'Live Streaming', 'Content'],
    mainBtnLabel: 'Launch',
    backgroundImg: cfBack,
    url: 'https://cf-deploy.lit-protocol.workers.dev/',
    shortDesc:
      'Embed videos and livestreams on your site gated with blockchain requirements',
    textBlock: (
      <>
        <p>
          With Lit Protocol + Cloudflare Stream, you can embed token and
          blockchain identity gated videos and livestreams, using Cloudflare for
          serverless hosting.
        </p>
        <p>
          To use this app, a free Cloudflare account and Github account are
          required.
        </p>
        <p>
          This app will deploy a Cloudflare worker to your account that will
          gate access to videos and livestreams, and serve a dashboard website
          for your internal use. The dashboard website will let you upload
          videos/livestreams and set the conditions for access.
        </p>
        <p>
          *This application is open source and built by members of the Lit
          Protocol community*
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
    btnsWithoutMargin: true,
  },
  {
    id: 'gather-town',
    title: ' Gather.Town - NFT Demo',
    logo: gatherLogo,
    url: null,
    launchClickedHandler: ({ performWithAuthSig }) => {
      return performWithAuthSig(async (authSig) => {
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
            accessControlConditions: [
              {
                contractAddress: '0x10daa9f4c0f985430fde4959adb2c791ef2ccf83',
                standardContractType: 'ERC1155',
                chain: 'ethereum',
                method: 'balanceOfBatch',
                parameters: [
                  ':userAddress,:userAddress,:userAddress,:userAddress',
                  '1,2,10003,10004',
                ],
                returnValueTest: {
                  comparator: '>',
                  value: '0',
                },
              },
            ],
            resourceId: {
              baseUrl: 'gather.town',
              path: '/app/tXVe5OYt6nHS9Ey5/lit-protocol',
              orgId: '',
              role: '',
              extraData:
                '{"chain":"ethereum","contractAddress":"0x10daa9f4c0f985430fde4959adb2c791ef2ccf83","version":2}',
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
            const resourceId = rid.resourceId
            const chain = rid.chain

            let accessControlConditions
            if (rid.accessControlConditions) {
              accessControlConditions = rid.accessControlConditions
            } else {
              accessControlConditions = [...accessControlConditionTemplate]
              accessControlConditions[0].contractAddress = rid.addr
              accessControlConditions[0].chain = chain
            }

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
        const validJwts = jwts.filter((j) => j.jwt)
        console.log('validJwts: ', validJwts)
        await storeHoldingsFromLit({
          authSig,
          resources: validJwts,
        })
        console.log('holdings stored!  now redirecting to gather.')
        const q = {
          authSig: JSON.stringify(authSig),
        }
        const redirectUrl =
          process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL +
          '/oauth/gather/callback?' +
          new URLSearchParams(q).toString() +
          '&'
        console.log('redirectUrl', redirectUrl)
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
          experience.
        </p>
        <p>
          In this Gather space, you must own one or more of the following NFT to
          enter the private lounge:
        </p>
        <p>
          <ul>
            <li>
              <a
                href={`${window.location.origin}/offers/lit-protocol-nft`}
                target={'_blank'}
                rel="noreferrer"
              >
                Lit Genesis Gate
              </a>
            </li>
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
  {
    id: 'wordpress',
    title: 'WordPress',
    logo: wordpressLogo,
    tags: ['Blogging', 'Content Creation'],
    url: 'https://github.com/LIT-Protocol/lit-wp-lit-gated',
    mainBtnLabel: 'Launch',
    backgroundImg: driveBack,
    showEmailSignup: false,
    shortDesc:
      'Protect WordPress sites and pages with blockchain-based requirements',
    textBlock: (
      <>
        <p>
          Add blockchain permissions-based access to your posts or pages in
          Wordpress. With our flexible permissions builder, you can allow access
          based on token or NFT ownership as well as other wallet attributes,
          like membership in a DAO.
        </p>
        <p>
          You can add access requirements to existing content or new content in
          your Wordpress instance.
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
]
