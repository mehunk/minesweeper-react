import Smiley from '@/components/Smiley/Smiley.tsx'
import FlagCountPanel from '@/components/FlagCountPanel/FlagCountPanel.tsx'
import TimerPanel from '@/components/TimerPanel/TimerPanel.tsx'

function MinePanel () {
  return (
    <div className="px-3 py-2 mb-[5px] flex justify-between items-center">
      <FlagCountPanel />
      <Smiley />
      <TimerPanel />
    </div>
  )
}

export default MinePanel
