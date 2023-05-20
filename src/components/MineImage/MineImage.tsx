import { useMineHandleContext } from '@/context/MineContext.tsx'

interface Props {
  index: number
  status: MineStatus
  image: string
}

function MineImage ({
  index,
  status,
  image
}: Props
) {
  const { handleClick, handleRightClick, handleMouseDown, handleMouseUp } = useMineHandleContext()

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

export default MineImage
