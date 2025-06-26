// src/pages/Meeting.jsx
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// 🔸 util: random string
const randomID = (len = 5) => {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Meeting = () => {
  const { roomId } = useParams();            // ➜ /meeting/:roomId से आया
  const containerRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;                     // safety guard

    /* ------------------------------------------------------------------
       1️⃣  App credentials  (replace with your own)
    ------------------------------------------------------------------ */
    const appID = 2094739522 ;
    const serverSecret = "a6c45cdbbd073519c5dd51218eecba12";

    /* ------------------------------------------------------------------
       2️⃣  Unique user info  (could come from your auth state)
    ------------------------------------------------------------------ */
    const userID = randomID();               // e.g. "c4xg8"
    const userName = `User_${userID}`;       // e.g. "User_c4xg8"

    /* ------------------------------------------------------------------
       3️⃣  Kit token  (⚠️ generate on backend in prod)
    ------------------------------------------------------------------ */
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );

    /* ------------------------------------------------------------------
       4️⃣  Create instance & join the room
    ------------------------------------------------------------------ */
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: "Invite link",
          url: `${window.location.origin}/meeting/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,    // 1-on-1? use .OneONoneCall
      },
      showPreJoinView: false,                 // skip preview screen
    });

    // cleanup on unmount (leave room)
    return () => {
      zp && zp.destroy();
    };
  }, [roomId]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100vw", height: "100vh" }}
      className="bg-gray-900"
    />
  );
};

export default Meeting;
