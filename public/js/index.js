(function () {
	"use strict";
	var record = 0;
	var simon = [];
	var userG = [];
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function check(sequence, user) {
		// compare the user's input with the correct sequence
		for (var i = 0; i < user.length; i++) {
			if (sequence[i] != user[i]) {
				console.log("false");
				return(false);
			}
		}
		console.log("true");
		return(true);
	}
	function addToSimon() {
		simon.push(randomInt(1,5));
		console.log(simon);
	}
	function userInput() {
		var val = this.getAttribute("data-val");
		userG.push(val);
		console.log(userG);
		game(simon, userG);
	}
	function addUserEvent() {
		var userIn = $(".userInput");
		for (var i = 0; i < userIn.length; i++) {
			userIn[i].addEventListener("click", userInput, false);
			$(userIn[i]).hover(hoverOn, hoverOff);
		}
	}
	function hoverOn() {
		$(this).css("opacity", ".75");
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
				return;
			}
		}
		showNextIn();
	}
	function onRound(sequence) {
		$("#level").html("Level: " + sequence.length);
		if (sequence.length > record) {
			record = sequence.length;
			document.getElementById("record").innerHTML = "record: " + record;
		}
	}
	function killUserInput() {
		var userIn = document.getElementsByClassName("input");
		for (var i = 0; i < userIn.length; i++) {
			userIn[i].removeEventListener("click", userInput, false);
			$(userIn[i]).off("mouseenter mouseleave");
			$(userIn[i]).css("opacity", "0.5");
		}
	}
	function nextRound() {
		killUserInput();
		userG = [];
		console.log("user array cleared");
		$("#popup").animate({
				opacity: "show"
			},100).delay(1000).animate({
				opacity: "hide"
			},100).promise().done(function() {
				onRound(simon);
				addToSimon();
				showSequence(simon);
			});
	}
	function game(sequence, user) {
		var right = check(simon, user);
		if (right == false) {
			// end game
			killUserInput();
			userG = [];
			simon = [];
			onRound(simon)
			console.log("arrays cleared")
			alert("GAME OVER.");
		}
		else if (sequence.length == user.length && right == true) {
			//progress to next round
			nextRound();
		}
	}
	function start() {
		addToSimon();
		showSequence(simon);
		onRound(simon);
	}
	document.getElementById("start").addEventListener("click", start, false);
})();