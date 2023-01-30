<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import { getFromRevision, getToRevision } from "$lib/git";
    import GitDiffFileList from "./GitDiffFileList.svelte";
</script>

<nav class="sidebar">
    {#await Promise.all([getFromRevision(), getToRevision()]) then [fromRevision, toRevision]}
        <GitDiffFileList {fromRevision} {toRevision} />
    {/await}
</nav>

<slot />
