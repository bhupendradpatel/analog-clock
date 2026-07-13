import React from 'react';
import {getTimeParts, getHandAngles, formatDigital, formatDate} from '../../App.utils';

const ROMAN = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

function sizeVars(size) {
	return {
		'--clock-size-width': `${size}px`,
		'--clock-size-height': `${size}px`,
		'--minute-hand-height': `${(size / 2) * 0.75}px`,
		'--second-hand-height': `${(size / 2) * 0.8}px`,
		'--hour-hand-height': `${(size / 2) * 0.6}px`,
		'--graduation-height': `${(size / 2) * 0.1}px`,
		'--graduation-height-5': `${(size / 2) * 0.2}px`,
	};
}

// Tick marks: 60 for detailed skins, 12 for the minimal skin.
function Graduations({skin}) {
	const count = skin === 'minimal' ? 12 : 60;
	const step = skin === 'minimal' ? 30 : 6;
	return new Array(count).fill('').map((_, index) => (
		<div key={index} className={'graduations'} style={{transform: `rotate(${(index + 1) * step}deg)`}}>
			<div className={'stick'}></div>
		</div>
	));
}

// Roman numerals positioned around the face.
function Numerals() {
	return (
		<div className={'numerals'}>
			{ROMAN.map((label, index) => (
				<div key={index} className={'numeral'} style={{transform: `rotate(${index * 30}deg)`}}>
					<span style={{transform: `rotate(${-index * 30}deg)`}}>{label}</span>
				</div>
			))}
		</div>
	);
}

function AnalogClock({
	now,
	timeZone,
	label,
	skin = 'default',
	smooth = false,
	size = 320,
	showDigital = false,
	showDate = false,
	timeFormat = '24',
}) {
	const parts = getTimeParts(now, timeZone);
	const angles = getHandAngles(parts, smooth);

	return (
		// Size vars live on the unit root so the decorative circles (siblings of
		// .clock) scale with the face instead of staying at a fixed size.
		<div className={'clock-unit'} style={sizeVars(size)}>
			<div className={'container'}>
				<div className={'circle'}></div>
				<div className={'circle'}></div>

				<div className={`clock skin-${skin}`}>
					{skin === 'roman' ? <Numerals /> : <Graduations skin={skin} />}

					<div className={'indicator'}>
						<div className={'hand hour'} style={{transform: `translateX(-50%) rotate(${angles.hour}deg)`}}></div>
						<div className={'hand minute'} style={{transform: `translateX(-50%) rotate(${angles.minute}deg)`}}></div>
						<div className={'hand second'} style={{transform: `translateX(-50%) rotate(${angles.second}deg)`}}></div>
					</div>
				</div>
			</div>

			{label && <div className={'clock-label'}>{label}</div>}
			{showDigital && <div className={'digital'}>{formatDigital(parts, timeFormat)}</div>}
			{showDate && <div className={'clock-date'}>{formatDate(now, timeZone)}</div>}
		</div>
	);
}

export default AnalogClock;
