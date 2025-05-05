const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js') + '\n' + \global.__POOL__ = pool');

(async () => {
    // Test 1, empty array.
    {
        var input = [];
        var expected = [];
        var output = await parallelMergeSort(input);
        assert(JSON.stringify(expected) == JSON.stringify(output),
            "Test 1 failed.");
    }

    // Test 2, one element.
    {
        var input = [42];
        var expected = [42];
        var output = await parallelMergeSort(input);
        assert(JSON.stringify(expected) == JSON.stringify(output),
            "Test 2 failed.");
    }

    // Test 3, two elements.
    {
        var input = [2, 1];
        var expected = [1, 2];
        var output = await parallelMergeSort(input);
        assert(JSON.stringify(expected) == JSON.stringify(output),
            "Test 3 failed.");
    }

    // Test 4, duplicate numbers.
    {
        var input = [4, 1, 5, 3, 5, 2, 1, 2, 4, 5, 1];
        var expected = [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5];
        var output = await parallelMergeSort(input);
        assert(JSON.stringify(expected) == JSON.stringify(output),
            "Test 4 failed.");
    }

    // Test 5, negative numbers.
    {
        var input = [6, 3, -2, 7, -10, 3, 0, -74, 65];
        var expected = [-74, -10, -2, 0, 3, 3, 6, 7, 65];
        var output = await parallelMergeSort(input);
        assert(JSON.stringify(expected) == JSON.stringify(output),
            "Test 5 failed.");
    }

    // Test 6, large already sorted array.
    {
        var input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20];
        var expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            16, 17, 18, 19, 20];
        var output = await parallelMergeSort(input);
        assert(JSON.stringify(expected) == JSON.stringify(output),
            "Test 6 failed.");
    }

    const pool = global.__POOL__;
    pool.destroy();
})();
