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
    <div
      className="w-8 h-8 dynamic-image"
      style={{
        '--image-url': `url('${image}')`
      }}
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
