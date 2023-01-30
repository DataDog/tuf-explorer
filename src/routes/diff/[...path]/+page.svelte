<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    import BreadCrumbs from "$lib/BreadCrumbs.svelte";
    import { jsonDiff } from "./jsonDiff";
    import { renderDiffSide } from "./renderDiffSide";
    import type { PageData } from "./$types";

    export let data: PageData;

    let diff: any;
    $: {
        diff = jsonDiff(JSON.parse(data.before), JSON.parse(data.after))
    }
</script>

<div class="topbar">
    <BreadCrumbs items={["diff", data.path]} />
</div>

<main>
    <!-- <pre>{JSON.stringify(diff, null, 4)}</pre>
    <pre>{JSON.stringify(diff, null, 4)}</pre> -->
    <h1>{data.path}</h1>

    <div class="side-by-side">
        {#if diff}
            <pre>{@html renderDiffSide(diff, "before")}</pre>
            <pre>{@html renderDiffSide(diff, "after")}</pre>
        {/if}
    </div>
</main>

<style>
    .side-by-side {
        display: grid;
        grid-template-columns: min-content min-content;
    }

    main :global(span.changed) {
        background-color: rgb(201, 221, 239);
    }
    main :global(span.removed) {
        background-color: rgb(239, 208, 201);
        display: block;
    }
    main :global(span.added) {
        background-color: rgb(209, 238, 201);
        display: block;
    }
    main :global(span.blank) {
        display: block;
        background-color: #EEE;
    }
</style>
