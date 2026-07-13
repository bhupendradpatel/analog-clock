export const degree = 6;

// Break a Date into clock parts for a given IANA time zone (or local time when
// timeZone is falsy). Milliseconds come from the underlying instant, so they are
// timezone-independent and let us drive a smooth second hand.
export const getTimeParts = (date, timeZone) => {
	let h, m, s;

	if (timeZone) {
		const parts = new Intl.DateTimeFormat('en-US', {
			timeZone,
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).formatToParts(date);

		const get = (type) => Number(parts.find((p) => p.type === type).value);
		h = get('hour') % 24;
		m = get('minute');
		s = get('second');
	} else {
		h = date.getHours();
		m = date.getMinutes();
		s = date.getSeconds();
	}

	return {h, m, s, ms: date.getMilliseconds()};
};

// Rotation (in degrees) for each hand. `smooth` adds sub-second interpolation.
export const getHandAngles = ({h, m, s, ms}, smooth = false) => {
	const seconds = smooth ? s + ms / 1000 : s;
	return {
		hour: ((h % 12) + m / 60 + s / 3600) * 30,
		minute: (m + s / 60) * degree,
		second: seconds * degree,
	};
};

// "HH:MM:SS" (24h) or "H:MM:SS AM/PM" (12h).
export const formatDigital = ({h, m, s}, timeFormat = '24') => {
	const pad = (n) => String(n).padStart(2, '0');
	if (timeFormat === '12') {
		const period = h >= 12 ? 'PM' : 'AM';
		const hour12 = h % 12 === 0 ? 12 : h % 12;
		return `${hour12}:${pad(m)}:${pad(s)} ${period}`;
	}
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

// Long date string ("Mon, Jul 13") for a given time zone.
export const formatDate = (date, timeZone) =>
	new Intl.DateTimeFormat('en-US', {
		timeZone: timeZone || undefined,
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	}).format(date);

// Kept for backwards compatibility with the original ref-based renderer.
export const setTimeForClock = (hour, minute, second) => {
	const angles = getHandAngles(getTimeParts(new Date()));
	if (hour.current || minute.current || second.current) {
		hour.current.style.transform = `rotate(${angles.hour}deg)`;
		minute.current.style.transform = `rotate(${angles.minute}deg)`;
		second.current.style.transform = `rotate(${angles.second}deg)`;
	}
};
