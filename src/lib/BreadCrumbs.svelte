<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

    export let items: string[];

    let itemlinks: {text: string, href: string}[];
    $:{
        let path = "";
        itemlinks = [];

        for (const item of items.slice(0, -1)) {
            path = path+'/'+item;
            itemlinks.push({text: item, href: path});
        }
    }
</script>

<nav>
    <a href="/">TUF Explorer</a>
    {#each itemlinks as itemlink}
        / <a href={itemlink.href}>{itemlink.text}</a>
    {/each}
    {#if items?.length }
        / <span>{items[items.length-1]}</span>
    {/if}
</nav>

<style>
    nav {
        line-height: 300%;
    }

    a, span {
        padding: .5em;
    }
</style>
