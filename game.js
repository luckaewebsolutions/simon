
// set start variable boolean value for reset functionality
var started = false;

// create array of button colors
var buttonColor = ["red","blue","green","yellow"];

//create empty array to fill with generated sequence
var gamePattern =[];

// create empty array to store user nextSequence
var userClickedPattern = [];

//start at level 0
var level = 0;

// create function to generate random sequence and push into array,
// animate button and play sound


  function nextSequence(){

      var randomNumber = Math.floor(Math.random()*4);
      var randomChosenColor = buttonColor[randomNumber];
      gamePattern.push(randomChosenColor);

    //animate random button selected
      $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
      playSound(randomChosenColor);

    //change level text
      level++;
      $('h1').text('Level ' + level);

}

//use jQuery to detect when a button is clicked and store button
$('div[type=button]').on('click',function(){
  var userChosenColor = this.getAttribute('id');
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name){
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

// animate when user presses button

function animatePress(currentColor){

  $('.' + currentColor).addClass('pressed');

  setTimeout(function(){
    $('.' + currentColor).removeClass('pressed');
  },100);

}

// check if game is already started and start the game

$(document).on('keydown', function(){
  if (!started) {
    $('h1').text('Level ' + level );
    nextSequence();
    started = true;
  }
});


//play the game

// use currentLevel to check answer against array as pressed

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

// check if the sequence is complete and advance to next level

        if (userClickedPattern.length == gamePattern.length){
          setTimeout(nextSequence(),1000);
          userClickedPattern = [];
        }

// if wrong answer then play sound, flash error, and reset game values        
    } else {

      var wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();

      $('body').addClass('game-over');

      setTimeout(function(){
        $('body').removeClass('game-over');
      },200);

      $('h1').text("Game Over, Press Any Key to Restart");

      startOver();
    }

}

// start over

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
