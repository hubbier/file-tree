import React from "react";
import { Box, Typography } from "@mui/material";
import { useWorkspaceContext } from "../Workspace/WorkspaceContext";
import { FileTree } from "./components/FileTree";

export const FilePane = () => {
  const { rootDirectory } = useWorkspaceContext();

  return (
    <Box>
      <Box p={1}>
        <Typography variant="h6">Files</Typography>
      </Box>
      <Box>
        <FileTree node={rootDirectory} />
      </Box>
    </Box>
  );
};
