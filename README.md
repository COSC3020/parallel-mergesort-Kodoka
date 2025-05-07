# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

## My Runtime Analysis

My parallel mergesort does two main things: it forks two tasks in parallel,
with
'''javascript
var [sortedLeft, sortedRight] = await Promise.all([
    pool.exec(left),
    pool.exec(right)
]);

'''

## Sources

I relied on the code examples within lecture04-parallel.pdf from the class
presentation for the parallel framework to get my code to work.  

I adapted the code from my mergesort exercise, in tandem with the code from
above to make my code:  

https://github.com/COSC3020/mergesort-Kodoka  

I was having difficulty getting my test code to function, as I hadn't defined
pool, before trying to destroy it at the end of my tests. I prompted chatGPT
model 4o with my test code, along with the error that was being thrown, then
used it's suggestion to fix the problem.  

In determining and better understanding span of parallel processes, I
referenced the following source:  

https://courses.cs.washington.edu/courses/cse332/16sp/lectures/Lecture18/18a.pdf?utm_source=chatgpt.com  

## Plagiarism Notice

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
