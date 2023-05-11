import tileNormalImage from '@/assets/images/tile_normal.png'
import tileFlagImage from '@/assets/images/tile_flag.png'
import tileQuestionImage from '@/assets/images/tile_question.png'
import bombImage from '@/assets/images/tile_bomb.png'
import tileCount0Image from '@/assets/images/tile_0.png'
import tileCount1Image from '@/assets/images/tile_1.png'
import tileCount2Image from '@/assets/images/tile_2.png'
import tileCount3Image from '@/assets/images/tile_3.png'
import tileCount4Image from '@/assets/images/tile_4.png'
import tileCount5Image from '@/assets/images/tile_5.png'
import tileCount6Image from '@/assets/images/tile_6.png'
import tileCount7Image from '@/assets/images/tile_7.png'
import tileCount8Image from '@/assets/images/tile_8.png'
import { useMineHandleContext } from '@/context/MineContext.tsx'

interface Props extends MineTile {
  index: number
}

const STATUS_TO_IMAGE: {[index in Exclude<MineStatus, 'REVEALED'>]: string} = {
  HIDDEN: tileNormalImage,
  FLAGGED: tileFlagImage,
  QUESTION: tileQuestionImage,
}
const MINE_COUNT_TO_IMAGE: {[index: number]: string} = {
  0: tileCount0Image,
  1: tileCount1Image,
  2: tileCount2Image,
  3: tileCount3Image,
  4: tileCount4Image,
  5: tileCount5Image,
  6: tileCount6Image,
  7: tileCount7Image,
  8: tileCount8Image
}

function MineTile ({
  index,
  status,
  isMine,
  mineCount,
}: Props) {
  const { handleClick, handleRightClick, handleMouseDown, handleMouseUp } = useMineHandleContext()

  const image = status === 'REVEALED'
    ? isMine
      ? bombImage
      : MINE_COUNT_TO_IMAGE[mineCount]
    : STATUS_TO_IMAGE[status]

  return (
    <img
      src={image}
      alt="tile"
      className="w-8 h-8"
      onClick={() => handleClick(index)}
      onContextMenu={e => {
        e.preventDefault()
        handleRightClick(index)
      }}
      onMouseDown={e => {
        e.button === 0 && status === 'HIDDEN' && handleMouseDown()
      }}
      onMouseUp={e => {
        e.button === 0 && status === 'HIDDEN' && handleMouseUp()
      }}
    />
  )
}

export default MineTile;
