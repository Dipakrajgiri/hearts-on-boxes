/* alert("This game is highly addictive so play on your own risk");
  */
/* Variables declaration section */
let refresh = () => {
  location.reload();
}
let turn = 0, aiTurn = 0;
let playerOne = {
  name: "",
  emoji: "images/red-heart.jfif",
  score: 0,

}
let playerTwo = {
  name: "",
  emoji: "images/yellow-heart.jfif",
  score: 0,
}
let gameover=0;
let player = [playerOne, playerTwo];
/* console.log(player[0].name); */
let clickedBoxColor = "green";
let x, y, u, d, ul, ur, dl, dr, turnFlag;
let horizontalBox = document.querySelectorAll('.horizontal-box');
let verticleBox = document.querySelectorAll('.verticle-box');
let playerOneName = document.getElementById("player-one-name");
let playerTwoName = document.getElementById("player-two-name");
let playerName = [playerOneName, playerTwoName];
let playerOneScore = document.getElementById("player-one-score");
let playerTwoScore = document.getElementById("player-two-score");
let playerScore = [playerOneScore, playerTwoScore];
let boardbox = document.querySelectorAll('.heart-emoji');
let initialBoxColor = window.getComputedStyle(horizontalBox[0]).backgroundColor;
let invalidMove = document.getElementById("invalidMove");

for (let i = 0; i < horizontalBox.length; i++) {
  horizontalBox[i].num = i;
  verticleBox[i].num = i;
  horizontalBox[i].type = "horizontal";
  verticleBox[i].type = "verticle";
  /* horizontalBox[i].state = 0;
  verticleBox[i].state = 0; */
}


/* '''''''''''''''''''''''''''''''''''''' */
function getUserInput() {
  // Get the value from the input field
  let userInputOne = document.getElementById("userInputOne").value;
  playerOne.name = userInputOne;
  playerOneName.textContent = userInputOne;
  let userInputTwo = document.getElementById("userInputTwo").value;
  playerTwo.name = userInputTwo;
  playerTwoName.textContent = userInputTwo;

}

function removeInvalidMove() {
  invalidMove.style.display = "none";
}


/*Game working*/

const start = () => {
  playerOneName.style.color = "Green";
  for (let i = 0; i < horizontalBox.length; i++) {
    horizontalBox[i].addEventListener('click', function() {
      game(horizontalBox[i]);
      /*  console.log("clicked" + horizontalBox[i].num); */
    })
    verticleBox[i].addEventListener('click', function() {
      game(verticleBox[i]);
      /*  console.log("clicked" + verticleBox[i].num); */
    })
  }
}

