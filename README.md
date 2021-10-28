# Lit Gateway Frontend

## Predefined access control conditions

User holds more than 0.05 ETH

```
const chain = 'ethereum'
const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain,
    method: 'eth_getBalance',
    parameters: [
      ':userAddress',
      'latest'
    ],
    returnValueTest: {
      comparator: '>=',
      value: '5000000000000000'
    }
  }
]

const resourceId = {
  baseUrl: 'litgateway.com',
  path: "/offers/lit-protocol-nft",
  orgId: "",
  role: "",
  extraData: ""
}
await window.litNodeClient.saveSigningCondition({
  accessControlConditions: accessControlConditions,
  chain,
  authSig,
  resourceId
})
```
