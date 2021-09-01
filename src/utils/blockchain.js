import LitJsSdk from 'lit-js-sdk'

export const shortenAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

export const getUsername = async () => {
  const { web3, account } = await LitJsSdk.connectWeb3()
  const name = await web3.lookupAddress(account)

  return name || shortenAddress(account)
}
