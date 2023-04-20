import React, { createContext, useContext, useMemo, useState } from "react";
import { makeFileTree, newDirectory } from "../FilePane/fileFunctions";

export type File = {
  path: string;
  contents: string;
};

export function isFile(object: object): object is File {
  return (
    !object.hasOwnProperty("name") &&
    (object as File).path !== undefined &&
    (object as File).contents !== undefined &&
    typeof (object as File).contents === "string"
  );
}

export type Directory = {
  name: string;
  path: string;
  contents: Map<string, Directory | File>;
};

export const workspaceContext = createContext<{
  activeFile?: File;
  activateFile: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
  addFile: (path: string, contents?: string) => void;
  rootDirectory: Directory;
  openDirectories: Array<string>;
  toggleDirectory: (path: string) => void;
}>({
  activeFile: undefined,
  activateFile: () => {},
  files: [],
  addFile: () => {},
  rootDirectory: newDirectory("", ""),
  openDirectories: [],
  toggleDirectory: () => {},
});

export const WorkspaceProvider: React.FC<{
  files: File[];
  children: React.ReactNode;
}> = ({ files, children }) => {
  const [activeFilePath, setActiveFilePath] = useState<string>("");
  const [openDirectories, setOpenDirectories] = useState<Array<string>>([]);

  function toggleDirectory(path: string) {
    if (openDirectories.includes(path)) {
      setOpenDirectories([...openDirectories.filter((dir) => dir !== path)]);
    } else {
      setOpenDirectories([...openDirectories, path]);
    }
  }

  const [files_, setFiles] = useState(files);

  function addFile(path: string, contents: string = "") {
    setFiles([...files_, { path, contents }]);
  }

  const activeFile = useMemo(() => {
    const foundFile = files_.find((f) => f.path === activeFilePath);
    return foundFile || files_[0];
  }, [activeFilePath]);

  const ctxVal = {
    activeFile,
    activateFile: setActiveFilePath,
    files: files_.sort((a, b) => a.path.localeCompare(b.path)),
    addFile,
    rootDirectory: makeFileTree(
      files_.sort((a, b) => a.path.localeCompare(b.path))
    ),
    openDirectories,
    toggleDirectory,
  };

  return (
    <workspaceContext.Provider value={ctxVal}>
      {children}
    </workspaceContext.Provider>
  );
};

export function useWorkspaceContext() {
  return useContext(workspaceContext);
}
