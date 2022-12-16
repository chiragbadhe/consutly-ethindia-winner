import { useHuddleStore } from "@huddle01/huddle01-client/store";
import React, { useEffect, useRef } from "react";

const MeVideoElem = () => {
  const stream = useHuddleStore((state) => state.stream);
  const isCamPaused = useHuddleStore((state) => state.isCamPaused);
  const videoRef = useRef<HTMLVideoElement>(null);

  const peerId = useHuddleStore((state) => state.peerId);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    console.log({ stream });
  }, [stream]);

  return (
    <>
      <video ref={videoRef} autoPlay muted playsInline></video>
    </>
  );
};

export default MeVideoElem;
