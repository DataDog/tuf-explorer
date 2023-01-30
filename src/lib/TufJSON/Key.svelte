<script lang="ts">
  import type { KeyInfo } from "$lib/keysInfo";

  export let id: string;
  export let keyInfo: KeyInfo;

  let unknown: boolean;
  $: {
    unknown = !Boolean(keyInfo?.name);
  }
</script>

<a href={"/keys/" + id} class:unknown>
  {#if unknown}
    (unknown) {id}
  {:else}
    {keyInfo.name.replaceAll("_", " ")}
  {/if}
</a>

<style>
  a {
    text-decoration: none;
    background-color: rgb(245, 245, 245);
    padding: 0.15em 0.6em;
    border-radius: 0.3em;
    color: #4960a5;
  }

  a:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(14, 83, 192);
    z-index: 10;
    position: relative;
  }

  a.unknown {
    background-color: rgb(250, 240, 230);
    color: rgb(130, 40, 25);
  }
</style>
