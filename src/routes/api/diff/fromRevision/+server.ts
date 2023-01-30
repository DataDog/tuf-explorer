/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { fromRevision, setFromRevision } from '$lib/tufRepoFilesystem';
import type { RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async({ request }) => {
    setFromRevision(await request.text());
    return new Response();
}

export const GET: RequestHandler = async() => {
    return new Response(fromRevision);
}
