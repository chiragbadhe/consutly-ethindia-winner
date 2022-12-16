import React from "react";
import { readContract } from "@wagmi/core";
import { GetHandleAbi } from "../data/abis/lens";

  const lensContractAddress = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

  const GetLensProfile = async (walletAddress: unknown) => {
    try {
      const walletToProfileId = await readContract({
        address: lensContractAddress,
        abi: GetHandleAbi,
        functionName: "defaultProfile",
        args: [walletAddress],
      });

      const profileIdToHandle = await readContract({
        address: lensContractAddress,
        abi: GetHandleAbi,
        functionName: "getHandle",
        args: [walletToProfileId],
      });
      return {profileIdToHandle, walletToProfileId}
    } catch (e) {
      return
    }
  }

export default GetLensProfile;
