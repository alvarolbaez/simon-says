var btnColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickPattern = [];

var started = false;

var level = 0;

$("#start-game").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start-game").text("...");
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

    console.log("right");

    if (userClickPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("😭 Game over 😭, let's try again!")
    $("#start-game").text("START AGAIN");
    startOver();
  }
}

function nextSequence() {

  userClickPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomN = Math.floor(Math.random() * 4);
  var ranChosenCol = btnColours[randomN];
  gamePattern.push(ranChosenCol);

  $("#" + ranChosenCol).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(ranChosenCol);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("press");

  setTimeout(function() {
    $("#" + currentColor).removeClass("press");
  }, 200);

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
