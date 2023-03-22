import './style.css';

// Dom Manipulation
const appDiv = document.getElementById('app');
let square = document.createElement('div');
let info = document.createElement('div');
square.classList.add('squareWrap');
info.classList.add('info');
appDiv.appendChild(square);
appDiv.appendChild(info);

// Fun parts start here
let cells = ['', '', '', '', '', '', '', '', ''];
let turnType = 'circle';
info.innerText = `${turnType} turn`;

(function createBoard() {
  cells.map((el, i) => {
    let cellEl = document.createElement('div');
    cellEl.classList.add('cellEl');
    square.appendChild(cellEl);
    cellEl.addEventListener('click', playerTurn);
  });
})();

function playerTurn(e) {
  let nextTurn = document.createElement('div');
  nextTurn.classList.add(turnType);
  e.target.appendChild(nextTurn);
  turnType = turnType === 'circle' ? 'cross' : 'circle';
  info.innerText = `${turnType} turn`;
  e.target.removeEventListener('click', playerTurn);

  checkScore();
}

function checkScore() {
  let allCells = document.querySelectorAll('.cellEl');
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winCombos.map((arr) => {
    let cross = arr.every((combo) =>
      allCells[combo].firstChild?.classList.contains('cross')
    );
    if (cross) {
      info.innerText = `Cross wins!`;
      allCells.forEach((el) => el.replaceWith(el.cloneNode(true)));
      return;
    }
  });

  winCombos.map((arr) => {
    let circle = arr.every(
      (combo) => allCells[combo].firstChild?.className === 'circle'
    );
    if (circle) {
      info.innerText = `Circle wins!`;
      allCells.forEach((el) => el.replaceWith(el.cloneNode(true)));
      return;
    }
  });
}
