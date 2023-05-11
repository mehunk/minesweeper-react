import DigitScreen from '@/components/DigitScreen/DigitScreen.tsx'
import { useMineContext } from '@/context/MineContext.tsx'

function FlagCountPanel () {
  const { flagCount } = useMineContext()

  return (
    <DigitScreen
      digits={3}
      value={flagCount}
    />
  )
}

export default FlagCountPanel
