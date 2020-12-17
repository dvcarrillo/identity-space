// P5.JS
// p5-example-rings by Matt DesLauriers (slightly modified)
// Source: https://glitch.com/edit/#!/p5-example-rings
let rings = [];

function setup () {
  createCanvas(windowWidth, windowHeight);

  button = createButton('Start audio');
  button.position(0, 0);
  button.mousePressed(startAudioAndHideButton);
}

function startAudioAndHideButton() {
  Tone.start();
  button.hide();
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
  background(0);

  const minDim = Math.min(width, height);
  
  colorMode(HSB);
  noFill();
  strokeWeight(minDim * 0.015);
  strokeCap(ROUND);
  
  let d = minDim;
  d -= d * 0.25;
  
  for (let i = 0; i < rings.length; i++) {
    const {
      diameter,
      arcLength,
      arcAngle,
      spinSpeed,
      hsb
    } = rings[i];
    const spin = millis() / 1000 * spinSpeed;
    stroke(hsb.hue, hsb.saturation, hsb.brightness);
    arc(
      width / 2,
      height / 2,
      diameter * d,
      diameter * d,
      spin + arcAngle,
      spin + arcAngle + Math.PI * arcLength
    );
  }
}

function createRings() {
  rings = [];
  const count = window.currentNFCIDs.length;
  for (i = 0; i < count; i++) {
    const { parameters } = window.currentNFCIDs[i]; // number array with expected length: 4
    const diameter = ((i + 1) / count);
    const arcLength = PI * (parameters[0] * 2 / 255 + 0.05); // float between PI * 0.05 and PI * 2.05
    const arcAngle = PI * (parameters[0] * 4 / 255 - 2); // float between -PI * 2 and PI * 2
    const spinSpeed = parameters[0] * 2 / 255 - 1; // float between -1 and 1
    const hsb = {
      hue: floor(parameters[1] * 360 / 255), // int between 0 and 360
      saturation: floor(parameters[2] * 20 / 255 + 80), // int between 80 and 100
      brightness: floor(parameters[3] * 20 / 255 + 80), // int between 80 and 100
    };
    rings.push({
      spinSpeed,
      diameter,
      arcLength,
      arcAngle,
      hsb
    });
  }
}