<script lang="ts">
    import type { KeyInfo } from "$lib/keysInfo";
    import type { RootMetadata } from "./types";
    import Key from "./Key.svelte";

    export let metadata: RootMetadata;
    export let keys: { [id: string]: KeyInfo };
    export let showKeys: boolean;
</script>

<ul>
    <li>type: {metadata._type}</li>
    <li>expires: {metadata.expires}</li>
    <ul>
        <li>type: {metadata._type}</li>
        <li>expires: {metadata.expires}</li>
        <li>
            keys:
            <input type="checkbox" id="showKeys" bind:checked={showKeys} />
            <label for="showKeys">show</label>
            {#if showKeys}
                <pre>{JSON.stringify(metadata.keys, null, "    ")}</pre>
            {/if}
        </li>
        <li>
            roles:
            <ul>
                {#each Object.entries(metadata.roles) as [name, info]}
                    <li>
                        {name}:
                        <ul>
                            <li>
                                keys:
                                <ul>
                                    {#each info.keyids as keyid}
                                        <li>
                                            <Key
                                                id={keyid}
                                                keyInfo={keys[keyid]}
                                            />
                                        </li>
                                    {/each}
                                </ul>
                            </li>
                            <li>threshold: {info.threshold}</li>
                        </ul>
                    </li>
                {/each}
            </ul>
        </li>
        <li>spec version: {metadata.spec_version}</li>
        <li>version: {metadata.version}</li>
    </ul>
</ul>
