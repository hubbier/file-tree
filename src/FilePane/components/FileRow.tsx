import React, { useContext } from "react";
import { Box, Typography, Icon } from "@mui/material";
import { FileIcon } from "./FileIcon";
import { useWorkspaceContext } from "../../Workspace/WorkspaceContext";
import type { File } from "../../Workspace/WorkspaceContext";

interface IFileRowProps {
  file: File;
}

export const FileRow = ({ file }) => {
  const { activeFile, activateFile } = useWorkspaceContext();

  const filePath = file.path.split("/");
  const fileName = filePath[filePath.length - 1];

  return (
    <Box
      display="flex"
      height="1.5rem"
      flexDirection="row"
      alignItems="center"
      key={file.path}
      paddingLeft={`${filePath.length * 0.5}rem`}
      //   px={1}
      sx={{
        cursor: "pointer",
        background: activeFile === file ? "#DADADA" : "inherit",
        "&:hover": {
          background: "#E6E6E6",
        },
      }}
      onClick={() => activateFile(fileName)}
    >
      <Box width="1.5rem">
        <FileIcon fileName={fileName} />
      </Box>
      <Typography variant="body2">{fileName}</Typography>
    </Box>
  );
};
