import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BroadcastPanel from "./BroadcastPanel";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ContentList({ items }) {
  return (
    <div>
      {items?.length === 0 ? (
        <p>No files yet</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>File Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Preview</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.originalname}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={`${BASE_URL}/uploads/${file.filename}`}
                        alt={file.filename}
                        style={{ width: "80px", borderRadius: "4px" }}
                      />
                    ) : (
                      <a
                        href={`${BASE_URL}/uploads/${file.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <BroadcastPanel file={file} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
