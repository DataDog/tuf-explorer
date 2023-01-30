import { writable, type Writable } from 'svelte/store';

let toRevision: Writable<string | null>;

export async function getToRevision() {
    if (toRevision == undefined) {
        const initialValue = await fetch('/api/diff/toRevision').then(r => r.text());

        toRevision = writable<string | null>(initialValue);

        toRevision.subscribe(async (value) => {
            const response = await fetch('/api/diff/toRevision', {
                method: 'PUT',
                body: value,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        })
    }

    return toRevision;
}

let fromRevision: Writable<string>;

export async function getFromRevision() {
    if (fromRevision == undefined) {
        const initialValue = await fetch('/api/diff/fromRevision').then(r => r.text());

        fromRevision = writable<string>(initialValue);

        fromRevision.subscribe(async (value) => {
            const response = await fetch('/api/diff/fromRevision', {
                method: 'PUT',
                body: value,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        })
    }

    return fromRevision;
}
