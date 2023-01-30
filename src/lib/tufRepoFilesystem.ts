import { readFileSync, readdirSync } from 'node:fs';
import { execFile } from 'node:child_process';

export const rootDir = process.env.HOME + '/tinkering/tuf-explorer-demo/';

export function readFile(path: string) {
    return readFileSync(rootDir + "/" + path, { encoding: 'utf-8' });
}

export function recurseDir(path: string) {
    let result: any = {};
    for (const each of readdirSync(path, { withFileTypes: true })) {
        result[each.name] = each.isDirectory() ? recurseDir(path + '/' + each.name) : null;
    }

    return result;
}

export let fromRevision = "7bb1b25";
export function setFromRevision(value: string) {
    fromRevision = value;
}
export let toRevision: string | null = null;
export function setToRevision(value: string) {
    toRevision = value;
}

export async function getDiffFileList(fromRevision: string, toRevision: string | null, dir: string): Promise<{ [path: string]: string }> {
    const fromTo = toRevision ? [fromRevision, toRevision] : [fromRevision];
    const result = await gitDiff(fromTo, dir);

    if (!toRevision) {
        for (const each of await listUntrackedFiles(dir)) {
            result[each] = "U";
        }
    }

    return result;
}

async function gitDiff(fromTo: string[], dir: string): Promise<{[path:string]: string}> {
    return new Promise((resolve, reject) => {
        execFile(
            'git', ["diff", "--relative", "--name-status", ...fromTo, dir],
            {
                cwd: rootDir,
            },
            (error, stdout) => {
                if (error) {
                    reject(error);
                    return;
                }

                let result: {
                    [path: string]: string,
                } = {};

                for (const line of stdout.split("\n")) {
                    const [statusLetter, path] = line.split("\t");

                    if (path) {
                        result[path] = statusLetter
                    }
                }

                resolve(result);
            }
        )
    })
}

async function listUntrackedFiles(dir: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        execFile(
            'git', ["ls-files", "--others", "--exclude-standard", dir],
            {
                cwd: rootDir,
            },
            (error, stdout) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(stdout.split("\n").filter(x => Boolean(x)));
            }
        )
    })
}

export async function getFileAtRevision(path: string, rev: string | null): Promise<string> {
    if (rev) {
        return new Promise((resolve, reject) => {
            execFile(
                'git', ["show", `${rev}:./${path}`],
                {
                    cwd: rootDir,
                },
                (error, stdout) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(stdout);
                }
            )
        });
    } else {
        return readFile(path);
    }
}
