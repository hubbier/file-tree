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
  const childNodes = Array.from(node.contents.values());
  const directories = childNodes
    .filter((node) => !isFile(node))
    .map((childNode) => <FileTree node={childNode} />);
  const files = childNodes
    .filter((node) => isFile(node))
    .map((childNode) => <FileTree node={childNode} />);
  if (node.name === "")
    return (
      <>
        {directories}
        {files}
      </>
    );
  else
    return (
      <DirectoryRow directory={node} key={node.name}>
        {directories}
        {files}
      </DirectoryRow>
    );
};
