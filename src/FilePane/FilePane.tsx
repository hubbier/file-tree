import React from "react";
import { Box, Typography } from "@mui/material";
import { useWorkspaceContext } from "../Workspace/WorkspaceContext";
import { FileTree } from "./components/FileTree";

export const FilePane = () => {
  const { rootDirectory, addFile, activeFile } = useWorkspaceContext();

  function handleAddFile(e) {
    e.preventDefault();
    const currentPath = activeFile?.path.split("/");
    const newFileDirectory = currentPath?.slice(0, currentPath.length - 1);
    const newFilePath = newFileDirectory || [];
    newFilePath.push("New_File.txt");
    addFile(newFilePath.join("/"));
  }

  return (
    <>
      <Box>
        <Box p={1}>
          <Typography variant="h6">Files</Typography>
        </Box>
        <Box px={1} display="flex" justifyContent="flex-end">
          <button onClick={handleAddFile}>Add</button>
        </Box>
        <Box>
          <FileTree node={rootDirectory} />
        </Box>
      </Box>
    </>
  );
};
