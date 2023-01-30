<script lang="ts">
    import BreadCrumbs from "$lib/BreadCrumbs.svelte";
    import TufJson from "$lib/TufJSON/TufJSON.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="topbar">
    <BreadCrumbs items={["files", data.path]} />
</div>

<main>
    <TufJson json={data.content}/>
</main>
