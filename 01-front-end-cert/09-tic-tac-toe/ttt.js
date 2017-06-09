var tttBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

var playerMove = false;

if (playerMove) {
  makeMove();
}

function restartGame() {
  tttBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  playerMove = false;
  updateMove();
}

$(document).ready(function() {
  $("button").click(function() {
    var cell = $(this).attr("id")
    var row = parseInt(cell[1])
    var col = parseInt(cell[2])
    if (!playerMove) {
      tttBoard[row][col] = false;
      playerMove = true;
      updateMove();
      makeMove();
    }
  });
  $("#restart").click(restartGame);
});

function updateMove() {
  updateButtons();

  var winner = getWinner(tttBoard);

  $("#winner").html(winner == 1 ? "AI Won!" : winner == 0 ? "You Won!" : winner == -1 ? "Tie!" : "&nbsp;");

  $("#move").html(playerMove ? "AI's Move" : "Player's Move");
}

function getWinner(tttBoard) {
  // Check if someone won
  vals = [true, false];
  var allNotNull = true;
  for (var k = 0; k < vals.length; k++) {
    var value = vals[k];

    // Check rows, columns, and diagonals
    var diagonalComplete1 = true;
    var diagonalComplete2 = true;
    for (var i = 0; i < 3; i++) {
      if (tttBoard[i][i] != value) {
        diagonalComplete1 = false;
      }
      if (tttBoard[2 - i][i] != value) {
        diagonalComplete2 = false;
      }
      var rowComplete = true;
      var colComplete = true;
      for (var j = 0; j < 3; j++) {
        if (tttBoard[i][j] != value) {
          rowComplete = false;
        }
        if (tttBoard[j][i] != value) {
          colComplete = false;
        }
        if (tttBoard[i][j] == null) {
          allNotNull = false;
        }
      }
      if (rowComplete || colComplete) {
        return value ? 1 : 0;
      }
    }
    if (diagonalComplete1 || diagonalComplete2) {
      return value ? 1 : 0;
    }
  }
  if (allNotNull) {
    return -1;
  }
  return null;
}

function updateButtons() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      $("#c" + i + j).text(tttBoard[i][j] == false ? "X" : tttBoard[i][j] == true ? "O" : "");
    }
  }
}

function makeMove() {
  tttBoard = minimaxMove(tttBoard);
  console.log(numNodes);
  playerMove = false;
  updateMove();
}

function minimaxMove(tttBoard) {
  numNodes = 0;
  return recurseMinimax(tttBoard, true)[1];
}

var numNodes = 0;

function recurseMinimax(tttBoard, player) {
  numNodes++;
  var winner = getWinner(tttBoard);
  if (winner != null) {
    switch(winner) {
      case 1:
        // AI wins
        return [1, tttBoard]
      case 0:
        // opponent wins
        return [-1, tttBoard]
      case -1:
        // Tie
        return [0, tttBoard];
    }
  } else {
    // Next states
    var nextVal = null;
    var nextBoard = null;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (tttBoard[i][j] == null) {
          tttBoard[i][j] = player;
          var value = recurseMinimax(tttBoard, !player)[0];
          if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
            nextBoard = tttBoard.map(function(arr) {
              return arr.slice();
            });
            nextVal = value;
          }
          tttBoard[i][j] = null;
        }
      }
    }
    return [nextVal, nextBoard];
  }
}

updateMove();
