import zoomLogo from '../pages/SingleAppPage/assets/zoom.png'
import gDriveLogo from '../pages/SingleAppPage/assets/googleDrive.png'
import driveBack from '../pages/SingleAppPage/assets/driveBack.png'

export const apps = [
  {
    id: 'zoom',
    title: 'Zoom',
    logo: zoomLogo,
    tags: ['Productivity'],
    url: 'https://oauth-app.litgateway.com/zoom',
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
    url: 'https://oauth-app.litgateway.com/google',
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
