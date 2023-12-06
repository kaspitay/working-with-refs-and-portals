import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";
export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const timer = useRef();
    const dialog = useRef();

    function startHandler() {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open();
        }, targetTime * 1000);

        setTimerStarted(true);
    }

    function stopHandler() {
        clearTimeout(timer.current);
        setTimerStarted(false);
        setTimerExpired(false);
    }
    return (
        <>
            { <ResultModal  ref ={dialog} result="lost" targetTime={targetTime} closeHandler  ={stopHandler}/>}
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p> <button onClick={timerStarted ? stopHandler : startHandler}>
                    {timerStarted ? 'Stop' : 'Start'}
                </button></p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}