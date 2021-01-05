// P5.JS
// p5-example-rings by Matt DesLauriers (slightly modified)
// Source: https://glitch.com/edit/#!/p5-example-rings
let shouldPlay = false;

function setup () {
  createCanvas(windowWidth, windowHeight);

  frameRate(30);

  button = createButton('Play/Pause');
  button.position(0, 0);
  button.mousePressed(togglePlay);
}

async function togglePlay() {
  await Tone.start();
  console.log("context started");

  shouldPlay = !shouldPlay;
  console.log(`${shouldPlay ? 'playing' : 'stopped'} sounds`);
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
}

// gets called in an infinite loop once every frame
function draw () {
  background(0);

  const minDim = Math.min(width, height);
  
  colorMode(HSB);
  noFill();
  strokeWeight(minDim * 0.015);
  strokeCap(ROUND);
  
  let d = minDim;
  d -= d * 0.25;
  
  for (let i = 0; i < window.currentTags.length; i++) {
    const currentTag = window.currentTags[i];
    const {
      visualisation,
      sonification,
    } = currentTag;
    const {
      diameter,
      arcLength,
      arcAngle,
      spinSpeed,
      hsb,
      interval,
    } = visualisation;
    const hasSonification = currentTag.hasOwnProperty('sonification');
    let synth;
    let noteOctave;
    if (hasSonification) {
      synth = sonification.synth;
      noteOctave = sonification.noteOctave;
    }
    // millis() returns number of milliseconds since starting the sketch
    const secondsSinceStarting = millis() / 1000;
    const spin = secondsSinceStarting * spinSpeed;
    let {
      brightness,
      saturation,
    } = hsb;
    // Shine for 10 frames and trigger sound every interval
    const modulo = frameCount % interval;
    if (frameCount > 0 && modulo < 15) {
      brightness = 100 - (100 - hsb.brightness) * modulo / 15; // soft release
      saturation = 100;
      if (hasSonification && shouldPlay && modulo === 0) {
        synth.triggerAttackRelease(noteOctave, "4n");
      }
    }
    stroke(hsb.hue, saturation, brightness);
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
  const count = window.currentTags.length;
  for (i = 0; i < count; i++) {
    const currentTag = window.currentTags[i];
    const { parameters } = currentTag; // number array with expected length: 4
    const diameter = ((i + 1) / count);
    const arcLength = PI * (parameters[0] * 2 / 255 + 0.05); // float between PI * 0.05 and PI * 2.05
    const arcAngle = PI * (parameters[0] * 4 / 255 - 2); // float between -PI * 2 and PI * 2
    const spinSpeed = parameters[0] * 2 / 255 - 1; // float between -1 and 1
    const hsb = {
      hue: floor(parameters[1] * 360 / 255), // int between 0 and 360
      saturation: floor(parameters[2] * (95 - 80) / 255 + 80), // int between 80 and 95
      brightness: floor(parameters[3] * (90 - 70) / 255 + 70), // int between 70 and 90
    };
    const interval = Math.floor(parameters[0] / 255 * (300 - 90) + 90); // int between 90 and 300
    const visualisation = {
      spinSpeed,
      diameter,
      arcLength,
      arcAngle,
      hsb,
      interval,
    };
    window.currentTags[i] = {
      ...currentTag,
      visualisation,
    };
  }
}