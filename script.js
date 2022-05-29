// All the scripts
console.log('Good Vibes!')

/*
Library:
https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.7/two.min.js

Utilities: 
https://codepen.io/Spenc3Duck/pen/YzeYmVy.js
*/

const container = document.querySelector("section");
let params = { width: 300, height: 300 };

const two = new Two(params);
two.appendTo(container);

const shapes = [];

// config for our animation
const loopDuration = 400;
const aDelay = 0.0025;

const numberOfShapes = 50;

for (let i = -10; i < numberOfShapes; i++) {
  const size = 10;

  const sx = size / 1 + i * size;
  const sy = 150;
  const sr = 0;

  const ex = randomNumber(50, 250);
  const ey = randomNumber(50, 200);
    const angle = fullRotation * i / numberOfShapes
    // const ex = 250 + 200 * Math.cos(angle)
    // const ey = 250 + 200 * Math.sin(angle)
  const er = randomNumber(5 * fullRotation * 5, fullRotation * 5);

  const shape = two.makeRectangle(sx, sy, size, size);
  shape.fill = "#690081";
  shape.rotation = sr;
  shape.noStroke();

  shape.data = {
    sx: sx,
    sy: sy,
    sr: sr,
    ex: ex,
    ey: ey,
    er: er
  };

  shapes.push(shape);
}

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  const aDelay = 0.0025;

  shapes.forEach((shape, i) => {
    const aStart = (numberOfShapes - i) * aDelay;
    const aEnd = i * aDelay;

    if (t <= 0.5) {
      u = mapAndClamp(t, 0 + aStart, 0.5 - aEnd, 0, 1);
    } else {
      u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0);
    }

    let cu = easeInOutCubic(u);

    const x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex);
    const y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey);
    const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er);

    shape.translation.x = x;
    shape.translation.y = y;
    shape.rotation = r;
  });
});

// let currentColor = 0;
// let backgroundColors = ["#45d3c5", "#ffe8b4", "#f9d2cd", "#bcdffd"];
// let shapeColors = ["#004F73", "#f8bc30", "#f45745", "#5745d3"];

// document.addEventListener("click", function () {
//   currentColor = currentColor + 1;
//   currentColor = currentColor % shapeColors.length;

//   shapes.forEach((shape) => {
//     shape.fill = shapeColors[currentColor];
//   });

//   const bodyTag = document.querySelector("body");
//   bodyTag.style.backgroundColor = backgroundColors[currentColor];
// });

two.play();

