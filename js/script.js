$(document).ready(function () {

    console.log("hello");


    weatherApp = {

        $targetArea: $("#weather"),

        weatherApiKey: "",

        localStorageKey: "openWeatherApi",


        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveAPIKey();
            }
            var zip = $("#zip").val().trim();
            if (zip === null || zip.length < 5 || zip.length > 5) {
                weatherApp.$targetArea.html("Enter a valid zipcode.");
            } else {
                weatherApp.getWeatherData(zip);
            }

            console.log(apikey);
            //console.log(zip);
        },
        getWeatherData : function (zipcode) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            
            $.getJSON(url, function (data) {
                if (data.cod === 200) {
                    //weatherApp.$targetArea.html("Success!");
                    weatherDesc = data.weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Current Condition:  " + weatherDesc + '</p>');
                    weatherTemp = data.main.temp;
                    weatherApp.$targetArea.append('<p>' + "Current Temperature:  " +  weatherTemp + "° F" +  '</p>');
                    weatherMaxTemp = data.main.temp_max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTemp + "° F" + '</p>');
                    weatherMinTemp = data.main.temp_min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTemp + "° F" + '</p>');
                    weatherHum = data.main.humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHum + "%" + '</p>');
                    console.log(weatherDesc, weatherTemp, weatherMaxTemp, weatherMinTemp, weatherHum);
                    console.log("I'm hungry for butter.")
                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                }
            }).fail ( function() {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
            
        },

        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser");

            } 
            else {
                //Get API Key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                   // weatherApp.$targetArea.html("Sorry, no api key was found.");
                    return false;
                }
                return true;
            }
        },
        saveAPIKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
            } 
            else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },


    };

    $("#submit").click(function () {
        weatherApp.getFormData();
        return false;
    });
        if (weatherApp.loadApiKey()) {
            $("#apidiv").attr("class", "hide");
        }
});