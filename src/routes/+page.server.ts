import { keyInfoRootDir, reposRootDir } from '$lib/constants';
import { rootDir } from '$lib/tufRepoFilesystem';
import { joinPath } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async() => {
    return {
        rootDir: joinPath([rootDir, reposRootDir]),
        keyInfoRootDir: joinPath([rootDir, keyInfoRootDir]),
    }
}
