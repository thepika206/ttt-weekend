/*-------------------------------- Constants --------------------------------*/
// this represents the combination of positions of 3 in a row, 1-3 horizontal, 4-6 vertical, and the 7-8 diagonal
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2],
]


/*---------------------------- Variables (state) ----------------------------*/
let board //to be an array representing the state of the 9 spaces on the play area
let turn //Player O is -1, Player X is 1
let winner //determines winner state null:no_winner, 1:Player X, -1:Player O, 'T':tie
let moves //*counts moves taken, ties occurs on move 9 if no winner

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('section.board')
const messageEl = document.querySelector('#message')

/*----------------------------- Event Listeners -----------------------------*/
//each div in section.board has an id, so evt.target.id will be used to set state of board
squareEls.addEventListener('click',function(evt){
  if (!winner && evt.target.id) handleClick(evt)
})


/*-------------------------------- Functions --------------------------------*/
init()

function init () {
  board = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  moves = 0
  turn = 1
  winner = null
  console.log(`initial board:`, board, 'turn:', turn, 'winner:', winner)
  render()
}

function render(){
  board.forEach(function(element, idx){
    if (element !== null) {
      const squareEl = document.getElementById(`sq${idx}`)
      squareEl.textContent = element === 1 ? "X" : "O"
    }
  })
  if (winner === null){
    let player = turn === -1 ? 'O' : 'X' 
    messageEl.textContent = `It's player ${player}'s turn: click any open space"` 
  } else if (winner !== 'T'){
    let winningPlayer = winner -1 ? 'O' : 'X' 
    messageEl.textContent = `The winner is ${winningPlayer}!!`
  } else {
    messageEl.textContent = `No empty spaces remain, looks like a tie game`
  }
}

function handleClick(evt){
  let sqIdx = evt.target.id.slice(2)
  if (board[sqIdx]) {
    return //occupied square, ignore click
  }else{
    board[sqIdx] = turn
    turn = turn * -1
    moves += 1
  }
  getWinner()
  console.log('board:', board, 'moves:',moves, 'turn:', turn, 'winner:', winner)
  render()
}

function getWinner(){
  //add up the values of the board at particular indices per each of the winningCombos trios
  //if the sum equals -3 means player O won, 3 means player X won
  for (let combo of winningCombos){
    let result = board[combo[0]]+board[combo[1]]+board[combo[2]]
    result === -3 ? winner = -1 : result
    result === 3 ? winner = 1 : result  
  }
  winner = (moves === 9 && winner === null) ? 'T' : winner
}

console.log('sanity check')
