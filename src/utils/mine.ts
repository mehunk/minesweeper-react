export function getMineSet (rowCount: number, colCount: number, mineCount: number): Set<number> {
  const mineSet = new Set<number>();
  while (mineSet.size < mineCount) {
    mineSet.add(Math.floor(Math.random() * rowCount * colCount));
  }
  return mineSet;
}

export function getMineTiles (rowCount: number, colCount: number, mineSet: Set<number>): MineTile[] {
  const mineTiles: MineTile[] = new Array(rowCount * colCount).fill(0).map(() => ({
    status: 'HIDDEN',
    isMine: false,
    mineCount: 0
  }));

  for (const mineIndex of mineSet) {
    mineTiles[mineIndex].isMine = true;
  }

  for (let i = 0; i < 81; i++) {
    const mineTile = mineTiles[i];
    if (mineTile.isMine) {
      mineTile.mineCount = -1;
    } else {
      mineTile.mineCount = calculateMineCount(mineTiles, i);
    }
  }

  return mineTiles
}

function calculateMineCount (mineTiles: MineTile[], index: number): number {
  const x = index % 9;
  const y = Math.floor(index / 9);
  let mineCount = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const x2 = x + dx;
      const y2 = y + dy;
      if (x2 < 0 || x2 >= 9) continue;
      if (y2 < 0 || y2 >= 9) continue;
      // If calculated index is not valid
      const index = y2 * 9 + x2
      if (index >= mineTiles.length) continue;
      const mineTile = mineTiles[index];
      if (mineTile.isMine) mineCount++;
    }
  }
  return mineCount;
}

export function revealEmptyTile (mineTiles: MineTile[], index: number): void {
  const x = index % 9;
  const y = Math.floor(index / 9);
  const mineTile = mineTiles[index];
  if (
    mineTile.status !== 'HIDDEN' ||
    mineTile.isMine
  ) return;
  mineTiles[index] = {
    ...mineTile,
    status: 'REVEALED'
  };
  if (mineTile.mineCount > 0) {
    return
  }
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const x2 = x + dx;
      const y2 = y + dy;
      if (x2 < 0 || x2 >= 9) continue;
      if (y2 < 0 || y2 >= 9) continue;
      // If calculated index is not valid
      const index = y2 * 9 + x2
      if (index >= mineTiles.length) continue;
      revealEmptyTile(mineTiles, index);
    }
  }
}
