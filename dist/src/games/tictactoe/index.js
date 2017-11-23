'use strict';

var inputs = [];
var possibleWins = ['0,1,2', '3,4,5', '6,7,8', '0,3,6', '1,4,7', '2,5,8', '0,4,8', '2,4,6'];
function checkForWin(condition, board) {
  var coords = condition.split(",");
  coords = coords.map(function (coord) {
    return parseInt(coord);
  });
  return board[coords[0]] === board[coords[1]] && board[coords[1]] === board[coords[2]] && board[coords[0]] !== "";
}
window.onload = function () {
  var ids = ['top-left', 'top-mid', 'top-right', 'mid-left', 'mid-mid', 'mid-right', 'bottom-left', 'bottom-mid', 'bottom-right'];

  inputs = ids.map(function (id) {
    return document.getElementById(id);
  });
  inputs.forEach(function (element) {
    return element.onclick = handleInput;
  });
};

var Moves = ['x', 'o'];
var turn = 0;

function handleInput(e) {
  var target = e.target;

  if (target.innerHTML === Moves[1] || target.innerHTML === Moves[0]) {
    console.log('already filled');
  } else {
    e.target.innerHTML = Moves[turn];
    if (turn === 0) {
      turn = 1;
    } else {
      turn = 0;
    }
  }
  checkForGameOver();
}

function checkForGameOver() {
  var board = inputs.map(function (input) {
    return input.innerHTML;
  });
  var isGameOver = possibleWins.filter(function (coord) {
    return checkForWin(coord, board);
  });
  var isCat = board.filter(function (mark) {
    return mark === "";
  }).length === 0;
  if (isGameOver.length !== 0) {
    document.body.innerHTML += "gameover";
  } else if (isCat) {
    document.body.innerHTML += 'cat game';
  }
}