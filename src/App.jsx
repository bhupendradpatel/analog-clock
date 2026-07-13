import React, {useEffect, useState} from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import AnalogClock from './components/AnalogClock/AnalogClock';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import WorldClock from './components/WorldClock/WorldClock';
import Stopwatch from './components/Stopwatch/Stopwatch';
import Timer from './components/Timer/Timer';
import Alarm from './components/Alarm/Alarm';
import {useLocalStorage} from './hooks/useLocalStorage';
import {useNow} from './hooks/useNow';
import './App.css';

const DEFAULT_SETTINGS = {
	theme: 'dark',
	sound: false,
	timeFormat: '24',
	smooth: true,
	skin: 'default',
	size: 320,
	showDigital: true,
	showDate: true,
};

const TABS = [
	{id: 'clock', label: 'Clock'},
	{id: 'world', label: 'World'},
	{id: 'stopwatch', label: 'Stopwatch'},
	{id: 'timer', label: 'Timer'},
	{id: 'alarm', label: 'Alarm'},
];

function App() {
	const [settings, setSettings] = useLocalStorage('clock.settings', DEFAULT_SETTINGS);
	const [zones, setZones] = useLocalStorage('clock.zones', [
		{id: 'ny', label: 'New York', timeZone: 'America/New_York'},
		{id: 'ldn', label: 'London', timeZone: 'Europe/London'},
		{id: 'tky', label: 'Tokyo', timeZone: 'Asia/Tokyo'},
	]);
	const [alarms, setAlarms] = useLocalStorage('clock.alarms', []);
	const [tab, setTab] = useState('clock');
	const [settingsOpen, setSettingsOpen] = useState(false);

	// Alarms need a 1s tick even when the second hand isn't smooth.
	const now = useNow(settings.smooth || tab === 'alarm');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', settings.theme);
	}, [settings.theme]);

	const change = (key, value) => setSettings((prev) => ({...prev, [key]: value}));

	return (
		<div className={'App'}>
			<header className={'topbar'}>
				<nav className={'tabs'}>
					{TABS.map((t) => (
						<button
							key={t.id}
							className={`tab ${tab === t.id ? 'active' : ''}`}
							onClick={() => setTab(t.id)}
						>
							{t.label}
						</button>
					))}
				</nav>
				<SettingsPanel
					settings={settings}
					onChange={change}
					open={settingsOpen}
					onToggle={() => setSettingsOpen((o) => !o)}
				/>
			</header>

			<main className={'stage'}>
				{tab === 'clock' && (
					<AnalogClock
						now={now}
						skin={settings.skin}
						smooth={settings.smooth}
						size={settings.size}
						showDigital={settings.showDigital}
						showDate={settings.showDate}
						timeFormat={settings.timeFormat}
					/>
				)}

				{tab === 'world' && (
					<WorldClock
						now={now}
						settings={settings}
						zones={zones}
						onAdd={(z) => setZones((prev) => [...prev, z])}
						onRemove={(id) => setZones((prev) => prev.filter((z) => z.id !== id))}
					/>
				)}

				{tab === 'stopwatch' && <Stopwatch />}
				{tab === 'timer' && <Timer />}
				{tab === 'alarm' && <Alarm now={now} alarms={alarms} onChange={setAlarms} />}
			</main>

			<AudioPlayer enabled={settings.sound} />
		</div>
	);
}

export default App;
