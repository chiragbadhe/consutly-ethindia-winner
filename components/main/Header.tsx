import React from "react";
import Image from "next/image";

import logoMain from "../../public/images/logoMain.svg";
import { ConnectWallet } from "../elements/ConnectWallet";
import { useHuddleStore } from "@huddle01/huddle01-client/store";

function Header() {

  const roomState = useHuddleStore((state) => state.roomState);

  // console.log(roomState.createdAt)

  // console.log((Date.now() - roomState.createdAt) / 6000)

  return (
    <main className="border-b border-white/20">
      <div className="container min-w-[1350px] py-[20px] flex  justify-between items-center">
        <div className=" flex items-center space-x-[25px] ">
          <div className="border-r border-white/20 pr-[25px]">
            <Image
              className="h-[40px] w-[40px]"
              src={logoMain}
              alt="main logo"
            ></Image>
          </div>
          <div className="flex space-x-[30px] items-center">
            <p className="text-[20px] font-light leading-[10px] tracking-wide">
              Video Meet | Web Discussion
            </p>
            <p className="bg-[#2B2D2E] px-[10px] py-[5px] rounded-[5px]">
              01 : 02 : 00
            </p>
          </div>
        </div>
        <div>
          {/* <ConnectKitButton showBalance={true} /> */}
          <ConnectWallet />
        </div>
      </div>
    </main>
  );
}

export default Header;
