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
  [6,4,8],
]


/*---------------------------- Variables (state) ----------------------------*/
let board //to be an array representing the state of the 9 spaces on the play area
let turn //Player O is -1, Player X is 1

let winner //determines winner state null:no_winner, 1:Player X, -1:Player O, 'T':tie


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
  turn = 1
  winner = null
  console.log(`initial board:`, board, 'turn:', turn, 'winner:', winner)
  render()
}

function render(){
  //render X or O in the space according to the board array
  board.forEach(function(element, idx){
    if (element !== null) {
      document.getElementById(`sq${idx}`).textContent = element === 1 ? "X" : "O"
    }
  })
  //render a message for who's turn it is if the game is not over or the game over message
  if (winner === null){
    let player = turn === -1 ? 'O' : 'X' 
    messageEl.textContent = `It's player ${player}'s turn: click any open space"` 
  } else if (winner !== 'T'){
    let winningPlayer = winner -1 ? 'O' : 'X' 
    messageEl.textContent = `The winner is ${winningPlayer}!!`
  }
  //! need to return here to provide winner and tie game over messages   
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
  console.log(`board:`, board, 'turn:', turn, 'winner:', winner)
  render()
}

function getWinner(){
  //add up the values of the board at particular indices per winningCombos sub arrays
  //if the sum equals -3 or 3 then there is a winning combo
  for (let combo of winningCombos){
    let result = board[combo[0]]+board[combo[1]]+board[combo[2]]
    result === -3 ? winner = -1 : result
    result === 3 ? winner = 1 : result
  }
  // console.log(board[winningCombos[0][0]])
}

console.log('sanity check')
