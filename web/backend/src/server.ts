import { Server, Socket } from "socket.io";

const io = new Server(8080, {
    cors: {
        origin: "*"
    }
});

const nfcIDs: string[] = [];

io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    console.log(`emitting nfcIDs ${nfcIDs} to socketID ${socket.id}`);
    socket.emit("nfcIDs", nfcIDs);

    socket.on("nfcID", (nfcID, callback) => {
        console.log(`received NFC ID: ${nfcID}`);
        if (!nfcIDs.includes(nfcID)) {
            nfcIDs.push(nfcID);
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
        const index = nfcIDs.indexOf(nfcID);
        if (index > -1) {
            nfcIDs.splice(index, 1);
            console.log("broadcasting NFC IDs");
            socket.broadcast.emit("nfcIDs", nfcIDs);
        }
        console.log("acknowledging remove for NFC ID");
        callback({
            status: "ok",
            acknowledgedNFCID: nfcID,
        });
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});