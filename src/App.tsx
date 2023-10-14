import { MineProvider } from '@/context/MineContext.tsx'
import MineBoard from '@/components/MineBoard/MineBoard.tsx'
import MinePanel from '@/components/MinePanel/MinePanel.tsx'

function App() {
  return (
    <MineProvider>
      <div className="w-screen h-screen bg-teal-600 flex justify-center items-center">
        <div className="border-outside bg-[#C0C0C0] p-[5px]">
          <MinePanel />
          <MineBoard />
        </div>
      </div>
    </MineProvider>
  )
}

export default App
