var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var f = 0;
var n = 0;
var level = 0;
$("html").keypress(function () {
  if (f == 0) {
    f = 1;
    nextSequence();
  }
});
function nextSequence() {
  $("h1").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  console.log(level);
}
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern[n] != gamePattern[n]) {
    startOver();
  } else {
    n++;
    if (n === gamePattern.length) {
      n = 0;
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  f = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game Over, Press Any Key to Restart");
}
