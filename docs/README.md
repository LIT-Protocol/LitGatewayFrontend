# Lit Gateway Frontend

# Predefined access control conditions used on the frontend

## User holds more than 0.005 ETH
  
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

## Hodlgod offer

### Must hold more than 150 SLP on Eth

```
const chain = 'ethereum'
const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
const accessControlConditions = [
  {
    contractAddress: '0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25',
    standardContractType: 'ERC721',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '150'
    }
  }
]

const resourceId = {
  baseUrl: 'litgateway.com',
  path: "/offers/hodlgod",
  orgId: "",
  role: "",
  extraData: JSON.stringify({chain: 'ethereum', contractAddress: '0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25'})
}
await window.litNodeClient.saveSigningCondition({
  accessControlConditions: accessControlConditions,
  chain,
  authSig,
  resourceId
})
```

### OR Must hold more than 1000 DEC on ETH

```
const chain = 'ethereum'
const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
const accessControlConditions = [
  {
    contractAddress: '0x9393fdc77090f31c7db989390d43f454b1a6e7f3',
    standardContractType: 'ERC721',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '1000'
    }
  }
]

const resourceId = {
  baseUrl: 'litgateway.com',
  path: "/offers/hodlgod",
  orgId: "",
  role: "",
  extraData: JSON.stringify({chain: 'ethereum', contractAddress: '0x9393fdc77090f31c7db989390d43f454b1a6e7f3'})
}
await window.litNodeClient.saveSigningCondition({
  accessControlConditions: accessControlConditions,
  chain,
  authSig,
  resourceId
})
```

### OR Must hold more than 1000 DEC on BSC

```
const chain = 'bsc'
const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
const accessControlConditions = [
  {
    contractAddress: '0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a',
    standardContractType: 'ERC721',
    chain,
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '1000'
    }
  }
]

const resourceId = {
  baseUrl: 'litgateway.com',
  path: "/offers/hodlgod",
  orgId: "",
  role: "",
  extraData: JSON.stringify({chain: 'bsc', contractAddress: '0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a'})
}
await window.litNodeClient.saveSigningCondition({
  accessControlConditions: accessControlConditions,
  chain,
  authSig,
  resourceId
})
```
