import { io } from "socket.io-client";
const API = import.meta.env.VITE_API_URL;

export function createTVSocket(channel = "default") {
  // connect to namespace '/tv' and pass channel as query param
  const socket = io(`${API}/tv`, { query: { channel } });
  return socket;
}
