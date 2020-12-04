// P5.JS
// Circle by Richard Bourne (May 6th, 2020) (slightly modified)
// Source: https://www.openprocessing.org/sketch/890036
let sketch = (p) => {
    let numSlices = 3;
    // let numSlices = nfcIDs.length;
    let seed = 123;

    p.setup = () => {
        p.createCanvas(app.offsetWidth, app.offsetHeight);
    }
    
    p.updateNumSlices = (newNumSlices) => {
        numSlices = newNumSlices;
        p.redraw();
    }
    
    p.draw = () => {
        p.background(0);
        //set the seed for random number generation to a known value each time, to avoid
        //colours flickering - we'll pick the same ones every frame, until the seed is changed.
        p.randomSeed(seed);
    
        for (let i = 0; i < numSlices; i++) {
            p.makeArc(800, i)
            p.makeArc(500, i)
            p.makeArc(300, i)
        }
    }
    
    
    const randomColour = () => {
        p.colorMode(p.HSB, 360, 100, 100);
        return p.color(p.random(360), 40, 100);
    }
    
    //draw an arc of given radius
    p.makeArc = (arcRadius, ix) => {
        p.strokeWeight(20);
        p.stroke(1);
        p.fill(randomColour());
        let xCentre = p.width / 2;
        let yCentre = p.height / 2; 
        p.angleMode(p.DEGREES);
        let startAngle = 360 / numSlices * ix;
        let stopAngle = 360 / numSlices * (ix + 1)
        p.arc(xCentre, yCentre, arcRadius, arcRadius, startAngle, stopAngle);
    }
}

// CONSTANTS
const socket = io("ws://localhost:8080");
const app = document.querySelector("div#app");
const myp5 = new p5(sketch, app);

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
    myp5.updateNumSlices(nfcIDs.length);
})