/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { isObject } from "./utils";

export type Side = "before" | "after";

export function renderDiffSide(x: any, side: "before" | "after", depth: number = 0): string {
    if (isObject(x)) {
        if (x.__before && x.__after) {
            const content = stringify(
                side == "before" ? x.__before : x.__after,
                depth+1,
            );
            return `<span class="changed">${content}</span>`;
        } else if (x.__diff) {
            const v = x.__value || x;

            if (isThisSide(x, side)) {
                const content = stringify(v, depth+1)
                return `<span class="${x.__diff}">${content}</span>`;
            } else {
                const nbLines = stringify(v).split(/\n/).length;
                const content = "\n".repeat(nbLines);
                return `<span class="blank">${content}</span>`;
            }
        } else {
            return (
                "{\n"
                + Object.entries(x).map(([key, value]) =>
                    renderDiffObjectEntry(key, value, side, depth+1)).join("")
                + leftIndent(depth)+"}"
            )
        }
    } else if (Array.isArray(x)) {
        return (
            "[\n"
            + x.map((item) => renderArrayItemDiff(item, side, depth+1)).join("")
            + leftIndent(depth)+"]"
        )
    } else {
        return stringify(x);
    }
}

function renderArrayItemDiff(item: any, side: Side, depth: number): string {
    if (isObject(item) && item.__diff) {
        const v = item.__value || item;

        if (isThisSide(item, side)) {
            const content = leftIndent(depth) + stringify(v, depth) + ',\n';
            return `<span class="${item.__diff}">${content}</span>`;
        } else {
            const nbLines = stringify(v).split(/\n/).length;
            const content = "\n".repeat(nbLines);
            return `<span class="blank">${content}</span>`;
        }
    } else {
        return leftIndent(depth) + renderDiffSide(item, side, depth) + ",\n";
    }
}

function renderDiffObjectEntry(key: string, value: any, side: "before" | "after", depth: number): string {
    if (isObject(value) && value.__diff) {
        const v = value.__value || value;

        if (isThisSide(value, side)) {
            const content = leftIndent(depth) + `"${key}": ${stringify(v, depth)},\n`;
            return `<span class="${value.__diff}">${content}</span>`;
        } else {
            const nbLines = stringify(v).split(/\n/).length;
            const content = "\n".repeat(nbLines);
            return `<span class="blank">${content}</span>`;
        }
    } else {
        return (
            leftIndent(depth)
            + `"${key}": ${renderDiffSide(value, side, depth)},\n`
        )
    }
}

function stringify(x: any, depth?: number) {
    let filtered: any;

    if (isObject(x)) {
        filtered = Object.fromEntries(
            Object.entries(x).filter(([key]) => !["__diff"].includes(key))
        );
    } else {
        filtered = x;
    }

    const json = JSON.stringify(filtered, null, '    ');

    if (depth) {
        return json.replaceAll("\n", "\n"+leftIndent(depth));
    } else {
        return json;
    }
}

function leftIndent(depth: number) {
    return '    '.repeat(depth);
}

function isThisSide(x: any, side: "before" | "after") {
    return (
        (side === "before" && x.__diff !== "added")
        || (side === "after" && x.__diff !== "removed")
    )
}
