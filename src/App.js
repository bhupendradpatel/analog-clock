import React, {useEffect, useRef} from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import {setTimeForClock} from './App.utils';
import './App.css';

function App() {
	const hour = useRef(null);
	const minute = useRef(null);
	const second = useRef(null);

	useEffect(() => {
		setTimeForClock(hour, minute, second);

		const test = setInterval(() => setTimeForClock(hour, minute, second), 1000);

		return () => clearInterval(test);
	}, []);


	return (
		<div className={'App'}>
			<div className={'container'}> {/*  style={{visibility: loaded ? 'visible' : 'hidden'}} */}
				<div className={'circle'}></div>
				<div className={'circle'}></div>

				<div className={'clock'}>
					{new Array(60).fill('').map((_, index) => {
						const rotate = `rotate(${( index + 1)  * 6}deg)`;
						return (<div key={index} className={'graduations'} style={{transform: rotate}}>
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
			<AudioPlayer />
		</div>
	);
}

export default App;
