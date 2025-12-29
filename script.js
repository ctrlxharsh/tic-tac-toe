const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const turnEl = document.getElementById('turn');
const restartBtn = document.getElementById('restart');
const swapBtn = document.getElementById('swap');

let board = Array(9).fill('');
let currentPlayer = 'X';
let running = true;
let startingPlayer = 'X';

const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function startGame(){
  board.fill('');
  running = true;
  currentPlayer = startingPlayer;
  turnEl.textContent = currentPlayer;
  cells.forEach(cell=>{
    cell.textContent = '';
    cell.classList.remove('taken','win');
    cell.addEventListener('click', onCellClick);
  });
  statusEl.style.color = '';
}

function onCellClick(e){
  const idx = Number(e.target.dataset.index);
  if(!running || board[idx]) return;
  makeMove(idx, currentPlayer);
  checkResult();
}

function makeMove(idx, player){
  board[idx] = player;
  const cell = cells[idx];
  cell.textContent = player;
  cell.classList.add('taken');
}

function checkResult(){
  let won = false;
  for(const combo of WIN_COMBOS){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      won = true;
      highlightWin(combo);
      break;
    }
  }
  if(won){
    statusEl.innerHTML = `Winner: <strong>${currentPlayer}</strong>`;
    statusEl.style.color = '#065f46';
    running = false;
    return;
  }
  if(board.every(Boolean)){
    statusEl.textContent = "It's a draw";
    statusEl.style.color = '#334155';
    running = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnEl.textContent = currentPlayer;
}

function highlightWin(combo){
  combo.forEach(i=>cells[i].classList.add('win'));
}

restartBtn.addEventListener('click', startGame);
swapBtn.addEventListener('click', ()=>{
  startingPlayer = startingPlayer === 'X' ? 'O' : 'X';
  startGame();
});

// start
startGame();
