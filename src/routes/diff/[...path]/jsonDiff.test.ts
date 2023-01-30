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
