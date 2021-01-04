window.currentTags = [];

window.setCurrentTags = (newTags) => {
    const currentTags = newTags.map(tag => {
        const parameters = getParametersFromTag(tag);
        return { ...tag, parameters};
    })
    window.currentTags = currentTags;
    // Tone.js
    createSounds();
    // P5.js
    createRings();
};

window.addTag = (newTag) => {
    const tag = {
        ...tag,
        parameters: getParametersFromTag(newTag),
    };
    window.currentTags.push(tag);
};

window.removeTag = (tagToRemove) => {
    window.currentTags = window.currentTags.filter(tag => tag.nfcID !== tagToRemove.nfcID);
};

const getParametersFromTag = (tag) => {
    const { nfcID } = tag; // expected format, e.g. FE:B7:2D:4E
    const parameterStrings = nfcID.split(':'); // expected length = 4
    // parse each as hex to get int, expected range: 0 to 255
    const parameters = parameterStrings.map(parameterString => parseInt(parameterString, 16));
    return parameters;
}