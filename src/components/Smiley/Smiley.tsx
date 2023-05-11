import { useState } from 'react'

import SmileyNormal from '@/assets/images/smiley_normal.png'
import SmileyWon from '@/assets/images/smiley_win.png'
import SmileyBombed from '@/assets/images/smiley_lose.png'
import SmileyPressed from '@/assets/images/smiley_pressed.png'
import SmileyScared from '@/assets/images/smiley_scared.png'

import { useMineContext, useMineHandleContext } from '@/context/MineContext.tsx'

function Smiley () {
  const [pressed, setPressed] = useState(false)
  const { won, bombed, revealing } = useMineContext()
  const { init } = useMineHandleContext()

  let smiley = SmileyNormal
  if (bombed) {
    smiley = SmileyBombed
  } else if (pressed) {
    smiley = SmileyPressed
  } else if (revealing) {
    smiley = SmileyScared
  } else if (won) {
    smiley = SmileyWon
  }

  return (
    <img
      src={smiley}
      alt="smiley"
      className="w-12 h-12"
      onClick={init}
      onMouseDown={e =>{
        e.button === 0 && setPressed(true)
      }}
      onMouseUp={e => {
        e.button === 0 && setPressed(false)
      }}
    />
  )
}

export default Smiley;
