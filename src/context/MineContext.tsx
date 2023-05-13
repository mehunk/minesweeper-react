import React, { createContext, useContext, useState } from 'react'

import { getMineSet, getMineTiles, revealEmptyTile } from '@/utils/mine.ts'

interface MineContextType {
  mineTiles: MineTile[];
  won: boolean;
  bombed: boolean;
  started: boolean;
  ended: boolean;
  revealing: boolean;
  flagCount: number;
}

interface MineHandleContextType {
  init: () => void;
  handleClick: (i: number) => void;
  handleRightClick: (i: number) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
}

const initialMineContext: MineContextType = {
  mineTiles: [],
  won: false,
  bombed: false,
  started: false,
  ended: false,
  revealing: false,
  flagCount: 0,
}

const initialMineHandleContext: MineHandleContextType = {
  init: () => void 0,
  handleClick: () => void 0,
  handleRightClick: () => void 0,
  handleMouseDown: () => void 0,
  handleMouseUp: () => void 0,
}

const MineContext = createContext<MineContextType>(initialMineContext)
const MineHandleContext = createContext<MineHandleContextType>(initialMineHandleContext)

export function useMineContext() {
  return useContext(MineContext)
}

export function useMineHandleContext() {
  return useContext(MineHandleContext)
}

export function MineProvider({ children }: { children: React.ReactNode }) {
  const rowCount = 9
  const colCount = 9
  const mineCount = 10
  const [mineSet, setMineSet] = useState(getMineSet(rowCount, colCount, mineCount))
  const [mineTiles, setMineTiles] = useState(getMineTiles(rowCount, colCount, mineSet))
  const [flagCount, setFlagCount] = useState(mineCount)
  const [revealing, setRevealing] = useState(false)
  const [started, setStarted] = useState(false)

  const won = mineTiles.every(mineTile => mineTile.status === 'REVEALED' || mineTile.isMine)
  const bombed = mineTiles.some(mineTile => mineTile.status === 'REVEALED' && mineTile.isMine)
  const ended = won || bombed

  const triggerLeftBombs = (leftBombs: number[]) => {
    leftBombs.forEach((bombIndex, i) => {
      setTimeout(() => {
        setMineTiles(mineTiles => {
          const newMineTiles = [...mineTiles]
          newMineTiles[bombIndex] = {
            ...newMineTiles[bombIndex],
            status: 'REVEALED'
          }
          return newMineTiles
        })
      }, 50 * (i + 1))
    })
  }

  const init = () => {
    const set = getMineSet(rowCount, colCount, mineCount)
    setMineSet(set)
    setMineTiles(getMineTiles(rowCount, colCount, set))
    setFlagCount(mineCount)
    setStarted(false)
  }

  const handleClick = (i: number) => {
    if (ended || mineTiles[i].status !== 'HIDDEN') return
    if (!started) {
      setStarted(true)
    }
    const newMineTiles = [...mineTiles]
    if (mineTiles[i].isMine || mineTiles[i].mineCount !== 0) {
      newMineTiles[i] = {
        ...newMineTiles[i],
        status: 'REVEALED'
      }
      if (mineTiles[i].isMine) {
        const leftBombs = new Set<number>(mineSet)
        leftBombs.delete(i)
        triggerLeftBombs([...leftBombs])
      }
    } else {
      revealEmptyTile(newMineTiles, i)
    }

    setMineTiles(newMineTiles)
  }

  const handleRightClick = (i: number) => {
    if (ended || mineTiles[i].status === 'REVEALED') return
    setStarted(true)
    const newMineTiles = [...mineTiles]
    switch (mineTiles[i].status) {
      case 'HIDDEN': {
        if (flagCount === 0) return
        newMineTiles[i] = {
          ...newMineTiles[i],
          status: 'FLAGGED'
        }
        setFlagCount(fc => fc - 1)
        break
      }
      case 'FLAGGED': {
        newMineTiles[i] = {
          ...newMineTiles[i],
          status: 'QUESTION'
        }
        setFlagCount(fc => fc + 1)
        break
      }
      case 'QUESTION': {
        newMineTiles[i] = {
          ...newMineTiles[i],
          status: 'HIDDEN'
        }
        break
      }
    }
    setMineTiles(newMineTiles)
  }

  const handleMouseDown = () => {
    setRevealing(true)
  }

  const handleMouseUp = () => {
    setRevealing(false)
  }

  return (
    <MineContext.Provider
      value={{
        mineTiles,
        won,
        bombed,
        started,
        ended,
        revealing,
        flagCount
      }}
    >
      <MineHandleContext.Provider
        value={{
          init,
          handleClick,
          handleRightClick,
          handleMouseDown,
          handleMouseUp
        }}
      >
        {children}
      </MineHandleContext.Provider>
    </MineContext.Provider>
  )
}
