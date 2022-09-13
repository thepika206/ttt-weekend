const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba' //I wonder what this is for?

let keyPressLog = '' //a string to track key presses

//keyboard eventlisteners
window.addEventListener("keydown", function (evt) {
  handleKeyPress(evt)
})

function handleKeyPress(evt){
  keyPressLog = keyPressLog + evt.key
  if (keyPressLog === konami){
    alert('konami code detected: nes mode activated')
    document.querySelector('body').classList.add('nes-mode')
  }
  
}