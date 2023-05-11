import { getImageUrl } from '@/utils/image-url.ts'
import { useMineHandleContext } from '@/context/MineContext.tsx'

interface Props extends MineTile {
  index: number
}

const STATUS_TO_IMAGE: {[index in Exclude<MineStatus, 'REVEALED'>]: string} = {
  'HIDDEN': 'tile_normal.png',
  'FLAGGED': 'tile_flag.png',
  'QUESTION': 'tile_question.png',
}

function MineTile ({
  index,
  status,
  isMine,
  mineCount,
}: Props) {
  const { handleClick, handleRightClick, handleMouseDown, handleMouseUp } = useMineHandleContext()

  const image = status === 'REVEALED'
    ? isMine ? 'tile_bomb.png' : `tile_${mineCount}.png`
    : STATUS_TO_IMAGE[status]

  return (
    <img
      src={getImageUrl(image)}
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
