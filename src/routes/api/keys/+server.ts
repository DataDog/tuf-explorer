/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { readFileSync, readdirSync } from 'node:fs';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { rootDir, keyInfoRootDir as relKeyInfoRootDir } from '$lib/directories';
import { joinPath } from '$lib/utils';

const keyInfoRootDir = joinPath([rootDir, relKeyInfoRootDir]);

class KeysInfo {
    keys: {[keyid: string]: any} = {}

    constructor() {
        this.loadRecursivelyFrom('');
    }

    loadRecursivelyFrom(dir: string) {
        for (const each of readdirSync(keyInfoRootDir+"/"+dir, {withFileTypes: true})) {
            if (each.isDirectory()) {
                this.loadRecursivelyFrom(dir+'/'+each.name)
            } else {
                if (each.name === 'offline-keys.json' || each.name === 'online-keys.json') {
                    const pathToFile = dir + '/' + each.name;
                    const file = JSON.parse(readFileSync(keyInfoRootDir+'/'+pathToFile, { encoding: 'utf8' }));
                    for (const [keyid, keyinfo] of Object.entries<any>(file.keys)) {
                        this.keys[keyid] = {
                            ...keyinfo,
                            '__from_file': pathToFile,
                        }
                    }
                }
            }
        }
    }
}

export const GET: RequestHandler = async() => {
    const { keys } = new KeysInfo();
    return json(keys);
}
