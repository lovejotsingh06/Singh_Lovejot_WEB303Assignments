// Assignemnt 4//
//Lovejot Sandhu//

$(function () {
    // Function to calculate the distance in meters between two latitude/longitude pairs on Earth
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var R = 6371000; // Radius of Earth in meters
        var φ1 = (lat1 * Math.PI) / 180;
        var φ2 = (lat2 * Math.PI) / 180;
        var Δφ = ((lat2 - lat1) * Math.PI) / 180;
        var Δλ = ((lon2 - lon1) * Math.PI) / 180;

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    // Check if there is a location value stored in local storage
    var storedLocation = JSON.parse(localStorage.getItem("userLocation"));

    // Get the user's current location using geolocation
    navigator.geolocation.getCurrentPosition(function (position) {
        var currentLat = position.coords.latitude;
        var currentLon = position.coords.longitude;

        // Display the current location in the div#locationhere
        $("#locationhere").text(`Your current location: Latitude ${currentLat}, Longitude ${currentLon}`);

        if (storedLocation) {
            // Calculate the distance between the current and stored locations
            var distance = calcDistanceBetweenPoints(currentLat, currentLon, storedLocation.latitude, storedLocation.longitude);

            // Display the welcome back message and the distance traveled
            $("header").text("Welcome back to the page!");
            $("#distance").text(`You traveled ${distance} meters since your last visit.`);

        } else {
            // If no location is stored, display the welcome message for the first-time visitor
            $("header").text("Welcome to the page for the first time!");
        }

        // Store the current location in local storage
        localStorage.setItem("userLocation", JSON.stringify({ latitude: currentLat, longitude: currentLon }));
    });
});
