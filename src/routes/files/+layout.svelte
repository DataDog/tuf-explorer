<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

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
