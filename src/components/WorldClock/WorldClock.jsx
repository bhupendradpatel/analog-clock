import React, {useState} from 'react';
import AnalogClock from '../AnalogClock/AnalogClock';

const ZONE_OPTIONS = [
	{label: 'Local', tz: ''},
	{label: 'London', tz: 'Europe/London'},
	{label: 'Paris', tz: 'Europe/Paris'},
	{label: 'New York', tz: 'America/New_York'},
	{label: 'Los Angeles', tz: 'America/Los_Angeles'},
	{label: 'Chicago', tz: 'America/Chicago'},
	{label: 'São Paulo', tz: 'America/Sao_Paulo'},
	{label: 'Mumbai', tz: 'Asia/Kolkata'},
	{label: 'Dubai', tz: 'Asia/Dubai'},
	{label: 'Singapore', tz: 'Asia/Singapore'},
	{label: 'Tokyo', tz: 'Asia/Tokyo'},
	{label: 'Sydney', tz: 'Australia/Sydney'},
	{label: 'Auckland', tz: 'Pacific/Auckland'},
];

function WorldClock({now, settings, zones, onAdd, onRemove}) {
	const [selected, setSelected] = useState(ZONE_OPTIONS[1].tz);

	const addSelected = () => {
		const option = ZONE_OPTIONS.find((o) => o.tz === selected);
		if (option) {
			onAdd({id: `${Date.now()}`, label: option.label, timeZone: option.tz});
		}
	};

	return (
		<div className={'world-clock'}>
			<div className={'world-toolbar'}>
				<select value={selected} onChange={(e) => setSelected(e.target.value)}>
					{ZONE_OPTIONS.map((o) => (
						<option key={o.label} value={o.tz}>
							{o.label}
						</option>
					))}
				</select>
				<button className={'pill'} onClick={addSelected}>
					+ Add clock
				</button>
			</div>

			<div className={'world-grid'}>
				{zones.length === 0 && <p className={'muted'}>No clocks yet — add one above.</p>}
				{zones.map((z) => (
					<div key={z.id} className={'world-item'}>
						<button className={'icon-btn remove-btn'} onClick={() => onRemove(z.id)} aria-label={'Remove'}>
							✕
						</button>
						<AnalogClock
							now={now}
							timeZone={z.timeZone}
							label={z.label}
							skin={settings.skin}
							smooth={settings.smooth}
							size={180}
							showDigital={settings.showDigital}
							showDate={settings.showDate}
							timeFormat={settings.timeFormat}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default WorldClock;
