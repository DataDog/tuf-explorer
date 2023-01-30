<script lang="ts">
    import { getFromRevision, getToRevision } from "$lib/git";
    import GitDiffFileList from "./GitDiffFileList.svelte";
</script>

<nav class="sidebar">
    {#await Promise.all([getFromRevision(), getToRevision()]) then [fromRevision, toRevision]}
        <GitDiffFileList {fromRevision} {toRevision} />
    {/await}
</nav>

<slot />
