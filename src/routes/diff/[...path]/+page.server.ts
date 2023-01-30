/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

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

