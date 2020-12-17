// Expected type
// interface NFCData {
//     nfcID: string;
//     createdBy: string;
//     createdAt: Date;
//     parameters: [number, number, number, number];
// };
// window.currentNFCIDs: NFCData[]

window.currentNFCIDs = [];

window.setCurrentNFCIDs = (newNFCIDs) => {
    const currentNFCIDs = newNFCIDs.map(nfcIDData => {
        const { nfcID } = nfcIDData; // expected format, e.g. FE:B7:2D:4E
        const parameterStrings = nfcID.split(':'); // expected length = 4
        // parse each as hex to get int, expected range: 0 to 255
        const parameters = parameterStrings.map(parameterString => parseInt(parameterString, 16));
        return { ...nfcIDData, parameters};
    })
    window.currentNFCIDs = currentNFCIDs;
    createRings();
    redraw();
}