import { wait } from '@testing-library/user-event/dist/utils';
import { useState, useEffect, useRef } from 'react';
import NaviLogout from '../navigation/NaviLogout';
import './main.css';
// import mainBg from 'C:/Javascript/someus-app/src/img/bgB_main.png'

const Main = () => {
    const letters = useRef('그날그날 겪은 일이나 생각, 느낌 등을 함께 또 따로 기록하는 일기장');
    
    const letterIndex = useRef(0);
    const [message, setMessage] = useState('');
    
    const intervalId = setInterval(() => {
        const letter = letters.current.substr(letterIndex.current, 1);
        letterIndex.current ++;
        setMessage(message + letter);
        
        clearInterval(intervalId);
    }, 200);

    return(
        <>
        <NaviLogout />
        <div className="main_background">
            <h1 className='text'>{message}</h1>
        </div>
        <div className="footer">
            <div className="copyright">
                <p>Copyright &copy; SOMEUS</p>
            </div>
        </div>
        </>
    );
}

export default Main;