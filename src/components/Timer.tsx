import { FC, useEffect, useRef, useState } from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors'

interface TimerProps {
  currentPlayer: Player | null
  restart: () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback =
      currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1)
  }
  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1)
  }

  const handleRestart = () => {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  const addSeconds= () => {
    setWhiteTime((prev) => prev + 15)
    setBlackTime((prev) => prev + 15)
  }

  return (
    <div style={{border: '1px solid green', padding: '6px'}}>
      <div>
        <button onClick={handleRestart} className='mr-16'
       style={{ padding: '6px'}}
        >Начать сначала</button>
        <button onClick={addSeconds}
         style={{ padding: '6px'}}
        >Добавить игрокам по 15 секунд</button>
      </div>
      <div className='flex-center'
         style={{ marginTop: '8px'}}
      
      >
        <h2>Черные - {blackTime}</h2>
        <h2 
         style={{ margin: '0 15px'}}
        >Белые - {whiteTime}</h2>
      </div>
    </div>
  )
}

export default Timer
