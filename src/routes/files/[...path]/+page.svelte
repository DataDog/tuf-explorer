<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

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
