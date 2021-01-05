// SOCKET.IO
const socket = io("ws://localhost:8080");

// EVENT HANDLERS
socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
    console.log(`disconnect`);
});

socket.on("tags", (tags) => {
    console.log("received tags");
    console.log({tags});
    window.setCurrentTags(tags);
});

socket.on("add tag", (tag) => {
    console.log("received add tag");
    console.log({tag});
    window.addTag(tag);
})

socket.on("remove tag", (tag) => {
    console.log("received remove tag");
    console.log({tag});
    window.removeTag(tag);
})

socket.on("setActive tag", (tag) => {
    console.log("received setActive tag");
    console.log({tag});
    window.setActive(tag);
})

socket.on("setInactive tag", (tag) => {
    console.log("received setInactive tag");
    console.log({tag});
    window.setInactive(tag);
})