const game = (clickedBox) => {
  
  var backgroundColor = window.getComputedStyle(clickedBox).backgroundColor;
  turnFlag = 1;
  /* ***************************************** */

  if (backgroundColor == initialBoxColor) {


    clickedBox.style.backgroundColor = clickedBoxColor;
    if (clickedBox.type == "horizontal") {

      x = clickedBox.num % 5;
      y = parseInt(clickedBox.num / 5);
      u = clickedBox.num - 5;
      d = clickedBox.num + 5;
      ul = x + (y - 1) * 6;
      ur = x + 1 + (y - 1) * 6;
      dl = x + y * 6;
      dr = x + 1 + y * 6;
      /*  console.log(x,y,u,ul,ur,d,dl,dr);  */
      if ( /* ul>=0 && ur>=0 && u>=0 && ul<=29 && ur<=29  && u<=29 */ y != 0 && horizontalBox[u].style.backgroundColor
        == clickedBoxColor && verticleBox[ul].style.backgroundColor == clickedBoxColor &&
        verticleBox[ur].style.backgroundColor == clickedBoxColor) {
        player[turn].score++;
        playerScore[turn].textContent = player[turn].score;
        boardbox[u].src = player[turn].emoji;
        turnFlag = 0;

      }
      if ( /* dl>=0 && dr>=0 && d>=0 && dl<=29 && dr<=29  && d<=29 */y != 5 && horizontalBox[d].style.backgroundColor
        == clickedBoxColor && verticleBox[dl].style.backgroundColor == clickedBoxColor &&
        verticleBox[dr].style.backgroundColor == clickedBoxColor) {
        player[turn].score++;
        playerScore[turn].textContent = player[turn].score;
        boardbox[clickedBox.num].src = player[turn].emoji;
        turnFlag = 0;

      }
      if (turnFlag) {
        turn = (turn + 1) % 2;
        playerName[turn].style.color = "green";
        playerName[(turn + 1) % 2].style.color = "black";
      }


    }

    else {

      x = clickedBox.num % 6;
      y = parseInt(clickedBox.num / 6);
      u = clickedBox.num - 1;
      d = clickedBox.num + 1;
      ul = x - 1 + (y + 1) * 5;
      ur = x - 1 + y * 5;
      dl = x + (y + 1) * 5;
      dr = x + y * 5;
      /*   console.log(x,y,u,ul,ur,d,dl,dr);  */
      if ( /* ul>=0 && ur>=0 && u>=0 && ul<=29 && ur<=29  && u<=29 */ x != 0 && verticleBox[u].style.backgroundColor
        == clickedBoxColor && horizontalBox[ul].style.backgroundColor == clickedBoxColor &&
        horizontalBox[ur].style.backgroundColor == clickedBoxColor) {
        player[turn].score++;
        playerScore[turn].textContent = player[turn].score;
        boardbox[x - 1 + y * 5].src = player[turn].emoji;
        turnFlag = 0;

      }
      if ( /* dl>=0 && dr>=0 && d>=0 && dl<=29 && dr<=29  && d<=29 */x != 5 && verticleBox[d].style.backgroundColor
        == clickedBoxColor && horizontalBox[dl].style.backgroundColor == clickedBoxColor &&
        horizontalBox[dr].style.backgroundColor == clickedBoxColor) {
        player[turn].score++;
        playerScore[turn].textContent = player[turn].score;
        boardbox[x + y * 5].src = player[turn].emoji;
        turnFlag = 0;

      }
      if (turnFlag) {
        turn = (turn + 1) % 2;
        playerName[turn].style.color = "green";
        playerName[(turn + 1) % 2].style.color = "black";
      }


    }


    /* ***************************************** */
  }
  else {
    invalidMove.style.display = "block";
  }
 

  if ((player[0].score + player[1].score) == 25) {
    gameOver();
  }
}


const gameOver = () => {
  if(!gameover){
  let winner = player[0].score > player[1].score ? 0 : 1;
  playerName[winner].textContent = playerName[winner].innerText + " is Winner";
  playerName[winner].style.color = "green";
  playerName[(winner + 1) % 2].style.color = "black";
  gameover=1;
  }
}



/* ******************AI code******************** */

const aiPlay = () => {
  playerOneName.style.color = "green";
  playerTwoName.textContent = "AI"
  for (let i = 0; i < horizontalBox.length; i++) {
    horizontalBox[i].addEventListener('click', function() {
      game(horizontalBox[i]);
      while (turn == 1&&!gameover) {
        let emptyBoxes = Array.from(document.querySelectorAll('.horizontal-box, .verticle-box'))
          .filter(box => window.getComputedStyle(box).backgroundColor === initialBoxColor);
         console.log(emptyBoxes);
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
       /*  aiBox=getAIBox(); */
        aiBox=emptyBoxes[randomIndex];
        game(aiBox);

      }
    })
    verticleBox[i].addEventListener('click', function() {
      game(verticleBox[i]);
      while (turn == 1&&!gameover) {
          let emptyBoxes = Array.from(document.querySelectorAll('.horizontal-box, .verticle-box'))
            .filter(box => window.getComputedStyle(box).backgroundColor === initialBoxColor);
           console.log(emptyBoxes);
          let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
         /*  aiBox=getAIBox(); */
          aiBox=emptyBoxes[randomIndex];
          game(aiBox);

      }
    })
  }

}

