// Inspired by
// Solarbeat by Whitevinyl
// Source: http://www.whitevinyldesign.com/solarbeat/

const scale = ["C", "D", "Eb", "F", "G", "A", "Bb"];
const octaves = {
    min: 2,
    max: 6,
};
const intervals = {
    min: 3,
    max: 10,
};

function createSounds() {
    const pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();
    const synth = new Tone.PolySynth(Tone.Synth).connect(pingPong).toDestination();
    synth.volume.value = -18;
    for (i=0; i<window.currentNFCIDs.length; i++) {
        const { parameters } = window.currentNFCIDs[i]; // number array with expected length: 4
    
        const note = scale[Math.round((scale.length - 1) * parameters[0] / 255 )];
        const octave = Math.round((octaves.max - octaves.min) * parameters[1] / 255 + octaves.min);
        const noteOctave = `${note}${octave}`;
        const interval = Math.abs(parameters[0] * 2 / 255 - 1) * (intervals.max - intervals.min) + intervals.min;
    
        const loop = new Tone.Loop(time => {
            synth.triggerAttackRelease(noteOctave, "4n", time);
        }, interval).start(i);
    }

    Tone.Transport.start()
}