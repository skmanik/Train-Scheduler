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

});

// allows initial presentation of database
database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    var tr = $("<tr>");
    $("#trains tbody").append(tr);

    // display
    tr.append("<td>" + sv.train + "</td>", "<td>" + sv.destination + "</td>", "<td>" +  sv.frequency + "</td>", "<td></td>" + "<td></td>");

    console.log(sv.train, sv.destination, sv.first, sv.frequency);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });