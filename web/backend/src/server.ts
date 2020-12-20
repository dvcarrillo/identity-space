import { Server, Socket } from "socket.io";

const PORT = 8080;

const io = new Server(PORT, {
    cors: {
        origin: "*"
    }
});

console.log(`Listening on port ${PORT}`);

let tags: Tag[] = [];

io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    console.log(`emitting tags ${tags} to socketID ${socket.id}`);
    socket.emit("tags", tags);

    socket.on("nfcID", (nfcID, callback) => {
        console.log(`received NFC ID: ${nfcID}`);
        if (!tags.some(tag => tag.nfcID == nfcID)) { // if array does not contain nfcID
            const tag: Tag = {
                nfcID,
                createdBy: socket.id,
                createdAt: new Date(),
            }
            tags.push(tag);
            tags.sort((firstEl, secondEl) => firstEl.createdAt.getTime() - secondEl.createdAt.getTime()); // sort ascending by createdAt
            console.log("broadcasting tags");
            socket.broadcast.emit("tags", tags);
        }
        console.log("acknowledging NFC ID");
        callback({
            status: "ok",
            acknowledgedNFCID: nfcID,
        });
    });
    
    socket.on("appTest", (message, callback) => {
        console.log(`received test message from socket ID ${socket.id}: ${message}`);
        callback({
            status: "ok",
            acknowledgedMessage: message,
        });
    });

    socket.on("remove nfcID", (nfcID, callback) => {
        console.log(`received remove for NFC ID: ${nfcID}`);
        tags = tags.filter(tag => tag.nfcID != nfcID);
        console.log("broadcasting tags");
        socket.broadcast.emit("tags", tags);
        console.log("acknowledging remove for NFC ID");
        callback({
            status: "ok",
            acknowledgedNFCID: nfcID,
        });
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
        console.log(`removing all NFC IDs from socket ID: ${socket.id}`);
        tags = tags.filter(tag => tag.createdBy != socket.id);
        console.log("broadcasting tags");
        socket.broadcast.emit("tags", tags);
    });
});

interface Tag {
    nfcID: string;
    createdBy: string;
    createdAt: Date;
};