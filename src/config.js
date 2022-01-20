export const testnetConfig = {
    RPC_URL: 'https://rpc.testnet.cheqd.network',
    REST_URL: 'https://api.testnet.cheqd.network',
    EXPLORER_URL: 'https://testnet-explorer.cheqd.io/',
    STAKING_URL: 'https://cheqd.omniflix.co/stake',
    NETWORK_NAME: 'cheqd',
    NETWORK_TYPE: 'testnet',
    CHAIN_ID: 'cheqd-testnet-3',
    CHAIN_NAME: 'Cheqd Testnet',
    COIN_DENOM: 'CHEQ',
    COIN_MINIMAL_DENOM: 'ncheq',
    COIN_DECIMALS: 9,
    PREFIX: 'cheqd',
    COIN_TYPE: 118,
    COINGECKO_ID: 'cheqd-network',
    DEFAULT_GAS: 200000,
    GAS_PRICE_STEP_LOW: 25,
    GAS_PRICE_STEP_AVERAGE: 30,
    GAS_PRICE_STEP_HIGH: 50,
    FEATURES: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
};

export const mainnetConfig = {
    RPC_URL: 'https://rpc.cheqd.net',
    REST_URL: 'https://api.cheqd.net',
    EXPLORER_URL: 'https://cheqd.didx.co.za',
    STAKING_URL: 'https://cheqd.omniflix.co/stake',
    NETWORK_NAME: 'cheqd',
    NETWORK_TYPE: 'mainnet',
    CHAIN_ID: 'cheqd-mainnet-1',
    CHAIN_NAME: 'Cheqd Mainnet',
    COIN_DENOM: 'CHEQ',
    COIN_MINIMAL_DENOM: 'ncheq',
    COIN_DECIMALS: 9,
    PREFIX: 'cheqd',
    COIN_TYPE: 118,
    COINGECKO_ID: 'cheqd-network',
    DEFAULT_GAS: 200000,
    GAS_PRICE_STEP_LOW: 25,
    GAS_PRICE_STEP_AVERAGE: 30,
    GAS_PRICE_STEP_HIGH: 50,
    FEATURES: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
};


export const testnetChainConfig = {
    "chainId": "cheqd-testnet-3",
    "chainName": "Cheqd Testnet",
    "rpc": "https://rpc.testnet.cheqd.network",
    "rest": "https://api.testnet.cheqd.network",
    "stakeCurrency": {
        "coinDenom": "CHEQ",
        "coinMinimalDenom": "ncheq",
        "coinDecimals": 9,
        "coinGeckoId": "cheqd-network"
    },
    "bip44": {
        "coinType": 118
    },
    "bech32Config": {
        "bech32PrefixAccAddr": "cheqd",
        "bech32PrefixAccPub": "cheqdpub",
        "bech32PrefixValAddr": "cheqdvaloper",
        "bech32PrefixValPub": "cheqdvaloperpub",
        "bech32PrefixConsAddr": "cheqdvalcons",
        "bech32PrefixConsPub": "cheqdvalconspub"
    },
    "currencies": [
        {
            "coinDenom": "CHEQ",
            "coinMinimalDenom": "ncheq",
            "coinDecimals": 9,
            "coinGeckoId": "cheqd-network"
        }
    ],
    "feeCurrencies": [
        {
            "coinDenom": "CHEQ",
            "coinMinimalDenom": "ncheq",
            "coinDecimals": 9,
            "coinGeckoId": "cheqd-network"
        }
    ],
    "coinType": 118,
    "gasPriceStep": {
        "low": 25,
        "average": 30,
        "high": 50
    },
    "features": [
        "stargate",
        "ibc-transfer",
        "no-legacy-stdTx",
        "ibc-go"
    ],
    "walletUrlForStaking": "https://cheqd.omniflix.co/stake"
}



export const mainnetChainConfig = {
    "chainId": "cheqd-mainnet-1",
    "chainName": "Cheqd",
    "rpc": "https://rpc.cheqd.net",
    "rest": "https://api.cheqd.net",
    "stakeCurrency": {
        "coinDenom": "CHEQ",
        "coinMinimalDenom": "ncheq",
        "coinDecimals": 9,
        "coinGeckoId": "cheqd-network"
    },
    "bip44": {
        "coinType": 118
    },
    "bech32Config": {
        "bech32PrefixAccAddr": "cheqd",
        "bech32PrefixAccPub": "cheqdpub",
        "bech32PrefixValAddr": "cheqdvaloper",
        "bech32PrefixValPub": "cheqdvaloperpub",
        "bech32PrefixConsAddr": "cheqdvalcons",
        "bech32PrefixConsPub": "cheqdvalconspub"
    },
    "currencies": [
        {
            "coinDenom": "CHEQ",
            "coinMinimalDenom": "ncheq",
            "coinDecimals": 9,
            "coinGeckoId": "cheqd-network"
        }
    ],
    "feeCurrencies": [
        {
            "coinDenom": "CHEQ",
            "coinMinimalDenom": "ncheq",
            "coinDecimals": 9,
            "coinGeckoId": "cheqd-network"
        }
    ],
    "coinType": 118,
    "gasPriceStep": {
        "low": 25,
        "average": 30,
        "high": 50
    },
    "features": [
        "stargate",
        "ibc-transfer",
        "no-legacy-stdTx",
        "ibc-go"
    ],
    "walletUrlForStaking": "https://cheqd.omniflix.co/stake"
}
