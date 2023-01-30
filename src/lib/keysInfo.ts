/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

let cached: { [id: string]: KeyInfo };

export async function getKeysInfo() {
    if (!cached) {
        cached = (await fetch("/api/keys").then((r) => r.json())) as { [id: string]: KeyInfo };
    }

    return cached;
}

export type KeyInfo = {
    datacenter: string,
    engine_path: string,
    name: string,
    public_key: string,
    __from_file: string,
}
