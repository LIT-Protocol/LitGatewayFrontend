import LitJsSdk from 'lit-js-sdk'

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
export function humanFileSize(bytes, si = true, dp = 0) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}


export const decryptAndDownload = async ({ file, chain }) => {
  console.log('decryptAndDownload ', file)
  
  window.performWithAuthSig(async (authSig) => {
    //get the file
    const ipfsGateway = "https://ipfs.litgateway.com/ipfs/"
    const url = ipfsGateway + file.ipfsHash

    const fileAsArrayBuffer = await fetch(url, {
      method: 'GET'
    }).then(response => response.arrayBuffer())

    const { decryptedFile, metadata } = await LitJsSdk.decryptZipFileWithMetadata({
      authSig,
      file: fileAsArrayBuffer,
      litNodeClient: window.litNodeClient
    })

    LitJsSdk.downloadFile({
      filename: metadata.name,
      mimetype: metadata.type,
      data: new Uint8Array(decryptedFile)
    })
  }, { chain })
}


export const getSharingLink = (sharingItem) => {
  const host = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_HOST
  if (sharingItem.ipfsHash) {
    // item is a file
    return `${host}/files/view/${sharingItem.id}`
  } else {
    // item is a folder
    return `${host}/files/folders/${sharingItem.id}`
  }
}