/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import type { PageServerLoad } from './$types';
import { readFile } from '$lib/tufRepoFilesystem';
import type { SignedMetadata } from '$lib/TufJSON/types';

export const load: PageServerLoad = async({ params }) => {
    return {
        path: params.path,
        content: JSON.parse(readFile(params.path)) as SignedMetadata,
    }
}
