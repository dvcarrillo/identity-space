import { Server, Socket } from "socket.io";

const PORT = 8080;

const io = new Server(PORT, {
    cors: {
        origin: "*"
    }
});

console.log(`Listening on port ${PORT}`);

let nfcIDs: NFCData[] = [];

io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    console.log(`emitting nfcIDs ${nfcIDs} to socketID ${socket.id}`);
    socket.emit("nfcIDs", nfcIDs);

    socket.on("nfcID", (nfcID, callback) => {
        console.log(`received NFC ID: ${nfcID}`);
        if (!nfcIDs.some(nfcData => nfcData.nfcID == nfcID)) { // if array does not contain nfcID
            const nfcData: NFCData = {
                nfcID,
                createdBy: socket.id,
                createdAt: new Date(),
            }
            nfcIDs.push(nfcData);
            nfcIDs.sort((firstEl, secondEl) => firstEl.createdAt.getTime() - secondEl.createdAt.getTime()); // sort ascending by createdAt
            console.log("broadcasting NFC IDs");
            socket.broadcast.emit("nfcIDs", nfcIDs);
        }
        console.log("acknowledging NFC ID");
        callback({
            status: "ok",
            acknowledgedNFCID: nfcID,
        });
    });

    socket.on("remove nfcID", (nfcID, callback) => {
        console.log(`received remove for NFC ID: ${nfcID}`);
        nfcIDs = filterOutCreatedBy(nfcIDs, socket.id);
        console.log("broadcasting NFC IDs");
        socket.broadcast.emit("nfcIDs", nfcIDs);
        console.log("acknowledging remove for NFC ID");
        callback({
            status: "ok",
            acknowledgedNFCID: nfcID,
        });
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
        console.log(`removing all NFC IDs from socket ID: ${socket.id}`);
        nfcIDs = filterOutCreatedBy(nfcIDs, socket.id);
        console.log("broadcasting NFC IDs");
        socket.broadcast.emit("nfcIDs", nfcIDs);
    });
});

const filterOutCreatedBy = (array, creator) => {
    return array.filter(el => el.createdBy != creator);
};

interface NFCData {
    nfcID: string;
    createdBy: string;
    createdAt: Date;
};