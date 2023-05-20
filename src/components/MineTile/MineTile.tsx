import { Transition } from '@headlessui/react'

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
import MineImage from '@/components/MineImage/MineImage.tsx'

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
  const image = status === 'REVEALED'
    ? isMine
      ? bombImage
      : MINE_COUNT_TO_IMAGE[mineCount]
    : STATUS_TO_IMAGE[status]

  if (status === 'REVEALED' && isMine) {
    return (
      <Transition
        appear={true}
        show={true}
        enter="transition-transform duration-500"
        enterFrom="scale-150"
        enterTo="scale-100"
      >
        <MineImage
          image={image}
          index={index}
          status={status}
        />
      </Transition>
    )
  }

  return (
    <MineImage
      image={image}
      index={index}
      status={status}
    />
  )
}

export default MineTile;
