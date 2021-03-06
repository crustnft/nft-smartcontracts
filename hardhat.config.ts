import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: 'bsctestnet',
  solidity: '0.8.11',
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || '',
      accounts:
        process.env.PRIVATE_KEY_ROPSTEN !== undefined ? [process.env.PRIVATE_KEY_ROPSTEN] : []
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts:
        process.env.PRIVATE_KEY_RINKEBY !== undefined ? [process.env.PRIVATE_KEY_RINKEBY] : []
    },
    bsctestnet: {
      url: process.env.BSCTESTNET_URL || '',
      accounts:
        process.env.PRIVATE_KEY_BSCTESTNET !== undefined ? [process.env.PRIVATE_KEY_BSCTESTNET] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  }
};

export default config;
