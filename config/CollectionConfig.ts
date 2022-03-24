const CollectionConfig = {
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'CPSmartcontract',
  tokenName: 'Token Name',
  tokenSymbol: 'CRU',
  hiddenMetadataUri: 'ipfs://__CID__/hidden.json',
  maxSupply: 10000,
  whitelistSale: {
    price: 0.05,
    maxMintAmountPerTx: 1
  },
  preSale: {
    price: 0.07,
    maxMintAmountPerTx: 2
  },
  publicSale: {
    price: 0.09,
    maxMintAmountPerTx: 5
  },
  contractAddress: null,
  marketplaceIdentifier: 'my-nft-token'
};

export default CollectionConfig;
