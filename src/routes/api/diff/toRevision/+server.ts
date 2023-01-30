/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { toRevision, setToRevision } from '$lib/tufRepoFilesystem';
import type { RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async({ request }) => {
    setToRevision(await request.text());
    return new Response();
}

export const GET: RequestHandler = async() => {
    return new Response(toRevision);
}
