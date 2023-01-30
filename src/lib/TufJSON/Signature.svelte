<script lang="ts">
    import type * as TUF from "./types";

    export let signature: TUF.Signature;
</script>

{#await fetch("/api/keys/" + signature.keyid).then((r) => r.json()) then key}
    <ul>
        <li>
            Key ID: <a href={"/keys/" + signature.keyid}
                >{key.name.replaceAll("_", " ")}</a
            >
        </li>
        <li>Signature: {signature.sig}</li>
    </ul>
{/await}

<style>
    ul {
        margin: 1em 0em;
    }

    a {
        text-decoration: none;
        background-color: rgb(240, 239, 253);
        padding: 0.15em 0.6em;
        border-radius: 0.3em;
        color: #585ebc;
    }

    a:hover {
        color: #232985;
        background-color: rgb(217, 224, 250);
    }
</style>
