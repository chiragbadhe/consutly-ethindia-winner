import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import HuddleClient, { emitter, HuddleTypes } from "huddle01-client";

import React, { useState } from "react";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "../../components/elements/PeerVideoAudioElem";
import MeVideoElem from "../../components/elements/MeVideoElem";
import { useAccount } from "wagmi";

import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import router from "next/router";

function Room() {
  const { address } = useAccount();
  const huddleClient = getHuddleClient("YOUR_API_KEY");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);

  const [roomState, setRoomState] = useState<string>("");
  const [webcamState, setWebcamState] = useState<boolean>(false);
  const [micState, setMicState] = useState<boolean>(false);
  const [screenshareState, setScreenshareState] = useState<boolean>(false);

  const handleJoin = async () => {
    try {
      await huddleClient.join("dev", {
        address: "cascd",
        wallet: "fsdaf",
        ens: "ax",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  const leaveRoom = async () => {
    try {
      huddleClient.close();
      setRoomState("");
      router.push("/");
    } catch (error: any) {
      alert(error);
    }
  };

  //For Camera Video
  const enableWebcam = async () => {
    try {
      await huddleClient.enableWebcam();
      setWebcamState(true);
    } catch (error: any) {
      setWebcamState(false);
      alert(error);
    }
  };

  const disableWebcam = async () => {
    try {
      await huddleClient.disableWebcam();
      setWebcamState(false);
    } catch (error: any) {
      alert(error);
    }
  };

  //For Mic
  const enableMic = async () => {
    try {
      await huddleClient.enableMic();
      setMicState(true);
    } catch (error: any) {
      setMicState(false);
      alert(error);
    }
  };

  const disableMic = async () => {
    try {
      await huddleClient.disableMic();
      setMicState(false);
    } catch (error: any) {
      alert(error);
    }
  };

  //screen share
  const startScreenshare = async () => {
    try {
      await huddleClient.enableShare();
      setScreenshareState(true);
    } catch (error: any) {
      alert(error);
      setScreenshareState(false);
    }
  };

  const stopScreenshare = async () => {
    try {
      await huddleClient.disableShare();
      setScreenshareState(false);
    } catch (error: any) {
      alert(error);
    }
  };

  const setupEventListeners = async () => {
    emitter.on("roomState", (state: string) => {
      switch (state) {
        case "connected":
          //do whatever
          console.log("connected");
          break;
        case "failed":
          //do whatever
          console.log("fail");

          break;
        case "disconnected":
          //do whatever
          break;
        default:
          setRoomState(state);
          break;
      }
      setRoomState(state);
    });
  };
  setupEventListeners();

  return (
    <main className="justify-between flex  flex-col h-screen">
      <Header />

      <div className=" h-full container max-w-[1350px]">
        <div className=" w-[950px] h-full flex flex-col justify-between pt-[20px]">
          <div className="flex items-center h-full  ">
            <div className=" relative rounded-lg overflow-hidden">
              <div>
                <MeVideoElem />
                <div className="bg-black/30 h-[40px] absolute w-[40px] top-0 rounded-full m-[10px] items-center flex justify-center">
                  {" "}
                  {micState ? <MicNoneOutlinedIcon /> : <MicOffOutlinedIcon />}
                </div>
              </div>

              <div className="space-y-[15px] absolute w-[250px] bottom-[15px] right-0">
                {peersKeys.map((key) => (
                  <div
                    key={`peerId-${key}`}
                    className="rounded-lg overflow-hidden border mr-[15px]"
                  >
                    <PeerVideoAudioElem peerIdAtIndex={key} />
                    <p className="text-[10px] text-right -mt-[15px]">{`peerId-${key}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Footer
            handleJoin={handleJoin}
            leaveRoom={leaveRoom}
            camera={{ enableWebcam, disableWebcam, webcamState }}
            mic={{ enableMic, disableMic, micState }}
            screenShare={{
              startScreenshare,
              stopScreenshare,
              screenshareState,
            }}
          />
        </div>

        <div></div>
      </div>

      {/* <div className="flex mt-[30px] justify-between container  min-w-[1350px] h-auto ">
        <div className="max-w-[950px] ">
          <div className="grid grid-cols-4 gap-x-[15px]">
            {peersKeys.map((key) => (
              <div
                key={`peerId-${key}`}
                className="rounded-lg overflow-hidden border"
              >
                <PeerVideoAudioElem peerIdAtIndex={key} />
                <p className="text-[10px] text-right">{`peerId-${key}`}</p>
              </div>
            ))}
          </div>
          <div className="border h-[440px] w-[950px] mt-[20px] rounded-[20px] overflow-scroll">
            <MeVideoElem />
          </div>
          <div>
            <div>
              <div className="card">
        
                <button onClick={() => huddleClient.disableWebcam()}>
                  Disable Webcam
                </button>
                <button
                  onClick={() => huddleClient.allowAllLobbyPeersToJoinRoom()}
                >
                  allowAllLobbyPeersToJoinRoom()
                </button>
                <button
                  onClick={() =>
                    // will not work in localhost
                    huddleClient.startRecording({
                      sourceUrl: window.location.href,
                    })
                  }
                >
                  startRecording()
                </button>
                <button
                  onClick={() => huddleClient.stopRecording({ ipfs: true })}
                >
                  stopRecording()
                </button>
              </div>
              <div>
                <h2 className={`text-${!roomState.joined ? "red" : "green"}`}>
                  Room Joined:&nbsp;{roomState.joined.toString()}
                </h2>
              </div>

              <div className="h-[200px]"></div>
            </div>
          </div>
        </div>
        <div className="w-[360px] h-full  rounded-[20px]  bg-[#2B2D2E] h-[645px] p-[16px]">
          <div className="bg-black rounded-[10px] flex justify-between p-[8px]">
            <p className="bg-blue-600 rounded-lg w-full py-[10px] text-center">
              Group
            </p>
            <p className=" rounded-lg w-full py-[10px] text-center">Personal</p>
          </div>
        </div>
      </div> */}
    </main>
  );
}

export default Room;
