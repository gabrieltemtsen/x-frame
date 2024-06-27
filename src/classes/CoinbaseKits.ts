import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";

export class CoinbaseKit {
    public static validateMessage = async (body: FrameRequest) => {
        const {isValid, message} = await getFrameMessage(body, {
            neynarApiKey: process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
            allowFramegear: true, 
        });

        return {isValid, message};
    }
}