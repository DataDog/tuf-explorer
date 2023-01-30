<svelte:head>
    <!-- Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.
    This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc. -->

    <link rel="stylesheet" href="/main.css" />
</svelte:head>

<div>
    <slot />
</div>

<style>
    div {
        display: grid;
        height: 100vh;
        grid-template-columns: 25em auto;
        grid-template-rows: min-content auto;
        grid-template-areas:
            "topbar topbar"
            "sidebar main";
    }

    div > :global(.sidebar),
    div > :global(main) {
        overflow-y: scroll;
        padding-bottom: 3em;
    }

    div > :global(.sidebar) {
        grid-area: sidebar;
    }
    div > :global(main) {
        grid-area: main;
    }

    div > :global(div.topbar) {
        grid-area: topbar;
    }
</style>
