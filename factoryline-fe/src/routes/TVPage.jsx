import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTVSocket } from "../lib/socket";
import Player from "../components/Player";
import axios from "axios";

export default function TVPage() {
  const { channel } = useParams();
  const ch = channel || "default";
  const [content, setContent] = useState(null);

  useEffect(()=> {
    // Optionally GET current state from server (if you implemented /api/state/:channel)
    axios.get(`${import.meta.env.VITE_API_URL}/api/state/${ch}`)
      .then(r => { if (r.data) setContent(r.data); })
      .catch(()=>{}); // ignore if not implemented

    const socket = createTVSocket(ch);
    socket.on("connect", () => console.log("TV connected", socket.id));
    socket.on("broadcast", (payload) => {
      console.log("broadcast received", payload);
      setContent(payload);
    });
    return () => socket.disconnect();
  }, [ch]);

  console.log('content', content)

  return (
    <div style={{width:"100vw", height:"100vh", background:"#000"}}>
      <Player content={content} />
    </div>
  );
}
