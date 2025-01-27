import { encode, getContract } from "thirdweb"
import { CHAIN, CLIENT, erc721ContractAddress } from "./constant"
import { claimTo } from "thirdweb/extensions/erc721";
import { FrameValidationData } from "@coinbase/onchainkit";

export const getERC721PreparedEncodedData = async(walletAddress: string, ) => {
    const contract = getContract({
        client: CLIENT,
        chain: CHAIN,
        address: erc721ContractAddress,
    });

    const tx = claimTo({
        contract: contract,
        to: walletAddress as `0x${string}`,
        quantity: BigInt(1),
    })
    const encodedData = encode(tx)

    return encodedData;
}

export const getFarcasterAccountAddress = async(interactor: FrameValidationData['interactor']) => {

    return interactor.verified_accounts[0] ?? interactor.custody_address;

}