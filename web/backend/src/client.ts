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

const generateNFCID = () => crypto.randomBytes(4).toString("hex").toUpperCase().match(/.{1,2}/g).join(":"); // expected format, e.g. FE:B7:2D:4E
const sendRandomNFCID = () => {
    const nfcID = generateNFCID();
    console.log(`sending NFC ID: ${nfcID}`);
    socket.emit("nfcID", nfcID, (response) => {
        if (response.status == "ok") {
            console.log(`acknowledged NFC ID: ${response.acknowledgedNFCID}`);
            nfcIDs.push(nfcID);
        }
    });
}

// Send some NFC IDs
for (let i=0; i<4; i++) {
    setTimeout(sendRandomNFCID, i*2000);
}

// Trigger active or inactive for random NFC ID every couple seconds
// setInterval(() => {
//     console.log("determining nfcID");
//     const randomNFCID = nfcIDs[Math.floor(Math.random()*nfcIDs.length)];
//     const willSetActive = Math.random() < 0.5; // random boolean
//     console.log(`determined to ${willSetActive ? "setActive" : "setInactive"}`);
    
//     if (willSetActive) {
//         console.log(`requesting setActive of NFC ID: ${randomNFCID}`);
//         socket.emit("setActive nfcID", randomNFCID, (response) => {
//             if (response.status == "ok") {
//                 console.log(`acknowledged setActive of NFC ID: ${response.acknowledgedNFCID}`);
//             }
//         });
//     }

//     if (!willSetActive) {
//         console.log(`requesting setInactive of NFC ID: ${randomNFCID}`);
//         socket.emit("setInactive nfcID", randomNFCID, (response) => {
//             if (response.status == "ok") {
//                 console.log(`acknowledged setInactive of NFC ID: ${response.acknowledgedNFCID}`);
//             }
//         });
//     }

    
// }, 3000);

// Send or remove NFC ID every couple seconds
setInterval(() => {
    console.log("determining whether to send or remove");
    const willSend = Math.random() < 0.75; // random boolean (slightly skewed)
    console.log(`determined to ${willSend ? "send" : "remove"}`);
    
    if (willSend) {
        sendRandomNFCID();
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

    
}, 10000);