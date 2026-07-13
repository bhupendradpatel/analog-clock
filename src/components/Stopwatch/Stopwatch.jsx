import React, {useEffect, useRef, useState} from 'react';

function format(ms) {
	const totalCs = Math.floor(ms / 10);
	const cs = totalCs % 100;
	const totalS = Math.floor(totalCs / 100);
	const s = totalS % 60;
	const m = Math.floor(totalS / 60) % 60;
	const h = Math.floor(totalS / 3600);
	const pad = (n, l = 2) => String(n).padStart(l, '0');
	return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
}

function Stopwatch() {
	const [elapsed, setElapsed] = useState(0);
	const [running, setRunning] = useState(false);
	const [laps, setLaps] = useState([]);
	const startRef = useRef(0);
	const raf = useRef(null);

	useEffect(() => {
		if (!running) {
			return;
		}
		startRef.current = performance.now() - elapsed;
		const loop = () => {
			setElapsed(performance.now() - startRef.current);
			raf.current = requestAnimationFrame(loop);
		};
		raf.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [running]);

	const reset = () => {
		setRunning(false);
		setElapsed(0);
		setLaps([]);
	};

	return (
		<div className={'tool stopwatch'}>
			<div className={'tool-display'}>{format(elapsed)}</div>
			<div className={'tool-buttons'}>
				<button className={'pill'} onClick={() => setRunning((r) => !r)}>
					{running ? 'Pause' : 'Start'}
				</button>
				<button
					className={'pill'}
					onClick={() => (running ? setLaps((l) => [...l, elapsed]) : reset())}
				>
					{running ? 'Lap' : 'Reset'}
				</button>
			</div>

			{laps.length > 0 && (
				<ol className={'laps'}>
					{laps.map((lap, i) => (
						<li key={i}>
							<span>Lap {i + 1}</span>
							<span>{format(lap - (laps[i - 1] || 0))}</span>
							<span className={'muted'}>{format(lap)}</span>
						</li>
					))}
				</ol>
			)}
		</div>
	);
}

export default Stopwatch;
