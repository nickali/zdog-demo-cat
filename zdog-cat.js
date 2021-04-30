
let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 10,
    dragRotate: true,

});

// ---- model ---- //

// Sphere of head
let head = new Zdog.Shape({
    addTo: illo,
    stroke: 12,
    color: '#EA0',
});


let rightEar = new Zdog.Hemisphere({
    addTo: head,
    diameter: 5,
    translate: {z: 1, y: -4, x: 3},
    	rotate: { x: Zdog.TAU/6, y: -Zdog.TAU/14 },
	// fill enabled by default
	// disable stroke for crisp edge
	stroke: .4,
	color: '#C25',
	backface: '#EA0',
});

// left ear
rightEar.copy({
    translate: { x: -3, y: -4},
    rotate: {x: Zdog.TAU/6, y: Zdog.TAU/14 }
});


let lefteye = new Zdog.Ellipse({
    addTo: head,
    diameter: 2,
    quarters: 2, // semi-circle
    translate: { x: -2, y: 1, z: 4.5 },
    // rotate semi-circle to point up
    rotate: { z: -Zdog.TAU/4},
    color: Zdog.eggplant,
    stroke: 0.5,
    // hide when front-side is facing back
    backface: false,
});

// right eye
lefteye.copy({
    translate: { x: 2, y: 1, z: 4.5 },
});

let nose = new Zdog.Shape({
    addTo: head,
    path: [ // triangle
	{ x:   0, y: -.5 },
	{ x:  .5, y:  .5 },
	{ x: -.5, y:  .5 },
    ],
    translate: { y: 2, z: 4.5 },
    // closed by default
    stroke: 1,
    color: '#636'
});

// -- animate --- //

function animate() {
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
}

let ticker = 0;
let cycleCount = 150;

function easeAnimate() {
    let progress = ticker / cycleCount;
    // apply easing to rotation
    let tween = Zdog.easeInOut( progress % 1, 3 );
    illo.rotate.y = tween * Zdog.TAU;
    ticker++;

    illo.updateRenderGraph();
    requestAnimationFrame( easeAnimate );

}

easeAnimate();
