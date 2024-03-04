import {mnemonicToPrivateKey} from "ton-crypto";
import {TonClient, WalletContractV4, fromNano} from "ton"
import dotenv from 'dotenv'; 
import { getHttpEndpoint } from "@orbs-network/ton-access";
dotenv.config();

const mnemonic: string[] | undefined= process.env.MNEMONIC?.split(" ");

const main = async () => {
    const keyPair = await mnemonicToPrivateKey(mnemonic!);
    const wallet = WalletContractV4.create({publicKey: keyPair.publicKey, workchain: 0});
    

    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint})

    console.log(fromNano(await client.getBalance(wallet.address)));
}


main().catch(
    e => {console.error(e)}
)