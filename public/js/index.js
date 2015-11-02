$(document).ready(function() {
	"use strict";

	var record = 0;
	var simon = [];
	var userGuess = [];

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function checkValue(sequence, user) {
		for (var i = 0; i < user.length; i++) {
			if (sequence[i] == user[i]) {
				return true;
			}
		}
		return false;
	}

	function addToSimon() {
		simon.push(randomInt(0, 3));
	}

	function userInput() {
		userGuess.push($(this).attr("data-val"));
		initGame(simon, userGuess);
	}

	function addUserEvent() {
		var userIn = $(".userInput");
		for (var i = 0; i < userIn.length; i++) {
			userIn[i].addEventListener("click", userInput, false);
			$(userIn[i]).hover(hoverOn, hoverOff);
		}
	}

	function hoverOn() {
		$(this).css("opacity", "1");
	}

	function hoverOff() {
		$(this).css("opacity", "0.5");
	}

	function showSequence(sequence) {
		var i = 0;
		function showNextIn() {
			if (i < sequence.length) {
				$("#" + sequence[i]).animate({
					opacity: "1"
				}, 250).delay(500).animate({
					opacity: "0.5"
				}, 250).promise().done(function() {
					i++;
					showNextIn();
				});
			}
			else {
				addUserEvent();
			}
		}
		showNextIn();
	}

	function onRound(sequence) {
		$("#level").html("Level: " + sequence.length);
		if (sequence.length > record) {
			record = sequence.length;
			$("#record").html("Record: " + record);
		}
	}

	function nextRound() {
		userGuess = [];
		$("#start").delay(1000).promise().done(function() {
			onRound(simon);
			addToSimon();
			showSequence(simon);
		});
	}

	function initGame(sequence, user) {
		var right = checkValue(simon, userGuess);
		if (right == false) {
			userGuess = [];
			simon = [];
			onRound(simon);
			alert("Game Over");
		}
		else if (sequence.length == user.length && right == true) {
			nextRound();
		}
	}

	function startSimon() {
		addToSimon();
		showSequence(simon);
		onRound(simon);
	}

	$('#start').click(function() {
		startSimon();
		$('#start').attr("disabled", "true");
	});

	// $('.squares').click(function() {
	// 	userChoice = $(this).attr('data-num')
	// });

	// var simonSequence = [];

	// function compareChoice() {

	// 	var i = 0;
	// 	// if the current choice is correct AND we're done iterating simon's array
	// 	if(simonSequence[i] == userChoice && i >= simonSequence.length) {
	// 		// now it's simon's turn
	// 		moveSimon();
	// 	} else if (simonSequence[i] == userChoice) {
	// 		i -= 1;
	// 		$('#score').text(i);
	// 	} else {
	// 		gameOver();
	// 	}
	// }

	// function gameOver() {
	// 	window.reload;
	// }

	// function animateSequence() {
	// 	var intervalId = setInterval(function() {
	// 		if(i >= simonSequence.length) {
	// 			clearInterval(intervalId);
	// 		}
	// 		animate(simonSequence[i]);

	// 		i += 1;

	// 	}, 1000);
	// }

});