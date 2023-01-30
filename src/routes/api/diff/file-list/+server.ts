/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { keyInfoRootDir, reposRootDir } from '$lib/constants';
import { getDiffFileList, rootDir } from '$lib/tufRepoFilesystem';
import { joinPath } from '$lib/utils';
import { error as svelteError, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async({ url }) => {
    const toRevision = url.searchParams.get('toRevision');

    const fromRevision = url.searchParams.get('fromRevision');
    if (!fromRevision) {
        throw svelteError(400, 'missing "fromRevision"')
    }

    return json({
        ...await getDiffFileList(fromRevision, toRevision, joinPath([rootDir, reposRootDir])),
        ...await getDiffFileList(fromRevision, toRevision, joinPath([rootDir, keyInfoRootDir])),
    });
}
