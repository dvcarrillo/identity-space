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
    if (Tone.context.state !== "running") {
        return;
    }

    for (i=0; i<window.currentTags.length; i++) {
        const currentTag = window.currentTags[window.currentTags.length - 1 - i];
        const { nfcID, parameters } = currentTag; // number array with expected length: 4

        const partials = parameters.map(parameter => parameter / 255); // each partial is float from 0.0 to 1.0

        const synthOptions = {
            envelope: {
                decay: 0.8,
                decayCurve: "exponential",
                release: 30,
            },
            oscillator: {
                partialCount: 4,
                partials,
                type: "amcustom",
            },
            volume: -18,
        };

        const synth = new Tone.Synth(synthOptions).toDestination();
        synth.name = `${nfcID}__Synth`;
    
        const note = scale[Math.round((scale.length - 1) * parameters[0] / 255 )];
        const octave = Math.round((octaves.max - octaves.min) * parameters[1] / 255 + octaves.min);
        const noteOctave = `${note}${octave}`;

        const sonification = {
            synthOptions,
            synth,
            note,
            octave,
            noteOctave,
        };

        window.currentTags[window.currentTags.length - 1 - i] = {
            ...currentTag,
            sonification,
        };    
    }
}