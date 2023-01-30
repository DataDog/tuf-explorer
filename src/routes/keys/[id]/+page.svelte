<script lang="ts">
    import type { PageData } from "./$types";
    import BreadCrumbs from "$lib/BreadCrumbs.svelte";
    import { getKeysInfo } from "$lib/keysInfo";

    export let data: PageData;
</script>

<div class="topbar">
    <BreadCrumbs items={["keys", data.id]}/>
</div>

<main>
    {#await getKeysInfo() then keys}
        <ul>
            <li>name: {keys[data.id].name}</li>
            <li>datacenter: {keys[data.id].datacenter}</li>
            <li>vault engine path: {keys[data.id].engine_path}</li>
            <li>public key: <code>{keys[data.id].public_key}</code></li>
            <li>from file: {keys[data.id].__from_file}</li>
        </ul>
    {/await}
</main>
