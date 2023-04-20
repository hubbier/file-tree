import { Directory, File } from "../Workspace/WorkspaceContext";

const directoryRegex = /(?<directoryName>[A-Za-z]+)\//;

export function newDirectory(name: string, path: string) {
    return {
        name,
        path,
        contents: new Map<string, File | Directory>()
    }
}

export function makeFileTree(files: File[]) {
    const root: Directory = newDirectory("", "");

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = file.path.split("/");
        let current = root;
        for (let i = 0; i < path.length - 1; i++) {
            const directoryName = path[i];
            const directoryPath = path.slice(0, i + 1).join("/");
            if (!current.contents.get(directoryName)) {
                current.contents.set(directoryName, newDirectory(directoryName, directoryPath));
            }
            current = current.contents.get(directoryName) as Directory;
        }
        current.contents.set(path[path.length - 1], file);
    }
    return root;
}