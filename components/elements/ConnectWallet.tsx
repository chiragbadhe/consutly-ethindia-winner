import { ConnectKitButton } from "connectkit";

import GetLensProfile from "../../lib/GetLensProfile";

import { useAccount } from "wagmi";

import CustomAvatar from "../elements/CustomAvatar";

export const ConnectWallet = () => {
  const getHandle = async () => {
    const handle = await GetLensProfile(address);
    console.log(handle ? handle : "No handle Found");
  };

  const { address } = useAccount();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <div className="flex items-center space-x-[10px] bg-[#396AF4] hover:bg-[#255AEF] duration-300 cursor-pointer rounded-xl px-[15px] py-[6px] rounded-md border border-white/20" onClick={show}>
            <div>
              <CustomAvatar size={28} radius={28} />
            </div>
            <div>
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </div>{" "}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
