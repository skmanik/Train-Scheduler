// ==========================
// ==== global variables ====
// ==========================

// initialize firebase
var config = {
    apiKey: "AIzaSyAbhpPIU-AO0BlrsArvD0GoL0vC7V6FFJg",
    authDomain: "in-class-project-3bdbc.firebaseapp.com",
    databaseURL: "https://in-class-project-3bdbc.firebaseio.com",
    projectId: "in-class-project-3bdbc",
    storageBucket: "in-class-project-3bdbc.appspot.com",
    messagingSenderId: "503253339208"
};

firebase.initializeApp(config);

var database = firebase.database();

// ===========================
// ========= actions =========
// ===========================

// allows header button to scroll to submit form
$(".btn-add").on("click", function() {

    // display
    console.log("I've been clicked!");
    document.getElementById("form-section").scrollIntoView({behavior: "smooth"});

});

// allows submit button to store inputs 
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();
    console.log("I've been clicked!");

    var train = $("#train-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm A");
    var frequency = $("#freq-input").val().trim();

    console.log("Before push!", train, destination, firstTrain, frequency);

    if (train === "" || destination === "" || firstTrain === "" || frequency === "") {

        $("#train-input").val("");
        $("#dest-input").val("");
        $("#first-input").val("");
        $("#freq-input").val("");

        return;

    } else {

    // stores new train data
    var newTrain = {
        train: train,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    };

    // pushes into database
    database.ref().push(newTrain);
    console.log("After push!", newTrain.train, newTrain.destination, newTrain.first, newTrain.frequency);

    // display
    $("#train-input").val("");
    $("#dest-input").val("");
    $("#first-input").val("");
    $("#freq-input").val("");

    document.getElementById("trains").scrollIntoView({behavior: "smooth"});

    }

});

// allows initial presentation of database
database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    // ==========================
    // ====== calculations ======
    // ==========================

    // get difference between first train time and current time
    var firstTrainConverted = moment(sv.first, "HH:mm").subtract(1, "years");
    console.log("First Time: " + firstTrainConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm A"));

    var diffTime = currentTime.diff(moment(firstTrainConverted), "minutes");
    console.log("Difference: " + diffTime);

    // get minutes away using difference and frequency
    var tRemainder = diffTime % sv.frequency;
    console.log("Remainder: " + tRemainder);

    var tMinutesAway = sv.frequency - tRemainder;
    console.log("Minutes Away: " + tMinutesAway);

    // get next arrival
    var nextTrain = moment().add(tMinutesAway, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm A");
    console.log("Arrival Time: " + nextTrainConverted);

    // display
    var tr = $("<tr>");
    tr.append("<td>" + sv.train + "</td>", "<td>" + sv.destination + "</td>", "<td>" +  sv.frequency + "</td>", "<td>" + nextTrainConverted + "</td>", "<td>" + tMinutesAway + "</td>");
    $("#trains tbody").append(tr);

    console.log(sv.train, sv.destination, sv.first, sv.frequency);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });