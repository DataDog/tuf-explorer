<script lang="ts">
/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

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
