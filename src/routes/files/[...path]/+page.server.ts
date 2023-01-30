import type { PageServerLoad } from './$types';
import { readFile } from '$lib/tufRepoFilesystem';
import type { SignedMetadata } from '$lib/TufJSON/types';

export const load: PageServerLoad = async({ params }) => {
    return {
        path: params.path,
        content: JSON.parse(readFile(params.path)) as SignedMetadata,
    }
}
