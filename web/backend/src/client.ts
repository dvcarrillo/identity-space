import { Manager } from "socket.io-client";

const manager = new Manager("ws://localhost:8080");
const socket = manager.socket("/");

socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
    const nfcID = "32:F4:56:9B";
    console.log(`sending NFC ID: ${nfcID}`);
    socket.emit("nfcID", nfcID, (response) => {
        if (response.status == "ok") {
            console.log(`acknowledged NFC ID: ${response.acknowledgedNFCID}`);
        }
    });
});

socket.on("disconnect", () => {
    console.log(`disconnect`);
});