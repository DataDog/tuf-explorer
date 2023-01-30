<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import type * as TUF from "./types";
    import Key from "./Key.svelte";
    import { getKeysInfo } from "$lib/keysInfo";
    import TargetsMetadata from "./TargetsMetadata.svelte";
    import RootMetadata from "./RootMetadata.svelte";

    export let json: TUF.SignedMetadata;

    let raw: boolean = false;
    let showKeys: boolean = false;
</script>

<input type="checkbox" id="raw" bind:checked={raw} />
<label for="raw">raw JSON</label>

{#if raw}
    <pre>{JSON.stringify(json, null, "    ")}</pre>
{:else}
    {#await getKeysInfo() then keys}
        <p>Signed By</p>
        <ul>
            {#each json.signatures as signature}
                <li>
                    <Key id={signature.keyid} keyInfo={keys[signature.keyid]} />
                </li>
            {/each}
        </ul>

        <p>Signed</p>
        {#if json.signed._type === "root"}
            <RootMetadata metadata={json.signed} {keys} {showKeys} />
        {:else}
            <TargetsMetadata metadata={json.signed} {keys} {showKeys} />
        {/if}
    {/await}
{/if}
