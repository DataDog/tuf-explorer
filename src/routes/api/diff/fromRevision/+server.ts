import { fromRevision, setFromRevision } from '$lib/tufRepoFilesystem';
import type { RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async({ request }) => {
    setFromRevision(await request.text());
    return new Response();
}

export const GET: RequestHandler = async() => {
    return new Response(fromRevision);
}
