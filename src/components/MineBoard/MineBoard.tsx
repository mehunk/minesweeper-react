import { useMineContext } from '@/context/MineContext.tsx'
import MineTile from '@/components/MineTile/MineTile.tsx'

function MineBoard () {
  const { mineTiles } = useMineContext()

  return (
    <div className="grid grid-cols-9">
      {mineTiles.map((mineTile, i) => (
        <MineTile
          key={i}
          index={i}
          {...mineTile}
        />
      ))}
    </div>
  )
}

export default MineBoard
