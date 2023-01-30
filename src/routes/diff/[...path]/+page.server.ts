import type { PageServerLoad } from './$types';
import { getFileAtRevision, fromRevision, toRevision } from '$lib/tufRepoFilesystem';

export const load: PageServerLoad = async({ params }) => {
    const { path } = params;

    return {
        path,
        before: getFileAtRevision(path, fromRevision),
        after: getFileAtRevision(path, toRevision),
    }
}

