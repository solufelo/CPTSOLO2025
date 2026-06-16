#include <iostream>
#include <vector>
#include <algorithm>

class Solution {
public:
    void nextPermutation(std::vector<int>& nums) {
        // TODO: Write your optimal approach here
        
    }
};

void printVector(const std::vector<int>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << (i + 1 < vec.size() ? ", " : "");
    }
    std::cout << "]";
}

int main() {
    Solution solver;
    std::vector<std::vector<int>> test_cases = {
        {1, 2, 3},
        {3, 2, 1},
        {1, 1, 5},
        {1, 3, 2}
    };

    for (auto& case_vec : test_cases) {
        std::cout << "Original: ";
        printVector(case_vec);
        
        solver.nextPermutation(case_vec);
        
        std::cout << " -> Next Permutation: ";
        printVector(case_vec);
        std::cout << "\n";
    }

    return 0;
}
