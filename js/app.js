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
let turn //!Player O is -1, Player X is 1
let winner //determines winner state null:no_winner, 1:Player X, -1:Player O, 'T':tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('section.board')
const messageEl = document.querySelector('#message')
const resetBtn = document.querySelector('#reset')

/*----------------------------- Event Listeners -----------------------------*/
//each div in section.board has an id, so evt.target.id will be used to set state of board
squareEls.addEventListener('click',function(evt){
  if (!winner && evt.target.id) handleClick(evt)
})
resetBtn.addEventListener('click', init)

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
  // board = [1, 1, -1, -1, -1, 1, 1, -1, null] //* uncomment this line for a quick cats game test
  turn = 1
  winner = null
  console.log(`initial board:`, board, 'turn:', turn, 'winner:', winner)
  render()
}

function render(){
  board.forEach(function(element, idx){
    const squareEl = document.getElementById(`sq${idx}`)
    if (element !== null) {
      squareEl.textContent = element === 1 ? 'X' : 'O'
    } else {
      squareEl.textContent = ''
    } 
  })
  let message =''
  if (winner === 'T') {
    message = `No empty spaces remain, looks like a tie game`
  } else if (winner === null) {
    let player = turn === -1 ? 'O' : 'X' 
    message = `It's player ${player}'s turn: click any open space` 
  } else {
    let winningPlayer = winner -1 ? 'O' : 'X' 
    message = `The winner is ${winningPlayer}!!`
  } 
  messageEl.textContent = message
}

function handleClick(evt){
  let sqIdx = evt.target.id.slice(2)
  if (board[sqIdx]) {
    return //occupied square, ignore click
  }else{
    board[sqIdx] = turn
    turn = turn * -1
  }
  getWinner()
  console.log('board:', board, 'turn:', turn, 'winner:', winner)
  render()
}

function getWinner(){
  //declare a winner by adding up the board postion values at the winning combos
  //-3 means player O won, 3 means player X won
  for (let combo of winningCombos){
    let total = board[combo[0]]+board[combo[1]]+board[combo[2]]
    total === -3 ? winner = -1 : total
    total === 3 ? winner = 1 : total  
  }
  // declare tie if any space is (!null)
  winner = board.some(function(sq){return sq === null}) ? winner : 'T'
}

console.log('sanity check')


