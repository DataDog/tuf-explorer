const separatorRegexp = new RegExp('/{1,}', 'g');

export function joinPath(parts: string[]) {
    return parts.join("/").replace(separatorRegexp, "/")
}
