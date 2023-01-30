/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

export type SignedMetadata = {
    signatures: Signature[],
    signed: RootMetadata | TargetsMetadata,
}

export type Signature = {
    keyid: string,
    sig: string
}

export type RootMetadata = {
    _type: "root"
    consistent_snapshot: boolean
    expires: string
    keys: {
        [id: string]: any
    }
    roles: {
        [name: string]: {
            keyids: string[]
            threshold: number
        }
    }
    spec_version: string
    version: number
}

export type TargetsMetadata = {
    _type: "targets"
    expires: string
    delegations: {
        keys: {
            [id: string]: any
        }
        roles: {
            name: string
            keyids: string[]
            threshold: number
            paths: string[]
            terminating: boolean
        }[]
    }
    spec_version: string
    version: number
}
