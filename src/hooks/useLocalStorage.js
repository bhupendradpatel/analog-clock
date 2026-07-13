import {useEffect, useState} from 'react';

// Persist a piece of state to localStorage under `key`.
export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const stored = window.localStorage.getItem(key);
			return stored !== null ? JSON.parse(stored) : initialValue;
		} catch (e) {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			/* ignore write failures (private mode, quota, etc.) */
		}
	}, [key, value]);

	return [value, setValue];
}
