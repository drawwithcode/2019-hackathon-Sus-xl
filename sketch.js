let bg;
var img
function preload(){
   sound = loadSound('assets/TG1_bumper.mp3');
   img = loadImage('assets/speaker.png');
   bg = loadImage('assets/jeremy-thomas-E0AHdsENmDg-unsplash.jpg');
}

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight);

  //press to play
  canvas.mouseClicked(play);
  analyzer = new p5.Amplitude();
  fft = new p5.FFT(0.95,256);
  sound.amp(0.5);

}

function draw(){
  background('navy');
  volume = analyzer.getLevel();
  volume1 = map(volume, 0.5, 1.5, 0.5, height);
  imageMode(CENTER);
  image(img, width/2, height/2, volume1, volume1);

  var spectrum = fft.analyze();
  noStroke();
  fill(0,255,0);
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 3, spectrum.length, 0, width*3);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length-2, h/2 )
  }




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
