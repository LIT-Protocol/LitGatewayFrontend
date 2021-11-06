import LitJsSdk from 'lit-js-sdk'

export const shortenAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

export const getUsername = async (address) => {
  const { web3, account } = await LitJsSdk.connectWeb3()

  window.ethAddress = account
  window.FS.identify(account)

  let name
  try {
    name = await web3.lookupAddress(address || account)
  } catch (e) {
    console.log(e)
    console.log('error getting username.  user is probably not on ETH network.')
  }

  //return name || shortenAddress(address || account)
  return name || address || account
}
