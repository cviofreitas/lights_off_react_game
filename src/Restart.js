import React, { useState } from "react";
import './Restart.css'
const Restart = ({ action }) => {
    const [clicked, setClicked] = useState(null)
    const setToClicked = () => {
        setClicked('clicked')
        setTimeout(() => {
            setClicked(null)
        }, 100);
    }
    return (<>
        <button className={`${clicked} restartButton`} onClick={() => {
            action();
            setToClicked();
        }}>Restart</button>
    </>
    )
}
export default Restart