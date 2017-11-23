let inputs = [];
const possibleWins = [
  '0,1,2',
  '3,4,5',
  '6,7,8',
  '0,3,6',
  '1,4,7',
  '2,5,8',
  '0,4,8',
  '2,4,6',
];
function checkForWin (condition, board){
  let coords = condition.split(",");
  coords = coords.map(coord => parseInt(coord))
  return board[coords[0]] === board[coords[1]] && board[coords[1]] === board[coords[2]] && board[coords[0]] !== "";
}
window.onload = function () {
  var ids = [
    'top-left', 'top-mid', 'top-right',
    'mid-left', 'mid-mid', 'mid-right',
    'bottom-left', 'bottom-mid', 'bottom-right'
  ];

  inputs = ids.map(id => document.getElementById(id))
  inputs.forEach(element => element.onclick = handleInput)
}

const Moves = ['x', 'o'];
let turn = 0;

function handleInput(e) {
  const { target } = e;
  if (target.innerHTML === Moves[1] || target.innerHTML === Moves[0]) {
    console.log('already filled')
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

function checkForGameOver(){
  const board = inputs.map(input => input.innerHTML);
  const isGameOver = possibleWins.filter(coord => checkForWin(coord, board))
  const isCat = board.filter(mark => mark === "").length === 0;
  if (isGameOver.length !== 0) {
    document.body.innerHTML += "gameover"
  } else if(isCat) {
    document.body.innerHTML += 'cat game'
  }
}


