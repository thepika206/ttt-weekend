/*-------------------------------- Constants --------------------------------*/



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
  console.log(evt.target.id)
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
  console.log(`game loaded - board state`, board, 'turn', turn, 'winner', winner)
  console.log(squareEls)
  render()
}
function render(){
  board.forEach(function(element, idx){
    if (element === -1){
      let square = document.getElementById(`sq${idx}`)
      square.textContent = "O"
    } else if (element === 1) {
      let square = document.getElementById(`sq${idx}`)
      square.textContent = "X"
    }
  })
  if (winner === null){
    console.log('here')
    turn === -1 ? messageEl.textContent = "O's turn: click any open space" : messageEl.textContent = "O's turn: click any open space"
  }
//! need to return here to provide winner and tie game over messages   
}
