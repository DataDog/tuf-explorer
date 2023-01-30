<script lang="ts">
    import { keyInfoRootDir, reposRootDir } from "$lib/constants";
    import FileTree from "$lib/FileTree.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<nav class="sidebar">
    <FileTree
        dir={data.repoFiles}
        path={`/files/${reposRootDir}`}
    />

    <FileTree
        dir={data.helperFiles}
        path={"/files/"+keyInfoRootDir}
    />
</nav>

<slot />
