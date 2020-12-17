window.currentNFCIDs = [];

window.setCurrentNFCIDs = (newNFCIDs) => {
    window.currentNFCIDs = newNFCIDs;
    createRings();
    redraw();
}