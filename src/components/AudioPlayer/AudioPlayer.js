import React from 'react';
import {Howl} from 'howler';
import tickTockSrc from '../../asset/wall-clock-tick-tock.mp3';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.tickTockSound = new Howl({
            src: [tickTockSrc],
            loop: true,
            volume: 0.5,
        });
    }

    componentDidMount() {
        this.tickTockSound.play();
    }

    componentWillUnmount() {
        this.tickTockSound.stop();
    }

    render() {
        return null;
    }
}

export default AudioPlayer;
