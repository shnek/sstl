var gamesRef;

firebase.auth().onAuthStateChanged(function (user) {
    gamesRef = firebase.database().ref('games');
    gamesRef.on('value', function (snapshot) {
        usersRef = firebase.database().ref('users').once('value').then(function (snapshot2) {
            var userSnapshot = snapshot2.val();
            var results = [];
            for (userId in userSnapshot) {
                results.push({
                    name: userSnapshot[userId].name
                });
            }
            var games = snapshot.val();
            for (gameId in games) {
                var you = games[gameId].you;
                var op = games[gameId].oponent;
                var winner = games[gameId].winner;

                results = addToResults(results, you, winner == "you");
                results = addToResults(results, op, winner == "op");
            }
            for(r in results){
                var tr = document.createElement("tr");
                var tdName = document.createElement("td");
                tdName.innerHTML = results[r].name;
                tr.appendChild(tdName);
                var tdWins = document.createElement("td");
                tdWins.innerHTML = results[r].wins;
                tr.appendChild(tdWins);
                var tdLosses = document.createElement("td");
                tdLosses.innerHTML = results[r].losses;
                tr.appendChild(tdLosses);
                var tdMatches = document.createElement("td");
                tdMatches.innerHTML = results[r].played;
                tr.appendChild(tdMatches);
                var tdRound = document.createElement("td");
                tdRound.innerHTML = results[r].robin;
                tr.appendChild(tdRound);
                var tdTotal = document.createElement("td");
                tdTotal.innerHTML = results[r].total;
                tr.appendChild(tdTotal);
                var tdWinning = document.createElement("td");
                tdWinning.innerHTML = results[r].percentage;
                tr.appendChild(tdWinning);
                $("#table-body").append(tr);
            }
        })
    })

});



function addToResults(results, player, won) {
    for (i = 0; i < results.length; i++) {
        if (results[i].name == player) {
            if (results[i].wins == undefined) {
                results[i].wins = 0;
                results[i].losses = 0;
                results[i].played = 0;
                results[i].robin = 0;
                results[i].total = 0;
            }
            won ? results[i].wins++ : results[i].losses++;
            results[i].played++;
            results[i].total = results[i].robin + results[i].played;
            results[i].percentage = Math.round(100 * results[i].wins / results[i].played);

        }
    }
    return results;
}