# LeetCode Learning Path — Vertical Slices

Tackle the absolute most fundamental and easiest tasks first, then build onwards. Undergo this path problem-by-problem.

Rule: **Retrieve before reveal.** Spend 20 minutes sketching logic/drawings on your tablet/whiteboard before looking at any solution.

---

## Slice 1: Arrays & Hashing — Two Sum (LeetCode 1)
* **Learn**: Trade space complexity for time complexity. $O(N)$ lookup with a Hash Map vs $O(N^2)$ brute force loops.
* **Core Concept**: `complement = target - nums[i]`. If complement exists in map, return indices.

## Slice 2: Two Pointers — Valid Palindrome (LeetCode 125)
* **Learn**: Converging search pointers from outside in.
* **Core Concept**: `left` starts at 0, `right` starts at length - 1. Skip non-alphanumeric, compare characters, increment left and decrement right.

## Slice 3: Sliding Window — Best Time to Buy and Sell Stock (LeetCode 121)
* **Learn**: Track a dynamic window of state in a single pass.
* **Core Concept**: Shift left pointer to buy day if a lower price is found. Otherwise, calculate profit and track max.

## Slice 4: Stack — Valid Parentheses (LeetCode 20)
* **Learn**: Last-In-First-Out (LIFO) operations for parsing nested structures.
* **Core Concept**: Push opening brackets onto stack. When a closing bracket is found, pop and verify it matches the top of the stack.

## Slice 5: Binary Search — Binary Search (LeetCode 704)
* **Learn**: Divide-and-conquer strategy to cut search space in half ($O(\log N)$).
* **Core Concept**: `mid = left + (right - left) / 2`. Compare target, shift pointers to middle.

## Slice 6: Linked Lists — Reverse Linked List (LeetCode 206)
* **Learn**: Pointer re-assignment without losing nodes.
* **Core Concept**: Track `prev`, `curr`, and `next_node`. Point `curr.next` to `prev`, then advance `prev` and `curr`.

## Slice 7: Trees — Invert Binary Tree (LeetCode 226)
* **Learn**: Recursive post-order traversal to swap structural children.
* **Core Concept**: Swap `node.left` and `node.right`, then recursively call on both subtrees.
