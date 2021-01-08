window.currentTags = [];

window.setCurrentTags = (newTags) => {
    const currentTags = newTags.map(tag => {
        const parameters = getParametersFromTag(tag);
        const tagData = {
            ...tag,
            parameters,
            shouldBeActive: false,
            currentlyActive: false,
            lastActive: 0,
        };
        return tagData;
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
        shouldPlaySound: false,
    };
    window.currentTags.push(tag);
};

window.removeTag = (tagToRemove) => {
    window.currentTags = window.currentTags.filter(tag => tag.nfcID !== tagToRemove.nfcID);
};

window.setActive = (tagToSetActive) => {
    const tagIndex = window.currentTags.findIndex(tag => tag.nfcID === tagToSetActive.nfcID);
    window.currentTags[tagIndex].shouldBeActive = true;
};

window.setInactive = (tagToSetInactive) => {
    const tagIndex = window.currentTags.findIndex(tag => tag.nfcID === tagToSetInactive.nfcID);
    window.currentTags[tagIndex].shouldBeActive = false;
};

const getParametersFromTag = (tag) => {
    const { nfcID } = tag; // expected format, e.g. FE:B7:2D:4E
    const parameterStrings = nfcID.split(':'); // expected length = 4
    // parse each as hex to get int, expected range: 0 to 255
    const parameters = parameterStrings.map(parameterString => parseInt(parameterString, 16));
    return parameters;
}