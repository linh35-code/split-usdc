function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function computeEqualShares(
  totalAmount: number,
  participantIds: string[],
  payerId: string
): Record<string, number> {
  const shareEach = round2(totalAmount / participantIds.length);
  const shares: Record<string, number> = {};
  let othersSum = 0;
  for (const id of participantIds) {
    if (id !== payerId) {
      shares[id] = shareEach;
      othersSum += shareEach;
    }
  }
  shares[payerId] = round2(totalAmount - othersSum);
  return shares;
}

export { round2 };
