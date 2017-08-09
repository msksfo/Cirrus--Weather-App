/* This is an app that lets a user enter a US zipcode to receive their current local weather conditions plus the appropriate image and caption as expressed by our cat, Cirrus. */

/*-----------VARIABLES-------------------------------------------------------------*/

var farenheit = document.getElementById('farenheit');
var button = document.getElementById('button');

var time = document.getElementById('time');
var temperature = document.getElementById('temperature');
var summary = document.getElementById('summary');

var beachweather;
var rainyweather;
var temperatureString;
var summaryData;
var temperatureData;
var timeData; 
var localTime;

var result = document.getElementById('result');


// lines 23 -66 create the appropriate images and captions to match the weather reading
var beach = document.createElement('img');
beach.src = 'images/beach.jpg';
beach.setAttribute('width', '200px');
var beachCaption = document.createElement('p')
beachCaption.innerHTML = ('Cirrus says: "The weather is perfect! You should go to the beach, purrrr."');

//var sunnyText = document.createTextNode('Cirrus says: "It\'s nice out. You should go to the beach, purrrr."');
//sunnyCaption.appendChild(sunnyText);

var sunny = document.createElement('img');
sunny.src = 'images/sunny.jpg';
sunny.setAttribute('width', '200px');
var sunnyCaption = document.createElement('p')
sunnyCaption.innerHTML = ('Cirrus says: "It\'s a lovely day. You should find a nice spot outside to relax."');

var hot = document.createElement('img');
hot.src = 'images/hot.jpg';
hot.setAttribute('width', '200px');
var hotCaption = document.createElement('p')
hotCaption.innerHTML = ('Cirrus says: "It\'s #$&%*!ing hot! You should sit in front of the fan. If you have air conditioning, I hate you, hiss."');

var cold = document.createElement('img');
cold.src = 'images/cold.jpg';
cold.setAttribute('width', '200px');
var coldCaption = document.createElement('p')
coldCaption.innerHTML = ('Cirrus says: "It\'s too cold. You should go back to bed."');

var rain = document.createElement('img');
rain.src = 'images/rain.jpg';
rain.setAttribute('width', '200px');
var rainCaption = document.createElement('p')
rainCaption.innerHTML = ('Cirrus says: "It\'s raining. I don\'t do rain. You should stay home and watch movies."');

var snow = document.createElement('img');
snow.src = 'images/snow.jpg';
snow.setAttribute('width', '200px');
var snowCaption = document.createElement('p')
snowCaption.innerHTML = ('Cirrus says: "Brrrrrr, so cold! It could even be snowing. You should probably fly to California."');

var moderate = document.createElement('img');
moderate.src = 'images/moderate.jpg';
moderate.setAttribute('width', '200px');
var moderateCaption = document.createElement('p')
moderateCaption.innerHTML = ('Cirrus says: "It\'s not cold, but it\'s not really warm either. You should go have a cocktail; warm yourself up."');


/*------------------------------------------LOGIC-------------------------------*/

zipcode.addEventListener('focus', function(){
	// delete images, captions, and weather display so that user can enter a new zipcode and receive new info.

	resetData();
	resetImage();
	resetCaption();

})

button.addEventListener('click', function(){
	getWeather();
})

zipcode.addEventListener('keyup', function(e){
	
	if (e.keyCode === 13) {
		getWeather();
		document.activeElement.blur();
	}
})


function getWeather(){
	var zipcode = document.getElementById('zipcode').value;

	var weatherRequest = new XMLHttpRequest();

	weatherRequest.open("GET", 'https://api.apixu.com/v1/current.json?key=c68dc51f6d8f41feb27200519170508&q=' + zipcode);


	weatherRequest.onload = function(){
		var weatherData = JSON.parse(weatherRequest.responseText);

		//timeData = weatherData.location.localtime_epoch;
		//localTime = new Date(timeData * 1000).toString();
		localTime = weatherData.location.localtime;
		temperatureData = weatherData.current.temp_f;
		summaryData = weatherData.current.condition.text;


		if (summaryData.toLowerCase().includes('sunny') || summaryData.toLowerCase().includes('sky clear')){
			beachweather = true;
		} else if (summaryData.toLowerCase().includes('rain') || summaryData.toLowerCase().includes('drizzle')){
			rainyweather = true;
		}

		renderHTML(weatherData);
	}

	weatherRequest.send();
	resetzipcode();
}


function renderHTML(data){
	// build up the html string(s) that will be displayed when the weather data is returned from the api

	var timeString = 'The local time is ' + localTime;
	var temperatureString = 'The current temperature is: ' + temperatureData + ' degrees farenheit.';
	var summaryString = "Sky conditions: " + summaryData + '.';
	
	time.insertAdjacentHTML('beforeend', timeString );
	temperature.insertAdjacentHTML('beforeend', temperatureString);
	summary.insertAdjacentHTML('beforeend', summaryString);

	choseImage(); 
}

function choseImage(){
	// chose an appropriate image and caption based on weather data returned from api

	if (rainyweather === true) {
		result.insertBefore(rain, result.childNodes[2]);
		result.insertBefore(rainCaption, result.childNodes[3]);
	} else if (temperatureData > 70 && temperatureData < 91 && beachweather === true) {
		result.insertBefore(beach, result.childNodes[2]);
		result.insertBefore(beachCaption, result.childNodes[3]);
	} else if (temperatureData > 70 && temperatureData < 90){
		result.insertBefore(sunny, result.childNodes[2]);
		//sunnyCaption.appendChild(sunnyText);
		result.insertBefore(sunnyCaption, result.childNodes[3]);
	} else if (temperatureData > 89) {
		result.insertBefore(hot, result.childNodes[2]);
		result.insertBefore(hotCaption, result.childNodes[3]);
	}  else if (temperatureData < 33) {
		result.insertBefore(snow, result.childNodes[2]);
		result.insertBefore(snowCaption, result.childNodes[3]);
	} else if (temperatureData < 50){
		result.insertBefore(cold, result.childNodes[2]);
		result.insertBefore(coldCaption, result.childNodes[3]);
	} else if (temperatureData < 71 && temperatureData > 49){
		result.insertBefore(moderate, result.childNodes[2]);
		result.insertBefore(moderateCaption, result.childNodes[3]);
	}
}

function resetzipcode (){
	// clear the input field so it will be ready for repeat use
	document.getElementById('zipcode').value = '';
}

function resetData(){
	time.innerHTML = '';
	temperature.innerHTML = '';
	summary.innerHTML = '';
	beachweather = '';
	rainyweather = '';
}

function resetImage(){
	sunny.remove();
	moderate.remove();
	rain.remove();
	cold.remove();
	hot.remove();
	snow.remove();
	beach.remove();
}

function resetCaption(){
	sunnyCaption.remove();
	moderateCaption.remove();
	rainCaption.remove();
	coldCaption.remove();
	hotCaption.remove();
	snowCaption.remove();
	beachCaption.remove();
}












