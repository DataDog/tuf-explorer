<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import { joinPath } from "$lib/utils";
    export let dir: any;
    export let path: string;
</script>

<ul>
    {#each Object.entries(dir) as [name, subdirContent]}
        {#if subdirContent}
            <li>
                {name}
                <svelte:self dir={subdirContent} path={path+"/"+name}/>
            </li>
        {:else}
            <li><a href={joinPath([path, name])}>{name}</a></li>
        {/if}
    {/each}
</ul>
