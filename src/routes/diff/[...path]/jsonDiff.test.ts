/**
Unless explicitly stated otherwise all files in this repository are licensed under the Apache-2 License.

This product includes software developed at Datadog (https://www.datadoghq.com/)  Copyright 2023-present Datadog, Inc.
**/

import { assert, expect, test } from 'vitest'
import { jsonDiff } from './jsonDiff'

test('jsonDiff', () => {
    assert.deepEqual(
        jsonDiff([], [{ name: 'foo' }]),
        [{
            "__diff": "added",
            "name": "foo",
        }],
    )
})
