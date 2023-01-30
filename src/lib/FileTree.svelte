<script lang="ts">
    import { joinPath } from "$lib/utils";
    export let dir: any;
    export let path: string;
</script>

<ul>
    {#each Object.entries(dir) as [name, subdirContent]}
        {#if subdirContent}
            <li>
                {name}
                <svelte:self dir={subdirContent} path={path+"/"+name}/>
            </li>
        {:else}
            <li><a href={joinPath([path, name])}>{name}</a></li>
        {/if}
    {/each}
</ul>
