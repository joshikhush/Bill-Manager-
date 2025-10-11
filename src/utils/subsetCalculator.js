/**
 * Finds a subset of bills with the smallest number of bills such that:
 *   1) sum(subset) <= budget
 *   2) No leftover bill can be added without exceeding the budget
 *
 * Returns array of bill IDs that meet these conditions.
 */
export function findMinimalSubset(bills, budget) {
  const allSubsets = [];
  backtrack(bills, 0, [], 0, budget, allSubsets);

  // Keep only subsets that can't fit any leftover
  const validSubsets = allSubsets.filter((subset) => {
    const subsetSum = sumAmounts(subset);
    const leftover = bills.filter((b) => !subset.includes(b));
    // If we can add any leftover without exceeding the budget, it's not valid
    return !leftover.some((l) => subsetSum + l.amount <= budget);
  });

  if (validSubsets.length === 0) return [];

  // Sort by size (ascending) and pick the first
  validSubsets.sort((a, b) => a.length - b.length);
  const minimal = validSubsets[0];

  // Return IDs only
  return minimal.map((b) => b.id);
}

function backtrack(bills, start, currentSubset, currentSum, budget, allSubsets) {
  allSubsets.push([...currentSubset]);

  for (let i = start; i < bills.length; i++) {
    const bill = bills[i];
    if (currentSum + bill.amount <= budget) {
      // Choose
      currentSubset.push(bill);
      backtrack(bills, i + 1, currentSubset, currentSum + bill.amount, budget, allSubsets);
      // Backtrack
      currentSubset.pop();
    }
  }
}

function sumAmounts(subset) {
  return subset.reduce((acc, b) => acc + b.amount, 0);
}
