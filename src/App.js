import React, {useEffect, useRef} from 'react';
import {degree} from './App.utils';
import './App.css';

function App() {
  const hour = useRef(null);
  const minute = useRef(null);
  const second = useRef(null);

  useEffect(() => {
    const test = setInterval(() => {
      const date = new Date();
      const hh = date.getHours() * 30;
      const mm = date.getMinutes() * degree;
      const ss = date.getSeconds() * degree;

      hour.current.style.transform = `rotate(${hh + (mm / 12)}deg)`;
      minute.current.style.transform = `rotate(${mm}deg)`;
      second.current.style.transform = `rotate(${ss}deg)`;
    }, 1000);

    return () => clearInterval(test);
  }, []);


  return (
    <div className={'App'}>
      <div className={'container'}>
        <div className={'circle'}></div>
        <div className={'circle'}></div>

        <div className={'clock'}>
          {new Array(60).fill('').map((_, index) => {
            const rotate = `rotate(${( index + 1)  * 6}deg)`;
            return (<div className={'graduations'} style={{transform: rotate}}>
              <div className={'stick'}></div>
            </div>)
          })}

          <div className={'indicator'}>
            <div ref={hour} className={'hand hour'}></div>
            <div ref={minute} className={'hand minute'}></div>
            <div ref={second} className={'hand second'}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
