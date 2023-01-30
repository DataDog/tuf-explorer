import type { LayoutServerLoad } from './$types';
import { recurseDir, rootDir } from '$lib/tufRepoFilesystem';
import { keyInfoRootDir, reposRootDir } from '$lib/constants';

export const load: LayoutServerLoad = async() => {
    return {
        repoFiles: recurseDir(rootDir + "/" + reposRootDir),
        helperFiles: recurseDir(rootDir + "/" + keyInfoRootDir),
    }
}

const TUF_VERSION_REGEXP =/^(([0-9]+).)?/

function tufOrdering(a: string, b: string) {
    const aVersion = a.match(TUF_VERSION_REGEXP)?.[2] ;
    const bVersion = b.match(TUF_VERSION_REGEXP)?.[2];

    if (aVersion) {
        if (bVersion) {
            return Number(bVersion) - Number(aVersion);
        } else {
            // put b before a
            return 1;
        }
    } else {
        if (bVersion) {
            return -1;
        } else {
            return a < b ? 1 : -1;
        }
    }
}
