import React, { useState } from "react";
import { Button, LinearProgress, Box } from "@mui/material";
import { uploadFile } from "../lib/api";

export default function Uploader({ onUploaded }) {
  const [progress, setProgress] = useState(0);

  const handle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);

    const res = await uploadFile(fd, (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100));
    });
    setProgress(0);
    onUploaded && onUploaded(res.data);
  };

  return (
    <Box>
      <input style={{ display: "none" }} id="file" type="file" onChange={handle} />
      <label htmlFor="file">
        <Button variant="contained" component="span">Upload Media</Button>
      </label>
      {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{mt:1}} />}
    </Box>
  );
}
