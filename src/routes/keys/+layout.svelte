<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import { getKeysInfo } from "$lib/keysInfo";
</script>

{#await getKeysInfo() then keys }
<nav class="sidebar">
    <ul>
        {#each Object.entries(keys) as [id, key] }
            <li><a href={"/keys/"+id}>{key.name?.replaceAll("_", " ")}</a></li>
        {/each}
    </ul>
</nav>
{/await}

<slot />
