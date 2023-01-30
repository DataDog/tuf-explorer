/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { isObject } from "./utils";

export function jsonDiff(before: any, after: any): any {
    if (isObject(before)) {
        return diffObjects(before, after);
    } else if (Array.isArray(before)){
        // assuming "after" is an array too
        if (before.every(x => (typeof x === "string")) && after.every((x: any) => (typeof x === "string"))) {
            return diffStringArrays(before, after);
        } else {
            return diffObjectArrays(before, after);
        }
    } else {
        if (before === after) {
            return before;
        } else {
            return {
                __before: before,
                __after: after,
            }
        }
    }
}

function diffObjects(before: any, after: any) {
    const diff: any = {};

    for (const [key, beforeValue] of Object.entries(before)) {
        const afterValue = after[key];
        if (after[key]) {
            diff[key] = jsonDiff(beforeValue, afterValue);
        } else {
            let diffVal = isObject(beforeValue) ? beforeValue as any : { __value: beforeValue };
            diff[key] = {
                ...diffVal,
                __diff: "removed",
            }
        }
    }

    for (const [key, afterValue] of Object.entries(after)) {
        if (before[key]) {
            continue;
        } else {
            let diffVal = isObject(afterValue) ? afterValue as any : { __value: afterValue };
            diff[key] = {
                ...diffVal,
                __diff: "added",
            }
        }
    }

    return diff;
}

function diffStringArrays(before: string[], after: string[]) {
    const result: any[] = [];

    const beforeSet = new Set(before);
    const afterSet = new Set(after);

    const allSet = new Set(beforeSet);
    for (const x of afterSet) {
        allSet.add(x);
    }

    for (const each of Array.from(allSet).sort()) {
        if (beforeSet.has(each)) {
            if (afterSet.has(each)) {
                result.push(each);
            } else {
                result.push({
                    __diff: "removed",
                    __value: each,
                })
            }
        } else {
            // the item must come from the after set then
            result.push({
                __diff: "added",
                __value: each,
            })
        }
    }
    return result;
}

function diffObjectArrays(before: any[], after: any[]) {
    const byDefactoKey = new Map();

    for (const [side, items] of [
        ["before", before], ["after", after],
    ]) {
        for (const each of items) {
            // assuming all items have the same de facto key
            // (and none of the others de facto keys)
            const key = each.keyid || each.name;

            if (!key) {
                throw new Error(
                    `could not find a pseudo key in array item ${JSON.stringify(each)}`
                );
            }

            if (!byDefactoKey.has(key)) {
                byDefactoKey.set(key, {})
            }

            byDefactoKey.get(key)[side as string] = each;
        }
    }

    const result = [];

    for (const {before, after} of byDefactoKey.values()) {
        if (before) {
            if (after) {
                result.push(jsonDiff(before, after))
            } else {
                result.push({
                    ...before,
                    __diff: "removed",
                })
            }
        } else {
            result.push({
                ...after,
                __diff: "added",
            })
        }
    }

    return result;
}
