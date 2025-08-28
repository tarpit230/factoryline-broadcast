import React, { useEffect, useState } from "react";
import Uploader from "../components/Uploader";
import ContentList from "../components/ContentList";
import { listContent, broadcast } from "../lib/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function DashboardPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await listContent();
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const onUploaded = () => load();
  const onBroadcast = async (contentId) => {
    await broadcast(contentId);
    alert("✅ Broadcast sent!");
  };

  return (
    <Box sx={{ p: 3, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Supervisor Dashboard
      </Typography>

      {/* Upload Section */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <CloudUploadIcon color="primary" />
            <Typography variant="h6">Upload New Media</Typography>
          </Stack>
          <Uploader onUploaded={onUploaded} />
        </CardContent>
      </Card>

      {/* Content List Section */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <ListAltIcon color="primary" />
            <Typography variant="h6">Uploaded Files</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <ContentList items={items} onBroadcast={onBroadcast} />
        </CardContent>
      </Card>
    </Box>
  );
}
