import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function BroadcastPanel({ file }) {
  const handleBroadcast = async () => {
    try {
      await axios.post(`${BASE_URL}/api/broadcast`, {
        contentId: file.id,
      });
      alert(`Broadcasted: ${file.filename}`);
    } catch (err) {
      console.error(err);
      alert("Failed to broadcast");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* <span>{file.filename}</span> */}
      <Button variant="contained" color="primary" onClick={handleBroadcast}>
        Broadcast
      </Button>
    </div>
  );
}
