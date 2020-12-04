const socket = io("ws://localhost:8080");
const ulNFCIDs = document.querySelector("ul#idList");
const template = document.querySelector("template#nfcID");

socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
    console.log(`disconnect`);
});

socket.on("nfcIDs", (nfcIDs) => {
    console.log(`received NFC IDs: ${nfcIDs}`);
    ulNFCIDs.innerHTML = "";
    nfcIDs.map(nfcData => {
        const clone = template.content.cloneNode(true);
        const li = clone.querySelector("li");
        li.textContent = nfcData.nfcID;
        ulNFCIDs.appendChild(clone);
    });
})