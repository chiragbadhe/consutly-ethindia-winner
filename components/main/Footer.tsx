import React, { useState } from "react";
import Image from "next/image";

import logoMain from "../../public/images/logoMain.svg";

import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import StopScreenShareOutlinedIcon from "@mui/icons-material/StopScreenShareOutlined";

import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

function Footer({ handleJoin, camera, mic, leaveRoom, screenShare }: any) {
  return (
    <main className="border-white/20">
      <div className="container pt-[15px] pb-[20px] flex   justify-between items-center">
        <div className=" flex items-center space-x-[25px] justify-between w-full ">
          <div className="flex items-center px-[20px] py-[12px] rounded-lg bg-[#2B2D2E] space-x-[12px]">
            <span className="border-r border-white/20 pr-[15px]">
              hdu...fhnf
            </span>
            <img src={logoMain} className="h-[20px] w-[20px]" alt="" />
          </div>

          <div className="space-x-[15px]">
            <button
              onClick={() => handleJoin()}
              className="bg-[#2B2D2E] p-[12px] rounded-lg"
            >
              Join
            </button>

            <button
              className={`p-[12px] rounded-lg ${
                camera.webcamState ? `bg-[#2B2D2E]` : `bg-red-500`
              }`}
              onClick={
                camera.webcamState ? camera.disableWebcam : camera.enableWebcam
              }
            >
              {camera.webcamState ? <VideocamIcon /> : <VideocamOffIcon />}
            </button>

            <button
              className={`p-[12px] rounded-lg ${
                mic.micState ? `bg-[#2B2D2E]` : `bg-red-500`
              }`}
              onClick={mic.micState ? mic.disableMic : mic.enableMic}
            >
              {mic.micState ? <MicNoneOutlinedIcon /> : <MicOffOutlinedIcon />}
            </button>

            <button
              className={`p-[12px] rounded-lg ${
                screenShare.screenshareState ? `bg-[#2B2D2E]` : `bg-red-500`
              }`}
              onClick={
                screenShare.screenshareState
                  ? screenShare.stopScreenshare
                  : screenShare.startScreenshare
              }
            >
              {screenShare.screenshareState ? (
                <ScreenShareOutlinedIcon />
              ) : (
                <StopScreenShareOutlinedIcon />
              )}
            </button>

            <button className="bg-[#2B2D2E] p-[12px] rounded-lg">...</button>
          </div>

          <div>
            <button
              onClick={() => leaveRoom()}
              className="bg-red-400 hover:bg-red-500 px-[25px] py-[12px] rounded-lg"
            >
              Leave Meet
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Footer;
