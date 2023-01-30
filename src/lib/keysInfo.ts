let cached: { [id: string]: KeyInfo };

export async function getKeysInfo() {
    if (!cached) {
        cached = (await fetch("/api/keys").then((r) => r.json())) as { [id: string]: KeyInfo };
    }

    return cached;
}

export type KeyInfo = {
    datacenter: string,
    engine_path: string,
    name: string,
    public_key: string,
    __from_file: string,
}
