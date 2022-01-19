import { SigningStargateClient } from '@cosmjs/stargate';
import { mainnetConfig, testnetConfig } from './config';

export const constructTx = (addr, validatorAddr, amount) => {
    return { // updatedTx
        "msg": {
            "typeUrl": "/cosmos.staking.v1beta1.MsgDelegate",
            "value": {
                "delegatorAddress": addr,
                "validatorAddress": validatorAddr,
                "amount": {
                    "amount": amount + "000000000",
                    "denom": "ncheq"
                }
            }
        },
        "fee": {
            "amount": [
                {
                    "amount": "10000000",
                    "denom": "ncheq"
                }
            ],
            "gas": "200000"
        },
        "memo": ""
    }
}

export const signTxAndBroadcast = (tx, address, network, cb) => {
    (async () => {
        const config = network === "Testnet" ? testnetConfig : mainnetConfig
        await window.keplr && window.keplr.enable(config.CHAIN_ID);
        const offlineSigner = window.getOfflineSignerOnlyAmino && window.getOfflineSignerOnlyAmino(config.CHAIN_ID);
        const client = await SigningStargateClient.connectWithSigner(
            config.RPC_URL,
            offlineSigner,
        );
        client.signAndBroadcast(
            address,
            tx.msgs ? tx.msgs : [tx.msg],
            tx.fee,
            tx.memo,
        ).then((result) => {
            if (result && result.code !== undefined && result.code !== 0) {
                cb(result.log || result.rawLog);
            } else {
                cb(null, result);
            }
        }).catch((error) => {
            cb(error && error.message);
        });
    })();
};