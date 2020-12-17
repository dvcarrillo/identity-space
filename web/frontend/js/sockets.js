// SOCKET.IO
const socket = io("ws://localhost:8080");

// EVENT HANDLERS
socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
    console.log(`disconnect`);
});

socket.on("nfcIDs", (nfcIDs) => {
    console.log("received NFC IDs");
    console.log({nfcIDs});
    window.setCurrentNFCIDs(nfcIDs);
})