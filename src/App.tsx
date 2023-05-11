import { MineProvider } from '@/context/MineContext.tsx'
import MineBoard from '@/components/MineBoard/MineBoard.tsx'
import MinePanel from '@/components/MinePanel/MinePanel.tsx'

function App() {
  return (
    <MineProvider>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-gray-400 p-[5px]">
          <MinePanel />
          <MineBoard />
        </div>
      </div>
    </MineProvider>
  )
}

export default App
