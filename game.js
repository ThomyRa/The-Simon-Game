"use strict";

let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStarted = false;

$(document).on("keydown", function () {
  if (!gameStarted) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").on("click", function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(`userClickedPattern: [${userClickedPattern}]`);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("Wrong");
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log(`gamePattern: [${gamePattern}]`);
}

function playSound(name) {
  const buttonSound = new Audio(`sounds/${name}.mp3`);
  buttonSound.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
