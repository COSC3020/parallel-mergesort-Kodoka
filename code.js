const { StaticPool } = require("node-worker-threads-pool");

// Merge two sroted arrays.
function merge(left, right)
{
    var result = [];
    var i = 0;
    var j = 0;
    while(i < left.length && j < right.length)
    {
        if(left[i] <= right[j])
        {
            result.push(left[i++]);
        }
        else
        {
            result.push(right[j++]);
        }
    }

    // Append anything leftover.
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Worker pool. Every split runs mergesort.
const pool = new StaticPool({
    size: 8,
    task: (subarray) => 
    {
        function mergesort(array)
        {
            // Bypass base case, as single elements are trivally sorted.
            var sortWidth = 2;

            // Keep sorting subarrays 'til the entire array is encompassed
            // in a single sort.
            while(sortWidth < 2 * array.length)
            {
                // Calculate the number of subarrays of length sortWidt to
                // be sorted ths round.
                var numSubArrays = Math.ceil(array.length / sortWidth);

                // For each subarray, merge the sorted halves.
                for(var subArrayIndex = 0; subArrayIndex < array.length; subArrayIndex++)
                {
                    var leftSortBound = sortWidth * subArrayIndex;
                    // Stat of right subarray.
                    var subArrayMid = leftSortBound + Math.floor(sortWidth / 2);
                    // End of current array/subarray.
                    var rightSortBound = Math.min(leftSortBound + sortWidth, array.length);

                    // Skip merge if right half doesn't exist.
                    if(subArrayMid >= rightSortBound)
                    {
                        continue;
                    }

                    // Merge subarrays in palce by iterating through elements.
                    var leftIndex = leftSortBound;
                    var rightIndex = subArrayMid;

                    while(leftIndex < rightIndex && rightIndex < rightSortBound)
                    {
                        // If the current element in the left subarray is in
                        // correct place, move on.
                        if(array[leftIndex] <= array[rightIndex])
                        {
                            leftIndex++;
                        }
                        // Else, move the element at rightIndex to leftIndex.
                        else
                        {
                            var temp = array[rightIndex];
                            // Shift all elements from leftIndex through
                            // rightIndex - 1 one to the right.
                            for(var shiftIndex = rightIndex; shiftIndex > leftIndex; shiftIndex--)
                            {
                                array[shiftIndex] = array[shiftIndex - 1];
                            }

                            // Temp moves to correct spot after shifting.
                            array[leftIndex] = temp;
                            leftIndex++;
                            rightIndex++;
                            subArrayMid++;
                        }
                    }
                }

                // Double sortWidth, next sort will handle two subarrays
                // worth of elements as current iteration's.
                sortWidth *= 2;
            }

            return array;
        }

        // Sort this chunk.
        return mergesort(subarray);
    }
});

async function parallelMergeSort(array)
{
    // Base case, array of <= 1 element is trivially sorted.
    if(array.length <= 1)
    {
        return array;
    }

    var mid = Math.floor(array.length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid);

    // Fork, sort both halves in parallel.
    var [sortedLeft, sortedRight] = await Promise.all([
        pool.exec(left),
        pool.exec(right)
    ]);

    // Join, merge the sorted halves.
    return merge(sortedLeft, sortedRight);
}