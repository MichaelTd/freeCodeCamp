var canvas = document.getElementById('demo');
var point = new obelisk.Point(600, 20);
var pixelView = new obelisk.PixelView(canvas, point);
var dimension = new obelisk.CubeDimension(16, 16, 12);

function initState() {
  var field = new Int8Array(32*32);
  for (var i = 0; i < 32; ++i) {
    for (var j = 0; j < 32; ++j) {
      var z = Math.floor(Math.random() * 2);
      field[i*32 + j] = (z == 0)? 1:0;
    }
  }
  return field;
}

function at(f, x,y) {
  return (0 <= x && x < 32 && 0 <= y && y < 32)? f[x*32+y] : 0;
}

function countNeighbour(f, x, y) {
  return at(f, x-1, y-1) +
         at(f, x  , y-1) +
         at(f, x+1, y-1) +
         at(f, x-1, y  ) +
         at(f, x+1, y  ) +
         at(f, x-1, y+1) +
         at(f, x  , y+1) +
         at(f, x+1, y+1);  
}

function nextState(cur) {
  var next = new Int8Array(32*32);
  for (var i = 0; i < 32; ++i) {
    for (var j = 0; j < 32; ++j) {
      var p = at(cur, i, j);
      var c = countNeighbour(cur, i, j);
      
      next[i*32 + j] = c == 2? p:(c == 3? 1:0);
    }
  }
  return next;
}

function render(field) {
  for (var i = 0; i < 32; ++i) {
      for (var j = 0; j < 32; ++j) {
        var z = field[i*32 + j];
        if (z == 0) continue;

        var color = new obelisk.CubeColor().getByHorizontalColor((i*8)<<16|(j*8)<<8|0x80);
        var p = new obelisk.Point3D(16 * i, 16 * j, 0);
        var cube = new obelisk.Cube(dimension, color, true);
        pixelView.renderObject(cube, p);
      }
  }
}

var f = initState();
setInterval(function() {
    pixelView.clear();
    render(f);
    f = nextState(f);
}, 500);