import {useEffect, useRef} from 'react';
import {Howl} from 'howler';
import tickTockSrc from '../../asset/wall-clock-tick-tock.mp3';

// Plays a looping tick-tock only while `enabled` is true. Browsers block audio
// autoplay until the first user gesture, so playback is driven by the toggle
// rather than starting automatically on mount.
function AudioPlayer({enabled}) {
	const soundRef = useRef(null);

	useEffect(() => {
		soundRef.current = new Howl({src: [tickTockSrc], loop: true, volume: 0.5});
		return () => {
			if (soundRef.current) {
				soundRef.current.unload();
			}
		};
	}, []);

	useEffect(() => {
		const sound = soundRef.current;
		if (!sound) {
			return;
		}
		if (enabled) {
			if (!sound.playing()) {
				sound.play();
			}
		} else {
			sound.stop();
		}
	}, [enabled]);

	return null;
}

export default AudioPlayer;
