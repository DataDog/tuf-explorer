<script lang="ts">
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
