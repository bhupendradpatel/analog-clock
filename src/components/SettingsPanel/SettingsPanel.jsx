import React from 'react';

const SKINS = [
	{value: 'default', label: 'Default'},
	{value: 'roman', label: 'Roman'},
	{value: 'minimal', label: 'Minimal'},
	{value: 'neon', label: 'Neon'},
];

function Row({label, children}) {
	return (
		<label className={'settings-row'}>
			<span>{label}</span>
			{children}
		</label>
	);
}

function SettingsPanel({settings, onChange, open, onToggle}) {
	return (
		<div className={'settings'}>
			<button className={'icon-btn settings-gear'} onClick={onToggle} aria-label={'Settings'} title={'Settings'}>
				<span role={'img'} aria-label={'settings'}>⚙️</span>
			</button>

			{open && (
				<div className={'settings-panel'} role={'dialog'} aria-label={'Settings'}>
					<Row label={'Theme'}>
						<button
							className={'pill'}
							onClick={() => onChange('theme', settings.theme === 'dark' ? 'light' : 'dark')}
						>
							<span role={'img'} aria-label={'theme'}>{settings.theme === 'dark' ? '🌙' : '☀️'}</span>{' '}
							{settings.theme === 'dark' ? 'Dark' : 'Light'}
						</button>
					</Row>

					<Row label={'Tick sound'}>
						<input
							type={'checkbox'}
							checked={settings.sound}
							onChange={(e) => onChange('sound', e.target.checked)}
						/>
					</Row>

					<Row label={'24-hour clock'}>
						<input
							type={'checkbox'}
							checked={settings.timeFormat === '24'}
							onChange={(e) => onChange('timeFormat', e.target.checked ? '24' : '12')}
						/>
					</Row>

					<Row label={'Smooth second hand'}>
						<input
							type={'checkbox'}
							checked={settings.smooth}
							onChange={(e) => onChange('smooth', e.target.checked)}
						/>
					</Row>

					<Row label={'Digital readout'}>
						<input
							type={'checkbox'}
							checked={settings.showDigital}
							onChange={(e) => onChange('showDigital', e.target.checked)}
						/>
					</Row>

					<Row label={'Show date'}>
						<input
							type={'checkbox'}
							checked={settings.showDate}
							onChange={(e) => onChange('showDate', e.target.checked)}
						/>
					</Row>

					<Row label={'Face'}>
						<select value={settings.skin} onChange={(e) => onChange('skin', e.target.value)}>
							{SKINS.map((s) => (
								<option key={s.value} value={s.value}>
									{s.label}
								</option>
							))}
						</select>
					</Row>

					<Row label={`Size (${settings.size}px)`}>
						<input
							type={'range'}
							min={220}
							max={420}
							step={10}
							value={settings.size}
							onChange={(e) => onChange('size', Number(e.target.value))}
						/>
					</Row>
				</div>
			)}
		</div>
	);
}

export default SettingsPanel;
