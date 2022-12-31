import { useState, useEffect, useRef, Dispatch, SetStateAction, FC } from "react";
import { GrPowerReset } from "react-icons/gr";
import { BsFillPlayFill } from "react-icons/bs";

interface TimerProps {
  running: boolean
  setRunning: Dispatch<SetStateAction<boolean>>
  time: number
  setTime: Dispatch<SetStateAction<number>>
}

const Timer: FC<TimerProps> = ({running, setRunning, time, setTime}) => {
    const [message, setMessage] = useState<string | null>(null)
    const ref = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
    let interval: any;
    if (running) {
        interval = setInterval(() => {
            setTime((prevTime) => {
              if (prevTime - 10 <= 0) {
                setRunning(false)
                if (ref.current) ref.current.style.backgroundColor = "red";
                setMessage("you slow")
              }
              return prevTime - 10
            });
        }, 10);
    } else if (!running) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [running]);
    
    return (
      <div className="timer" ref={ref}>
        <div className="numbers">
          {(message) ? <span>{message}</span> : <><span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span><span>{("0" + ((time / 10) % 100)).slice(-2)}</span></>}          
        </div>
        <div className="buttons">
          <button onClick={() => setRunning(!running)}><BsFillPlayFill/></button>
          <button onClick={() => {setTime(5000); if (ref.current) ref.current.style.backgroundColor = "white"; setMessage(null)}}><GrPowerReset/></button>       
        </div>
      </div>
    );
  };
  
  export default Timer