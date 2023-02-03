/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { rootDir, keyInfoRootDir, reposRootDir } from '$lib/directories';
import { joinPath } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async() => {
    return {
        rootDir: joinPath([rootDir, reposRootDir]),
        keyInfoRootDir: joinPath([rootDir, keyInfoRootDir]),
    }
}
