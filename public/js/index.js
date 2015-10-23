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
		user_array.unshift($(this).val());
		console.log(user_array);
	});

	function getRandomIntInclusive(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	$('.submit-btn').click(function() {
		random_array.unshift(getRandomIntInclusive(0, 3));
		console.log(random_array);
		if(random_array == user_array){
			console.log("success");
		}
	});
});