import { useState, useEffect } from 'react'

import DigitScreen from '@/components/DigitScreen/DigitScreen.tsx'
import { useMineContext } from '@/context/MineContext.tsx'

function TimerPanel () {
  const [count, setCount] = useState(0)
  const { started, ended } = useMineContext()

  useEffect(() => {
    if (started && !ended) {
      const intervalId = setInterval(() => {
        setCount(c => c + 1)
      }, 1000)

      return () => {
        clearTimeout(intervalId)
      }
    } else if (!started) {
      setCount(0)
    }
  }, [started, ended])

  return (
    <DigitScreen
      digits={3}
      value={count}
    />
  )
}

export default TimerPanel
