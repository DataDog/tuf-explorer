<script lang="ts">
    export let path: string;
    export let status: string;
</script>

{#if path.endsWith(".json")}
    <li class={status}>
        <a href={"/diff/" + path}>({status}) {path}</a>
    </li>
{:else}
    <li class="not-json">
        ({status}) {path}
    </li>
{/if}

<style>
    a {
        color: inherit;
        text-decoration: none;
    }

    li {
        margin: .25em 0;
    }

    li.A {
        color: green;
    }

    li.D {
        color: red;
    }

    li.M {
        color: dodgerblue;
    }

    li.not-json {
        color: #888;
    }
</style>
