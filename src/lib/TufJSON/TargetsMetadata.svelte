<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import type { KeyInfo } from "$lib/keysInfo";
    import type { TargetsMetadata } from "./types";
    import Key from "./Key.svelte";

    export let metadata: TargetsMetadata;
    export let keys: { [id: string]: KeyInfo };
    export let showKeys: boolean;
</script>

<ul>
    <li>type: {metadata._type}</li>
    <li>expires: {metadata.expires}</li>
    {#if metadata.delegations}
        <li>
            delegations:
            <ul>
                <li>
                    keys:
                    <input
                        type="checkbox"
                        id="showKeys"
                        bind:checked={showKeys}
                    />
                    <label for="showKeys">show</label>
                    {#if showKeys}
                        <pre>{JSON.stringify(
                                metadata.delegations.keys,
                                null,
                                4
                            )}</pre>
                    {/if}
                </li>
                <li>
                    roles:
                    <ul>
                        {#each metadata.delegations.roles as role}
                            <li>
                                {role.name}:
                                <ul>
                                    <li>
                                        keys:
                                        <ul>
                                            {#each role.keyids as keyid}
                                                <li>
                                                    <Key
                                                        id={keyid}
                                                        keyInfo={keys[keyid]}
                                                    />
                                                </li>
                                            {/each}
                                        </ul>
                                    </li>
                                    <li>threshold: {role.threshold}</li>
                                    <li>
                                        paths:
                                        <ul>
                                            {#each role.paths as path}
                                                <li>{path}</li>
                                            {/each}
                                        </ul>
                                    </li>
                                    <li>terminating: {role.terminating}</li>
                                </ul>
                            </li>
                        {/each}
                    </ul>
                </li>
            </ul>
        </li>
    {/if}
    {#if metadata.targets}
        <li>
            targets:
            <ul>
                {#each Object.entries(metadata.targets) as [targetPath, targetInfo]}
                    <li>
                        {targetPath}:
                        <ul>
                            <li>length: {targetInfo.length}</li>
                            {#each Object.entries(targetInfo.hashes) as [hashFn, digest]}
                                <li>{hashFn} hash: <code>{digest}</code></li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </li>
    {/if}
    <li>version: {metadata.version}</li>
</ul>
