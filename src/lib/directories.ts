/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/
import { building } from "$app/environment";
import { joinPath } from "./utils";

export let rootDir: string;
export let reposRootDir: string;
export let keyInfoRootDir: string;

// weird hack to avoid failing while building
// see https://github.com/sveltejs/kit/issues/7899#issuecomment-1333844735
if (!building) {
    rootDir = readRequiredEnvVar('TUF_EXPLORER_ROOT_DIR');

    const commonPrefix = process.env.TUF_EXPLORER_COMMON_ROOTS_PREFIX || '';
    reposRootDir = joinPath([commonPrefix, readRequiredEnvVar('TUF_EXPLORER_REPOS_ROOT_DIR_SUFFIX')]);
    keyInfoRootDir = joinPath([commonPrefix, readRequiredEnvVar('TUF_EXPLORER_REPOS_KEY_INFO_DIR_SUFFIX')]);
}

function readRequiredEnvVar(varName: string): string {
    const val = process.env[varName];

    if (!val) {
        throw Error(`missing required env var "${varName}"`);
    }

    return val
}
