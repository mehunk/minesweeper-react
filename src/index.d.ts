type MineStatus = 'HIDDEN' | 'FLAGGED' | 'QUESTION' | 'REVEALED'

interface MineTile {
  status: MineStatus;
  isMine: boolean;
  mineCount: number;
}