/* 
const getAIBox = () => {
      let emptyBoxes = Array.from(document.querySelectorAll('.horizontal-box, .verticle-box'))
        .filter(box => window.getComputedStyle(box).backgroundColor === initialBoxColor);
       console.log(emptyBoxes);
       for(let i=0;i<emptyBoxes.length;i++){
         emptyBoxes[i].state=isBoxCompletion(emptyBoxes[i]);
       }
      let stateTwoBoxes=emptyBoxes.filter(box=>box.state==2);
      let stateOneBoxes=emptyBoxes.filter(box=>box.state==1);
      let stateZeroBoxes=emptyBoxes.filter(box=>box.state==0);
       console.log(stateTwoBoxes);
       console.log(stateOneBoxes);
       console.log(stateZeroBoxes);
     if(stateTwoBoxes.length>0){
       let randomIndex = Math.floor(Math.random() * stateTwoBoxes.length);
       return stateTwoBoxes[randomIndex];
     }
     else if(stateOneBoxes.length>0){
       let randomIndex = Math.floor(Math.random() * stateOneBoxes.length);
       return stateOneBoxes[randomIndex];
     }
   else{
   //return minBox(stateZeroBoxes); 
     let randomIndex = Math.floor(Math.random() * stateZeroBoxes.length);
      return stateZeroBoxes[randomIndex];
    }
 
} 


const isBoxCompletion=(box)=>{
    let state=0;
    if (box.type == "horizontal") {
      x = box.num % 5;
      y = parseInt(box.num / 5);
      u = box.num - 5;
      d = box.num + 5;
      ul = x + (y - 1) * 6;
      ur = x + 1 + (y - 1) * 6;
      dl = x + y * 6;
      dr = x + 1 + y * 6;
      if ( y != 0 && horizontalBox[u].style.backgroundColor
        == clickedBoxColor && verticleBox[ul].style.backgroundColor == clickedBoxColor &&
        verticleBox[ur].style.backgroundColor == clickedBoxColor) {
       state++;
      }
      if ( y != 5 && horizontalBox[d].style.backgroundColor
        == clickedBoxColor && verticleBox[dl].style.backgroundColor == clickedBoxColor &&
        verticleBox[dr].style.backgroundColor == clickedBoxColor) {
        state++;
      }
    }
    else {
      x = box.num % 6;
      y = parseInt(box.num / 6);
      u = box.num - 1;
      d = box.num + 1;
      ul = x - 1 + (y + 1) * 5;
      ur = x - 1 + y * 5;
      dl = x + (y + 1) * 5;
      dr = x + y * 5;
      if (  x != 0 && verticleBox[u].style.backgroundColor
        == clickedBoxColor && horizontalBox[ul].style.backgroundColor == clickedBoxColor &&
        horizontalBox[ur].style.backgroundColor == clickedBoxColor) {
        state++;
      }
      if ( x != 5 && verticleBox[d].style.backgroundColor
        == clickedBoxColor && horizontalBox[dl].style.backgroundColor == clickedBoxColor &&
        horizontalBox[dr].style.backgroundColor == clickedBoxColor) {
        state++;
      }
    }
  return state;
} */
/* 
const minBox=(boxes)=>{

  let emptyBoxes;
  for(let i=0;i<boxes.length;i++){
  boxes[i].style.backgroundColor=clickedBoxColor;
    emptyBoxes = Array.from(document.querySelectorAll('.horizontal-box, .verticle-box'))
    .filter(box => window.getComputedStyle(box).backgroundColor === initialBoxColor);
     for(let j=0;j<emptyBoxes.length;j++){
         emptyBoxes[j].state=isBoxCompletion(emptyBoxes[j]);
       }
      let stateTwoBoxes=emptyBoxes.filter(box=>box.state==2);
      let stateOneBoxes=emptyBoxes.filter(box=>box.state==1);
      let stateZeroBoxes=emptyBoxes.filter(box=>box.state==0);
      if(stateTwoBoxes.length==0&&stateOneBoxes.length==0){
       boxes[i].minState=1;
     }
     else {
       boxes[i].minState=0;
     }
  boxes[i].style.backgroundColor=initialBoxColor;
 }
  let minStateZeroBoxes=emptyBoxes.filter(box=>box.minState==0);
  let minStateOneBoxes=emptyBoxes.filter(box=>box.minState==1);
  if(minStateOneBoxes.length>0){
     let randomIndex = Math.floor(Math.random() *minStateOneBoxes.length);
     return minStateOneBoxes[randomIndex];
   }
  else{
    let randomIndex = Math.floor(Math.random() *minStateZeroBoxes.length);
     return minStateZeroBoxes[randomIndex];
    //needed more intellgence from here
  }
}
 */
