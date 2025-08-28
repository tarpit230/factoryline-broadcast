import React from "react";
import { Box } from "@mui/material";

export default function Player({ content }) {
  if (!content) return <Box>Waiting for broadcast...</Box>;
  const url = `${import.meta.env.VITE_API_URL}${content.url}`;

  if (content.type === "IMAGE") {
    return <img src={url} style={{width:"100%", height:"100%", objectFit:"contain"}} alt="" />;
  }
  if (content.type === "VIDEO") {
    return <video src={url} width="100%" height="100%" autoPlay loop muted playsInline />;
  }
  if (content.type === "PDF") {
    return <embed src={url} type="application/pdf" width="100%" height="100%" />;
  }
  return <Box>Unsupported type</Box>;
}
