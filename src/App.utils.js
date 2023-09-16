export const degree = 6;

export const setTimeForClock = (hour, minute, second) => {
    const date = new Date();
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * degree;
    const ss = date.getSeconds() * degree;

    if (hour.current || minute.current || second.current) {
        hour.current.style.transform = `rotate(${hh + (mm / 12)}deg)`;
        minute.current.style.transform = `rotate(${mm}deg)`;
        second.current.style.transform = `rotate(${ss}deg)`;
    }
}
