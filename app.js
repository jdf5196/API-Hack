$(function(){

	$('#search-results').hide();

	$('#search-term').submit(function(event){
		$('#resultText').html('');
		$('#search-results').hide();
		var location = $(this).find("input[name='location']").val();
		var guess = parseInt($(this).find("input[name='guess']").val());
		localStorage.setItem('guess', guess);
		getWeather(location);
	});

	$('#impatient').click(function(event){
		$('#resultText').html('');
		var impatientLocation = $('#search-term').find("input[name='location']").val();
		if(impatientLocation == ''){
			alert("I know you're impatient, but I still need your location...");
			return;
		};
		getImpatient(impatientLocation);
	})

	function getWeather(location) {
		$.get('http://api.worldweatheronline.com/free/v2/weather.ashx?key=bc5d928ff57bcf4ea3ed2527e0de0&q=' +location+ '&num_of_days=1&tp=3&format=json', function(data){
			var temp = data.data.current_condition[0].temp_F;
			var humidity = data.data.current_condition[0].humidity;
			var rain = data.data.weather[0].hourly[0].chanceofrain;
			var sunrise = data.data.weather[0].astronomy[0].sunrise;
			var sunSet = data.data.weather[0].astronomy[0].sunset;
			localStorage.setItem('temperature', temp);
			var guessTemp = parseInt(localStorage.getItem('temperature'));
			var guessSave = parseInt(localStorage.getItem('guess'));
			$('#query').val('');
			$('#guess').val('');
			$('#search-results').show();
			if(guessSave === guessTemp){
				$('#resultText').html(' Exactly right! Good Job!<br><br>Current Temperature: '+ temp+'°F<br>'+'Humidity: '+humidity+'%<br>'+'Chance of rain: '+rain+'%'+'<br>'+'Sunrise: '+sunrise+'<br>'+'Sunset: '+sunSet);
			}
			else if(guessSave >= guessTemp -5 && guessSave <= guessTemp +5){
				$('#resultText').html(' Very close! You are within 5 degrees of the actual temperature!<br><br>Current Temperature: '+ temp+'°F<br>'+'Humidity: '+humidity+'%<br>'+'Chance of rain: '+rain+'%'+'<br>'+'Sunrise: '+sunrise+'<br>'+'Sunset: '+sunSet);
			}
			else if(guessSave >= guessTemp -10 && guessSave <= guessTemp +10){
				$('#resultText').html(' Not too bad. You are within 10 degrees of the actual temperature.<br><br>Current Temperature: '+ temp+'°F<br>'+'Humidity: '+humidity+'%<br>'+'Chance of rain: '+rain+'%'+'<br>'+'Sunrise: '+sunrise+'<br>'+'Sunset: '+sunSet);
			}
			else if(guessSave >= guessTemp -20 && guessSave <= guessTemp +20){
				$('#resultText').html(' Kind of far away. You are within 20 degrees of the actual temperature.<br><br>Current Temperature: '+ temp+'°F<br>'+'Humidity: '+humidity+'%<br>'+'Chance of rain: '+rain+'%'+'<br>'+'Sunrise: '+sunrise+'<br>'+'Sunset: '+sunSet);
			}
			else if(guessSave >= guessTemp -30 && guessSave <= guessTemp +30){
				$('#resultText').html(' Not close.. You are within 30 degrees of the actual temperature.<br><br>Current Temperature: '+ temp+'°F<br>'+'Humidity: '+humidity+'%<br>'+'Chance of rain: '+rain+'%'+'<br>'+'Sunrise: '+sunrise+'<br>'+'Sunset: '+sunSet);
			}
			else {
				$('#resultText').html(" Either you are guessing for a location far away or you haven't been outside in a while...<br><br>Current Temperature: "+ temp+'°F<br>'+'Humidity: '+humidity+'%<br>'+'Chance of rain: '+rain+'%'+'<br>'+'Sunrise: '+sunrise+'<br>'+'Sunset: '+sunSet);
			}
		}, 'json')
	};
	function getImpatient(impatientLocation) {
		$.get('http://api.worldweatheronline.com/free/v2/weather.ashx?key=bc5d928ff57bcf4ea3ed2527e0de0&q=' +impatientLocation+ '&num_of_days=1&tp=3&format=json', function(data){
			var temp = data.data.current_condition[0].temp_F;
			var humidity = data.data.current_condition[0].humidity;
			var rain = data.data.weather[0].hourly[0].chanceofrain;
			var sunrise = data.data.weather[0].astronomy[0].sunrise;
			var sunSet = data.data.weather[0].astronomy[0].sunset;
			$('#query').val('');
			$('#guess').val('');
			$('#search-results').show();
			$('#resultText').html(" You're no fun...<br><br> Current Temperature: "+ temp+'°F<br>'+' Humidity: '+humidity+'%<br>'+' Chance of rain: '+rain+'%'+'<br>'+' Sunrise: '+sunrise+'<br>'+' Sunset: '+sunSet);
		}, 'json');
	};
});