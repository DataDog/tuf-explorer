/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { rootDir } from '$lib/directories';
import { execFile } from 'node:child_process';

import type { PageServerLoad } from './$types';

async function gitLog(){
    return new Promise<any[]>((resolve, reject) => {
        execFile(
            "git", ["log", "-30", "--pretty=format:%h %d %s (%cr) <%an>"],
            { cwd: rootDir },
            (error, stdout) => {
                if (error) {
                    reject(error);
                    return;
                }

                let result: any[] = [];

                for (const line of stdout.split("\n")) {
                    const parts = line.split(' ');
                    const hash = parts[0];
                    result.push([hash, parts.slice(1).join(' ')]);
                }

                resolve(result);
            }
        )
    })
}

export const load: PageServerLoad = async () => {
  return {
    log: gitLog(),
  };
}
