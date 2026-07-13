import React, {useEffect, useRef, useState} from 'react';
import {playBeep} from '../../sound';

function format(ms) {
	const totalS = Math.max(0, Math.ceil(ms / 1000));
	const s = totalS % 60;
	const m = Math.floor(totalS / 60) % 60;
	const h = Math.floor(totalS / 3600);
	const pad = (n) => String(n).padStart(2, '0');
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function Timer() {
	const [inputs, setInputs] = useState({h: 0, m: 5, s: 0});
	const [remaining, setRemaining] = useState(0);
	const [running, setRunning] = useState(false);
	const [done, setDone] = useState(false);
	const endRef = useRef(0);
	const raf = useRef(null);

	useEffect(() => {
		if (!running) {
			return;
		}
		const loop = () => {
			const left = endRef.current - performance.now();
			if (left <= 0) {
				setRemaining(0);
				setRunning(false);
				setDone(true);
				playBeep({times: 4});
				return;
			}
			setRemaining(left);
			raf.current = requestAnimationFrame(loop);
		};
		raf.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf.current);
	}, [running]);

	const totalMs = (inputs.h * 3600 + inputs.m * 60 + inputs.s) * 1000;

	const start = () => {
		const base = remaining > 0 ? remaining : totalMs;
		if (base <= 0) {
			return;
		}
		endRef.current = performance.now() + base;
		setDone(false);
		setRemaining(base);
		setRunning(true);
	};

	const reset = () => {
		setRunning(false);
		setDone(false);
		setRemaining(0);
	};

	const setField = (field, value) => {
		const max = field === 'h' ? 99 : 59;
		const n = Math.min(max, Math.max(0, Number(value) || 0));
		setInputs((prev) => ({...prev, [field]: n}));
	};

	return (
		<div className={`tool timer ${done ? 'flash' : ''}`}>
			{running || remaining > 0 ? (
				<div className={'tool-display'}>{format(remaining)}</div>
			) : (
				<div className={'timer-inputs'}>
					{['h', 'm', 's'].map((f) => (
						<input
							key={f}
							type={'number'}
							aria-label={f}
							value={inputs[f]}
							min={0}
							onChange={(e) => setField(f, e.target.value)}
						/>
					))}
				</div>
			)}

			{done && <div className={'tool-msg'}>Time's up!</div>}

			<div className={'tool-buttons'}>
				<button className={'pill'} onClick={() => (running ? setRunning(false) : start())}>
					{running ? 'Pause' : remaining > 0 ? 'Resume' : 'Start'}
				</button>
				<button className={'pill'} onClick={reset}>
					Reset
				</button>
			</div>
		</div>
	);
}

export default Timer;
