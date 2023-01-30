<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import BreadCrumbs from "$lib/BreadCrumbs.svelte";
    import { getFromRevision, getToRevision } from "$lib/git";
    import type { PageData } from "./$types";

    export let data: PageData;

    let error: string | null;

    async function onSetToRevision(e: SubmitEvent) {
        e.preventDefault();

        error = null;

        const formData = new FormData(e.target as HTMLFormElement);
        const commits = formData.getAll('commit');

        if (commits.length != 2) {
            error = 'must select exactly 2 commits';
            return;
        }

        const [t, f] = commits as [string, string];

        console.log([t, f]);

        const toRevision = await getToRevision();
        toRevision.set(t === "null" ? null : t);

        const fromRevision = await getFromRevision();
        fromRevision.set(f);
    }
</script>

<div class="topbar">
    <BreadCrumbs items={["diff"]} />
</div>

<main>
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <form on:submit={onSetToRevision}>
        <div>
            <input type="checkbox" name="commit" id="null" value="null">
            <label for="null">
                <span class="hash"><i>working tree</i></span>
            </label>
        </div>
        {#each data.log as [hash, line]}
            <div>
                <input type="checkbox" name="commit" id={hash} value={hash}>
                <label for={hash}>
                    <span class="hash">{hash}</span>
                    {line}
                </label>
            </div>
        {/each}
        <button type="submit">change from/to commits</button>
    </form>
</main>

<style>
    .error {
        background-color: rgb(255, 211, 211);
        color: rgb(143, 2, 2);
    }

    span.hash {
        color: #888;
    }

    form div {
        padding: 0.3em 0em;
    }
    form div:nth-child(odd) {
        background-color: rgba(0,0,0,.03);
    }
    form div:hover {
        background-color: rgba(0, 0, 0, .07);
    }
</style>
