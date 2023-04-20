import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Directory,
  useWorkspaceContext,
} from "../../Workspace/WorkspaceContext";

interface IDirectoryRowProps {
  directory: Directory;
  children: React.ReactNode;
}

export const DirectoryRow = ({ directory, children }: IDirectoryRowProps) => {
  const { openDirectories, toggleDirectory } = useWorkspaceContext();
  const open = openDirectories.includes(directory.path);

  return (
    <>
      <Box>
        <Box
          paddingLeft={`${directory.path.split("/").length * 0.5}rem`}
          display="flex"
          height="1.5rem"
          flexDirection="row"
          alignItems="center"
          key={directory.path}
          minWidth="12rem"
          sx={{
            cursor: "pointer",
            "&:hover": {
              background: "#E6E6E6",
            },
          }}
          onClick={() => toggleDirectory(directory.path)}
        >
          <Box width="1.5rem">
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </Box>
          <Typography variant="body2">{directory.name}</Typography>
        </Box>
        {open && children}
      </Box>
    </>
  );
};
