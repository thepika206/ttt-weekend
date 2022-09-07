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

konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba' //I wonder what this is for?

/*---------------------------- Variables (state) ----------------------------*/
let board //to be an array representing the state of the 9 spaces on the play area
let turn //!Player O is -1, Player X is 1
let winner //determines winner state null:no_winner, 1:Player X, -1:Player O, 'T':tie
let finalCombo //if there is a winner: the array position of first relevant winningCombos
let keyPressLog //a string to track key presses

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector('section.board')
const messageEl = document.querySelector('#message')
const resetBtn = document.querySelector('#reset')

/*----------------------------- Event Listeners -----------------------------*/
//a listener for a click on the game board where evt.target.id identifies which square was clicked
squareEls.addEventListener('click',function(evt){
  if (!winner && evt.target.id) handleClick(evt)
})
resetBtn.addEventListener('click', init)

//keyboard eventlisteners
window.addEventListener("keydown", function (evt) {
  handleKeyPress(evt)
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
  turn = 1
  winner = null
  finalCombo = null
  keyPressLog = ''
  render()
}

function render(){
  board.forEach(function(element, idx){
    const squareEl = document.getElementById(`sq${idx}`)
    if (element !== null) {
      squareEl.textContent = element === 1 ? 'X' : 'O'
    } else {
      squareEl.textContent = ''
      squareEl.classList.remove('winner')
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
  if (finalCombo !== null) renderFinal()
}


function renderFinal(){
//called by the main render function if there is a winner to style the board in a winner state
  for (let boardIdx of winningCombos[finalCombo]){
    const squareEl = document.getElementById(`sq${boardIdx}`)
    squareEl.classList.add('winner')
  }
  confetti.start(8000,8,150) //there.  I added the confetti
}

function handleClick(evt){
  let sqIdx = evt.target.id.slice(2)
  if (board[sqIdx]) {
    return //ignore click on occupied squares
  }else{
    board[sqIdx] = turn
    turn = turn * -1
  }
  getWinner()
  // console.log('board:', board, 'turn:', turn, 'winner:', winner, 'finalCombo', winningCombos[finalCombo])  //* commented console logging that may behelpful for troubleshooting game state
  render()
}

function getWinner(){
  //declare a winner by adding up the board postion values at the winning combos
  //-3 means player O won, 3 means player X won
  let i = 0
  for (let combo of winningCombos){
    let total = board[combo[0]]+board[combo[1]]+board[combo[2]]
    total === -3 ? winner = -1 : total
    total === 3 ? winner = 1 : total  
    if (winner !== null) {
      finalCombo = i
      return
    }
    i ++
  }
  // declare tie no winner but all spaces are marked
  winner = board.some(function(sq){return sq === null}) ? winner : 'T'
}

function handleKeyPress(evt){
  keyPressLog = keyPressLog + evt.key
  if (keyPressLog === konami){
    alert('konami code detected: nes mode activated')
    document.querySelector('body').classList.add('nes-mode')
  }
  
}

