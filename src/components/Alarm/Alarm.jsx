import React, {useEffect, useRef, useState} from 'react';
import {playBeep} from '../../sound';

function currentHM(now) {
	const pad = (n) => String(n).padStart(2, '0');
	return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function Alarm({now, alarms, onChange}) {
	const [newTime, setNewTime] = useState('07:00');
	const [ringing, setRinging] = useState(false);
	const firedRef = useRef({});

	const hm = currentHM(now);

	useEffect(() => {
		const seconds = now.getSeconds();
		const key = `${hm}`;
		alarms.forEach((a) => {
			if (a.enabled && a.time === hm && seconds < 2 && firedRef.current[a.id] !== key) {
				firedRef.current[a.id] = key;
				setRinging(true);
				playBeep({times: 6, freq: 990});
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hm, now]);

	const add = () => {
		if (!newTime) {
			return;
		}
		onChange([...alarms, {id: `${Date.now()}`, time: newTime, enabled: true}].sort((a, b) => a.time.localeCompare(b.time)));
	};

	const toggle = (id) => onChange(alarms.map((a) => (a.id === id ? {...a, enabled: !a.enabled} : a)));
	const remove = (id) => onChange(alarms.filter((a) => a.id !== id));

	return (
		<div className={`tool alarm ${ringing ? 'flash' : ''}`}>
			<div className={'alarm-add'}>
				<input type={'time'} value={newTime} onChange={(e) => setNewTime(e.target.value)} aria-label={'Alarm time'} />
				<button className={'pill'} onClick={add}>
					+ Add alarm
				</button>
			</div>

			{ringing && (
				<div className={'tool-msg'}>
					<span role={'img'} aria-label={'alarm'}>⏰</span> Alarm!
					<button className={'pill'} onClick={() => setRinging(false)}>
						Dismiss
					</button>
				</div>
			)}

			<ul className={'alarm-list'}>
				{alarms.length === 0 && <li className={'muted'}>No alarms set.</li>}
				{alarms.map((a) => (
					<li key={a.id} className={a.enabled ? '' : 'disabled'}>
						<span className={'alarm-time'}>{a.time}</span>
						<label className={'switch'}>
							<input type={'checkbox'} checked={a.enabled} onChange={() => toggle(a.id)} />
							<span>{a.enabled ? 'On' : 'Off'}</span>
						</label>
						<button className={'icon-btn remove-btn'} onClick={() => remove(a.id)} aria-label={'Remove'}>
							✕
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Alarm;
