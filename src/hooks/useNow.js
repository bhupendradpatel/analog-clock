import {useEffect, useRef, useState} from 'react';

// Returns a `Date` that updates on every animation frame (smooth) or once a
// second (ticking). `smooth` drives a sweeping second hand.
export function useNow(smooth) {
	const [now, setNow] = useState(() => new Date());
	const raf = useRef(null);
	const timer = useRef(null);

	useEffect(() => {
		if (smooth) {
			const loop = () => {
				setNow(new Date());
				raf.current = requestAnimationFrame(loop);
			};
			raf.current = requestAnimationFrame(loop);
			return () => cancelAnimationFrame(raf.current);
		}

		setNow(new Date());
		timer.current = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer.current);
	}, [smooth]);

	return now;
}
