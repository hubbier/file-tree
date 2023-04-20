import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { FileIcon } from "./FileIcon";
import {
  File,
  Directory,
  useWorkspaceContext,
  isFile,
} from "../../Workspace/WorkspaceContext";
import { FileRow } from "./FileRow";
import { DirectoryRow } from "./DirectoryRow";

interface IFileRowProps {
  node: File | Directory;
}

export const FileTree = ({ node }: IFileRowProps) => {
  if (isFile(node)) {
    return <FileRow key={node.path} file={node} />;
  }
  const contents = Array.from(node.contents.values()).map((childNode) => (
    <FileTree node={childNode} />
  ));
  if (node.name === "") return <>{contents}</>;
  else
    return (
      <DirectoryRow directory={node} key={node.name}>
        {contents}
      </DirectoryRow>
    );
};
