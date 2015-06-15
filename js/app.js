(function(){

	var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
  	var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
	var IMG_WEATHER_URL ="http://openweathermap.org/img/w/"

	var time = new Date();
	var timeNow = time.toLocaleTimeString();
	var $body = $("body");
	var $loader = $(".loader");
	var nombreNuevaCiudad = $("[data-input='city-add']");
	var buttonAdd = $("[data-button='add']");

	buttonAdd.on("click", addNewCity);
	nombreNuevaCiudad.on("keypress",function(event){

		if(event.which==13){
			addNewCity();
		}
	});
	var cityWeather = {};
	cityWeather.zone;
	cityWeather.icon;
	cityWeather.temp;
	cityWeather.temp_max;
	cityWeather.temp_min;
	cityWeather.main;




		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getCords, error);

		
	}else{
		alert("actualiza tu navegador");
	}


	


		function error(error){

			alert("Se ha producido un error " + error.code);
			// 0 error desconocido
			// 1 permiso denegado
			// 2 posicion no disponible
			// 3 timeout
		}

		function getCords(position){

			var lat = position.coords.latitude;
			var lon = position.coords.longitude;

			console.log(" Tu posicion es " + lat + ", " + lon);

			$.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon, getCurrentWeather);
		};

		function getCurrentWeather(data){
				
			cityWeather.zone = data.name;
			cityWeather.icon = IMG_WEATHER_URL + data.weather[0].icon + ".png";
			cityWeather.temp = data.main.temp - 273.15;
			cityWeather.temp_max = data.main.temp_max - 273.15;
			cityWeather.temp_min = data.main.temp_min - 273.15;
			cityWeather.main = data.weather[0].main;

          renderTemplate(cityWeather);
		}

		function activateTemplate(id){
			var t = document.querySelector(id);
			return document.importNode(t.content, true);

		}

		function renderTemplate(cityWeather){

			var clone = activateTemplate("#template--city");
			clone.querySelector("[data-time]").innerHTML = timeNow;
			clone.querySelector("[data-city]").innerHTML =  cityWeather.zone;
			clone.querySelector("[data-icon]").src = cityWeather.icon;
			clone.querySelector("[data-temp='current']").innerHTML =  cityWeather.temp.toFixed(1);
			clone.querySelector("[data-temp='max']").innerHTML = cityWeather.temp_max.toFixed(1) ;
			clone.querySelector("[data-temp='min']").innerHTML = cityWeather.temp_min.toFixed(1) ;

			$( $body ).append(clone);

			$( $loader ).hide();

		}

		function addNewCity(event){
			event.preventDefault();
			$.getJSON(API_WEATHER_URL + "q=" + $(nombreNuevaCiudad).val(), getWeatherNewCity);
			$(nombreNuevaCiudad).val("");
		}

		function getWeatherNewCity(data){
			cityWeather = {};
			cityWeather.zone = data.name;
			cityWeather.icon = IMG_WEATHER_URL + data.weather[0].icon + ".png";
			cityWeather.temp = data.main.temp - 273.15;
			cityWeather.temp_max = data.main.temp_max - 273.15;
			cityWeather.temp_min = data.main.temp_min - 273.15;
			cityWeather.main = data.weather[0].main;

          renderTemplate(cityWeather);
		}
})();

