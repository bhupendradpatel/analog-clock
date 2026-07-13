// Short beep sequence via the Web Audio API — no asset needed. Used by the
// timer and alarm when they fire.
let ctx = null;

export function playBeep({times = 3, freq = 880, duration = 0.15, gap = 0.2} = {}) {
	try {
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!AudioCtx) {
			return;
		}
		if (!ctx) {
			ctx = new AudioCtx();
		}
		if (ctx.state === 'suspended') {
			ctx.resume();
		}
		for (let i = 0; i < times; i++) {
			const start = ctx.currentTime + i * (duration + gap);
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = 'sine';
			osc.frequency.value = freq;
			gain.gain.setValueAtTime(0.001, start);
			gain.gain.exponentialRampToValueAtTime(0.3, start + 0.02);
			gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
			osc.connect(gain).connect(ctx.destination);
			osc.start(start);
			osc.stop(start + duration);
		}
	} catch (e) {
		/* audio not available */
	}
}
