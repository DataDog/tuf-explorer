<script lang="ts">
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
