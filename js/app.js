console.log('san check')
/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board //to be an array representing the state of the 9 spaces on the play area
let turn //state for who's turn it is
let winner //is there a winner or if a time 


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelector("section.board")

/*----------------------------- Event Listeners -----------------------------*/
squareEls.addEventListener('click',function(evt){
  console.log(evt.target.id)
})


/*-------------------------------- Functions --------------------------------*/

