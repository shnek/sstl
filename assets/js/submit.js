var gamesRef;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        gamesRef = firebase.database().ref('games')
        gamesRef.on("value", function (snapshot) {
            var games = snapshot.val();
            $("#your-games").html('');
            for (gameId in games) {
                var listItem = document.createElement("li");
                var g = games[gameId];
                listItem.innerText = g.you + " " + g.yourGames + ":" + g.opGames + " " + g.oponent;
                var button = document.createElement("button");
                listItem.setAttribute("id", gameId);
                button.addEventListener("click", function(event){
                    var id = this.parentElement.getAttribute("id");
                    firebase.database().ref('games/' + id).remove();
                })
                $("#your-games").append(listItem);
                listItem.appendChild(button);
            }
        })
        firebase.database().ref('users').once('value').then(function (snapshot) {
            var users = snapshot.val();
            for (userId in users) {
                var userDrop = document.createElement("option");
                userDrop.innerText = users[userId].name;
                if (user.displayName != users[userId].name) {
                    $("#user-list").append(userDrop);
                }
            }
        })
    }
})

$("#user-list").change(function (event) {
    var name = $("#user-list option:selected").text();
    var user = firebase.auth().currentUser;
    if (user && name != "-" && name != user.displayName) {
        $("#oponent-name").text(name);
    }
});

$("#submit-score").on("click", function (event) {
    var oponent = $("#user-list option:selected").text();
    var date = $("#game-date").val();
    var game = {
        first: {
            you: $("#first-you").val(),
            op: $("#first-op").val()
        },
        second: {
            you: $("#second-you").val(),
            op: $("#second-op").val()
        },
        third: {
            you: $("#third-you").val(),
            op: $("#third-op").val()
        }
    };
    // console.log("Oponent: " + oponent);
    // console.log(date);
    // console.log(game.first.you);
    if (oponent == "-") {
        window.alert("You need to select an oponent");
        return;
    }
    if (date == null || date == "") {
        window.alert("You need to provide a date for the game");
        return;
    }

    var you = 0;
    var op = 0;
    if (game.first && game.first.you > game.first.op) you++;
    if (game.first && game.first.you < game.first.op) op++;
    if (game.second && game.second.you > game.second.op) you++;
    if (game.second && game.second.you < game.second.op) op++;
    if (game.third && game.third.you > game.third.op) you++;
    if (game.third && game.third.you < game.third.op) op++;
    var match = {};
    match.game = game;
    match.date = date;
    match.oponent = oponent;
    match.yourGames = you;
    match.opGames = op;
    match.you = firebase.auth().currentUser.displayName;
    match.winner = you > op ? "you" : "op";
    // console.log(match);
    if (gamesRef) {
        gamesRef.push(match);
    }
});