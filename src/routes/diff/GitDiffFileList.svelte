<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import type { Readable } from "svelte/store";
    import FileDiffStatusItem from "./FileDiffStatusItem.svelte";

    export let fromRevision: Readable<string>;;
    export let toRevision: Readable<string | null>;

    let path: string;
    $: {
        path = `/api/diff/file-list?fromRevision=${$fromRevision}`;
        if ($toRevision) {
            path += `&toRevision=${$toRevision}`;
        }
    }
</script>

    <ul>
        <li>from: {$fromRevision}</li>
        <li>to:
            {#if $toRevision}
                {$toRevision}
            {:else}
                <i>working tree</i>
            {/if}
        </li>
    </ul>
    {#await fetch(path).then(r => r.json()) then diffFileList}
        <ul>
            {#each Object.entries(diffFileList) as [path, status]}
                <FileDiffStatusItem {path} {status}/>
            {/each}
        </ul>
    {/await}
