import { Server, Socket } from "socket.io";

const io = new Server(8080, {
    cors: {
        origin: "*"
    }
});

io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("nfcID", (nfcID, callback) => {
        console.log(`received NFC ID: ${nfcID}`);
        console.log("acknowledging NFC ID");
        callback({
            status: "ok",
            acknowledgedNFCID: nfcID,
        });
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});