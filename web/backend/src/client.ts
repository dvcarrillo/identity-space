import { Manager } from "socket.io-client";
const crypto = require("crypto");

const manager = new Manager("ws://localhost:8080");
const socket = manager.socket("/");

const nfcIDs: string[] = [];

socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
    console.log(`disconnect`);
});

// Send or remove NFC ID every 5 seconds
setInterval(() => {
    const start = Date.now();

    console.log("determining whether to send or remove");
    const willSend = Math.random() < 0.5; // random boolean
    console.log(`determined to ${willSend ? "send" : "remove"}`);
    
    if (willSend) {
        const nfcID = crypto.randomBytes(4).toString("hex").toUpperCase().match(/.{1,2}/g).join(":");
        console.log(`sending NFC ID: ${nfcID}`);
        socket.emit("nfcID", nfcID, (response) => {
            if (response.status == "ok") {
                console.log(`acknowledged NFC ID: ${response.acknowledgedNFCID}`);
                nfcIDs.push(nfcID);
            }
        });
    }

    if (!willSend) {
        if (nfcIDs.length == 0) {
            console.log("no nfcIDs to remove");
            return;
        }
        const nfcID = nfcIDs[nfcIDs.length - 1]; // last element from array
        console.log(`requesting remove of NFC ID: ${nfcID}`);
        socket.emit("remove nfcID", nfcID, (response) => {
            if (response.status == "ok") {
                console.log(`acknowledged NFC ID: ${response.acknowledgedNFCID}`);
                nfcIDs.pop();
            }
        });
    }

    
}, 5000);