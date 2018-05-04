$(document).ready(function() {
    'use strict';

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.legend.display = false;

    var activeSensor = "compass";

    var curMin = 1000;
    var curMax = -1000;

    var SensorData = [];
    var labels = [];
    var data = [];

    var chart = new Chart($("#line-chart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: "#FF5500",
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
            }
        }
    });



    var sensorInput = document.getElementById("sensorinput");
    var sensorParam = "object_temp";

    var SensorData = [];

    $("#compass").click(function() {

        resetExtremes();
    });


    $("#acc").click(function() {
        activeSensor = "acc";
        resetExtremes();
    });

    $("#gyro").click(function() {
        activeSensor = "gyro";
        resetExtremes();
    });

    $("#humidity").click(function() {
        activeSensor = "humidity";
        resetExtremes();
    });

    $("#object_temp").click(function() {
        activeSensor = "object_temp";
        resetExtremes();
    });


    $("#light").click(function() {
        activeSensor = "light";
        resetExtremes();
    });

    $("#ambient_temp").click(function() {
        activeSensor = "ambient_temp";
        resetExtremes();
    });
    console.log('Creating socket');
    let socket = new WebSocket('wss://healthie-backend.mybluemix.net/public/sensordata');
    socket.onopen = function() {
        console.log('Socket open.');
    };
    socket.onmessage = function(message) {
        // console.log('Socket server message', message);
        let data = JSON.parse(message.data);
        //console.log(data);

        if (activeSensor != "") {
            SensorData.push(data.d);
            labels.push(data.d.timestamp);


            var compass, acc, gyro, humidity, object_temp, light, ambient_temp;
            var diff_compass, diff_acc, diff_gyro, diff_humidity, diff_object_temp, diff_light, diff_ambient_temp;

            var vx = SensorData[SensorData.length - 1].compass_x;
            var vy = SensorData[SensorData.length - 1].compass_y;
            var vz = SensorData[SensorData.length - 1].compass_z;
            compass = Math.sqrt(vx * vx + vy * vy + vz * vz);


            var vx = SensorData[SensorData.length - 2].compass_x;
            var vy = SensorData[SensorData.length - 2].compass_y;
            var vz = SensorData[SensorData.length - 2].compass_z;

            var compass2 = Math.sqrt(vx * vx + vy * vy + vz * vz);

            diff_compass = compass - compass2;





            var vx = SensorData[SensorData.length - 1].acc_x;
            var vy = SensorData[SensorData.length - 1].acc_y;
            var vz = SensorData[SensorData.length - 1].acc_z;

            acc = Math.sqrt(vx * vx + vy * vy + vz * vz);

            var vx = SensorData[SensorData.length - 2].acc_x;
            var vy = SensorData[SensorData.length - 2].acc_y;
            var vz = SensorData[SensorData.length - 2].acc_z;

            var acc2 = Math.sqrt(vx * vx + vy * vy + vz * vz);

            var diff_acc = acc - acc2;




            var vx = SensorData[SensorData.length - 1].gyro_x;
            var vy = SensorData[SensorData.length - 1].gyro_y;
            var vz = SensorData[SensorData.length - 1].gyro_z;


            gyro = Math.sqrt(vx * vx + vy * vy + vz * vz);
            var vx = SensorData[SensorData.length - 1].gyro_x;
            var vy = SensorData[SensorData.length - 2].gyro_y;
            var vz = SensorData[SensorData.length - 2].gyro_z;


            var gyro2 = Math.sqrt(vx * vx + vy * vy + vz * vz);

            var diff_gyro = gyro - gyro2;




            humidity = SensorData[SensorData.length - 1].humidity;
            var humidity2 = SensorData[SensorData.length - 2].humidity;
            var diff_humidity = humidity - humidity2;

            object_temp = SensorData[SensorData.length - 1].object_temp;

            var object_temp2 = SensorData[SensorData.length - 2].object_temp;
            var diff_object_temp = object_temp - object_temp2;


            light = SensorData[SensorData.length - 1].light;
            var light2 = SensorData[SensorData.length - 2].light;
            var diff_light = light - light2;

            ambient_temp = SensorData[SensorData.length - 1].ambient_temp;
            var ambient_temp2 = SensorData[SensorData.length - 2].ambient_temp;
            var diff_ambient_temp = ambient_temp - ambient_temp2;


            var title = $(".title");

            if (activeSensor === "compass") {
                if (compass > curMax) {
                    curMax = compass;
                }

                if (compass < curMin) {
                    curMin = compass;
                }

                chart.data.datasets[0].data.push(compass);
                title.html("COMPASS");


            } else if (activeSensor === "acc") {
                if (acc > curMax) {
                    curMax = compass;
                }

                if (acc < curMin) {
                    curMin = acc;
                }
                chart.data.datasets[0].data.push(acc);
                title.html("ACCELERATION")

            } else if (activeSensor === "gyro") {
                if (gyro > curMax) {
                    curMax = gyro;
                }

                if (gyro < curMin) {
                    curMin = gyro;
                }
                chart.data.datasets[0].data.push(gyro);
                title.html("GYROSCOPE");


            } else if (activeSensor === "humidity") {
                if (humidity > curMax) {
                    curMax = humidity;
                }

                if (humidity < curMin) {
                    curMin = humidity;
                }
                chart.data.datasets[0].data.push(humidity);
                title.html("HUMIDITY");


            } else if (activeSensor === "object_temp") {

                if (object_temp > curMax) {
                    curMax = object_temp;
                }

                if (object_temp < curMin) {
                    curMin = object_temp;
                }
                chart.data.datasets[0].data.push(SensorData[SensorData.length - 1].object_temp);
                title.html("OBJECT TEMPERATURE");
            } else if (activeSensor === "light") {
                if (light > curMax) {
                    curMax = light;
                }

                if (light < curMin) {
                    curMin = light;
                }
                chart.data.datasets[0].data.push(SensorData[SensorData.length - 1].light);
                title.html("LIGHT");

            } else if (activeSensor === "ambient_temp") {
                if (ambient_temp > curMax) {
                    curMax = ambient_temp;
                }

                if (ambient_temp < curMin) {
                    curMin = ambient_temp;
                }
                chart.data.datasets[0].data.push(SensorData[SensorData.length - 1].ambient_temp);
                title.html("AMBIENT TEMPERATURE");
            }


            $("#compass .sensorValue1").html(Math.round(compass));
            $("#acc .sensorValue1").html(Math.round(acc));
            $("#gyro .sensorValue1").html(Math.round(gyro));
            $("#humidity .sensorValue1").html(Math.round(humidity));
            $("#object_temp .sensorValue1").html(Math.round(object_temp));
            $("#light .sensorValue1").html(Math.round(light));
            $("#ambient_temp .sensorValue1").html(Math.round(ambient_temp));


            if (diff_compass >= 0) {
                $("#compass .sensorValue2").html("+" + Math.round(diff_compass));
            } else {
                $("#compass .sensorValue2").html(Math.round(diff_compass));
            }

            if (diff_acc >= 0) {
                $("#acc .sensorValue2").html("+" + Math.round(diff_acc));
            } else { $("#acc .sensorValue2").html(Math.round(diff_acc)); }

            if (diff_gyro >= 0) {
                $("#gyro .sensorValue2").html("+" + Math.round(diff_gyro));
            } else {
                $("#gyro .sensorValue2").html(Math.round(diff_gyro));
            }

            if (diff_humidity >= 0) {
                $("#humidity .sensorValue2").html("+" + Math.round(diff_humidity));
            } else { $("#humidity .sensorValue2").html(Math.round(diff_humidity)); }

            if (diff_object_temp >= 0) {
                $("#object_temp .sensorValue2").html("+" + Math.round(diff_object_temp));
            } else { $("#object_temp .sensorValue2").html(Math.round(diff_object_temp)); }

            if (diff_light >= 0) {
                $("#light .sensorValue2").html("+" + Math.round(diff_light));
            } else { $("#light .sensorValue2").html(Math.round(diff_light)); }

            if (diff_ambient_temp >= 0) {
                $("#ambient_temp .sensorValue2").html("+" + Math.round(diff_ambient_temp));
            } else {
                $("#ambient_temp .sensorValue2").html(Math.round(diff_ambient_temp));
            }

            $("#timestamp").html(SensorData[SensorData.length - 1].timestamp);


            $("#minValue").html(Math.round(curMin));

            $("#maxValue").html(Math.round(curMax));
            chart.update();
        };
    }


    function resetExtremes() {
        curMin = 1000;
        curMax = -1000;
        //  sensorParam = sensorInput.options[sensorInput.selectedIndex].value;
        //  chart.options.title.text = sensorParam;

    }



    var $sensordataDiv = $(".button-container");
    console.log($sensordataDiv);

    $sensordataDiv[0].style.cursor = 'pointer';

    // $(".buttons").on('click', function() {

    // 		$(this).children().toggleClass('change-to-cyan');
    // });

    $sensordataDiv.on('click', function() {
        //console.log($(this));
        // if ($(this).children().has('.change-to-cyan')) {
        // 	$(this).not().children().toggleClass('change-to-cyan');
        // }
        // 
        // 
        activeSensor = $(this).parent().attr('id');
        console.log(activeSensor);
        $(this).parent().parent().parent().find('.selected').removeClass('selected');
        $(this).toggleClass('selected');

        //console.log($(this).find('.change-to-cyan'));
        //$(this).has('.change-to-cyan').toggleClass('change-to-cyan');
    });


});