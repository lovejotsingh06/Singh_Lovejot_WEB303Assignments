let team = $.getJSON("team.json").done(function(data){
    $.each(data.members, function(employee, employeeData) {
        console.log("Employee:", employee, "and Employee Data:", employeeData);

        $('#team').append(`
        <h2>${employeeData.name}</h2>
        <h5>${employeeData.position}</h5>
        <p>${employeeData.bio}</p>
        `);
    });
});

console.log("Main team:", team);

$(function Ajax() {
    $.ajax({
        url: "team.json",
        beforeSend: function() {
            let loadText = $("<h2></h2>").text("Loading...");
            $(`div#team`).append(loadText);
        },
        error: function() {
            // Handle errors here
        },
        timeout: 3000,
        success: function(data) {
            $(`div#team`).empty();
            $.each(data.members, function(employee, employeeData) {
                console.log("Employee:", employee, "and Employee Data:", employeeData);

                $('#team').append(`
                <h2>${employeeData.name}</h2>
                <h5>${employeeData.position}</h5>
                <p>${employeeData.bio}</p>
                `);
            });
        }
    });
});