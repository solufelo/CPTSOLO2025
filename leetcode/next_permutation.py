from typing import List

def nextPermutation(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    # TODO: Write your optimal approach here
    pass

# Test harness to verify your solution
if __name__ == "__main__":
    test_cases = [
        [1, 2, 3],
        [3, 2, 1],
        [1, 1, 5],
        [1, 3, 2]
    ]
    for case in test_cases:
        original = case.copy()
        nextPermutation(case)
        print(f"Original: {original} -> Next Permutation: {case}")
