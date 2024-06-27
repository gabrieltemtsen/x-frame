import { CoinbaseKit } from "@/classes/CoinbaseKits";
import { erc721ContractAddress } from "@/utils/constant";
import { erc721ContractABI } from "@/utils/erc721ContractABI";
import { getERC721PreparedEncodedData, getFarcasterAccountAddress } from "@/utils/tx-frame";
import { FrameRequest } from "@coinbase/onchainkit";
import { get } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    const {isValid, message} = await CoinbaseKit.validateMessage(req.body as FrameRequest) ;

    if(!isValid || !message) {
        return res.status(400).json({error: "Invalid message"});
    }

    const accountAddress = await getFarcasterAccountAddress(message.interactor);

    const data = await getERC721PreparedEncodedData(accountAddress);
    return res.status(200).json({
        chainId: "eip155:8453",
        method: "eth_sendTransaction",
        params: {
            abi: erc721ContractABI,
            to: erc721ContractAddress,
            data: data,
            value: 1,
        }
    })
}
