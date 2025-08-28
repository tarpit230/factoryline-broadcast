import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API,
  withCredentials: true
});

export async function uploadFile(formData, onUploadProgress) {
  return client.post("/api/content/upload", formData, { headers: { "Content-Type": "multipart/form-data" }, onUploadProgress });
}
export async function listContent() {
  return client.get("/api/content");
}
export async function broadcast(contentId) {
  return client.post("/api/broadcast", { contentId });
}
export default client;
