$(document).ready(function() {
	"use strict";

	var random_array = [];
	var user_array = [];


	$("#red").attr('value', 0);
	$("#yellow").attr('value', 1);
	$("#orange").attr('value', 2);
	$("#blue").attr('value', 3);

	
	$(".color-btn").click(function() {
		$(this).css('opacity', '1');
		user_array.push($(this).val());
		console.log(user_array);
	});


	function getRandomIntInclusive(min, max) {
  		return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
	}

	function getRound() {
		var i = 0;
		$('.start-btn').click(function() {
			i++;
			$(".round").html("<h4>Round: " + i + "</h4>");
		});
	}

	function initReset() {
		$('.reset-btn').click(function() {
			random_array = [];
			user_array = [];
			getRound();
		});
	}

	function animateSimon() {
		for(var i = 0; i < random_array.length; i++) {
			random_array[i];
			if(random_array[i] == 0) {
				$("#red").addClass("active");
				setTimeout(function() {
		  			$("#red").removeClass("active");
				}, 500);
			}
		}
	}

	function startSimon() {
		getRound();
		initReset();
		$('.start-btn').click(function() {
			random_array.push(getRandomIntInclusive(0, 3));
			console.log(random_array);
			animateSimon();
			if(random_array.length >= 1) {
				if(random_array[user_array.length - 1] != user_array[user_array.length - 1]) {
					user_array = [];
					random_array = [];
					console.log("FAILURE");
				}
			}

			// if(random_array == user_array){
			// 	console.log("success");
			// }
		});
	}
	startSimon();

});