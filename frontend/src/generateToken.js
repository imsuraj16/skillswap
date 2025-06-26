// utils/generateZegoToken.js
import { KJUR } from "jsrsasign";

export const generateToken = (appID, serverSecret, roomID, userID, userName) => {
  const key = serverSecret;
  const payload = {
    app_id: appID,
    user_id: userID,
    nonce: Math.floor(Math.random() * 100000),
    ctime: Math.floor(Date.now() / 1000),
    expire: 3600,
    room_id: roomID,
  };

  const header = { alg: "HS256", typ: "JWT" };
  const token = KJUR.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), key);
  return token;
};
