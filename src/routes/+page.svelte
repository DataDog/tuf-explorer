<script lang="ts">
    import type { PageData } from "./$types";
    import BreadCrumbs from "$lib/BreadCrumbs.svelte";

    export let data: PageData;
</script>

<div class="topbar">
    <BreadCrumbs items={[]}/>
</div>

<nav>
    <ul>
        <li><a href="/files/">files</a></li>
        <li><a href="/diff/">diff</a></li>
        <li><a href="/keys/">keys</a></li>
    </ul>
</nav>

<main>
    <p>
        Root directory:
        <code>{data.rootDir}</code>
    </p>
    <p>
        Key info root directory:
        <code>{data.keyInfoRootDir}</code>
    </p>
</main>
