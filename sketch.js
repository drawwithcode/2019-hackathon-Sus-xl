
var img
function preload(){
   sound = loadSound('assets/TG1_bumper.mp3');
   img = loadImage('assets/head.png');
}

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight);

  //press to play
  canvas.mouseClicked(play);

  fft = new p5.FFT(0.95,256);
  sound.amp(0.5);
}

function draw(){
  background('blue');

  var spectrum = fft.analyze();
  noStroke();
  fill(0,255,0);
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 3, spectrum.length, 0, width*3);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length-5, h/2 )
  }


  // var image = fft.analyze();
  //   noStroke();
  //   fill(0,255,0); // spectrum is green
  //     volume = analyzer.getLevel();
  //     volume = map(volume, 0, 1, 0, height);
  //     image (img, width/2, height/2, volume);


  text('press to play', windowWidth / 2, windowHeight - 60);
}

function play() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
