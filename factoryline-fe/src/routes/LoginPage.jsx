import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../utils/auth";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";

const API = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { username: user, password: pass }, { withCredentials: true });
      if (res.data.success) {
        loginSuccess();
        nav("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (e) {
      console.error(e);
      alert("Login error");
    }
  };

  return (
    <Box sx={{ width: 360, mx: "auto", mt: 12 }}>
      <TextField label="Username" fullWidth value={user} onChange={e=>setUser(e.target.value)} />
      <TextField label="Password" type="password" fullWidth value={pass} onChange={e=>setPass(e.target.value)} sx={{mt:2}} />
      <Button variant="contained" fullWidth onClick={submit} sx={{mt:2}}>Login</Button>
    </Box>
  );
}
