$("#weekly-schedule").dayScheduleSelector({
    days: [0,1,2,3,4,5,6],
    startTime: '8:00',
    endTime: '21:00',
    interval: 30,
    stringDays  : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
});
const db = firebase.database();
var availableCourts = [];
var preferableCourts = [];

db.ref('/courts').once('value').then(function (snapshot) {
    var list = document.getElementById('court-list');
    var array = snapshot.val();
    for (i = 0; i < array.length; i++) {
        var listItem = document.createElement("li");
        listItem.innerHTML = array[i].name;
        listItem.classList.add("list-group-item");
        listItem.addEventListener("click", function (e) {
            var cl = this.classList;
            if(cl.contains("list-group-item-success")){
                var index = preferableCourts.indexOf(this.innerText);
                preferableCourts.splice(index, index+1);
                availableCourts.push(this.innerText);
                cl.remove("list-group-item-success");
                cl.add("list-group-item-info");
            }else if(cl.contains("list-group-item-info")){
                var index = availableCourts.indexOf(this.innerText);
                availableCourts.splice(index, index+1);
                cl.remove("list-group-item-info");
                cl.add("list-group-item-danger");
            }else if(cl.contains("list-group-item-danger")){
                cl.remove("list-group-item-danger");
                cl.add("list-group-item-success");
                preferableCourts.push(this.innerText);
            }else{
                cl.add("list-group-item-success");
                preferableCourts.push(this.innerText);

            }
        })
        list.appendChild(listItem);
    }
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.ref('users/' + user.uid).once('value').then(function(snapshot){
            var data = snapshot.val();
            var kids = $("#court-list").children();
            for(i = 0; i < kids.length; i++){
                if(data.preferable){
                    for(j = 0; j < data.preferable.length; j++){
                        if(data.preferable[j] == kids[i].innerText){
                            preferableCourts.push(data.preferable[j]);
                            kids[i].classList.add("list-group-item-success");
                        }

                    }
                }
                if(data.available){
                    for(j = 0; j < data.available.length; j++){
                        if(data.available[j] == kids[i].innerText){
                            availableCourts.push(data.available[j]);
                            kids[i].classList.add("list-group-item-info");
                        }
                    }
                }
            }

            $("#weekly-schedule").data('artsy.dayScheduleSelector').deserialize(data.schedule);
            console
            $("#user-name").val(data.name);
        })
    } else {
        window.location.href = "login.html";
    }
});




function submitSetup(){
    user = firebase.auth().currentUser;
    if(!user) return;
    var name = $("#user-name").val();
    var data = $("#weekly-schedule").data('artsy.dayScheduleSelector').serialize();;

    db.ref('users/' + user.uid).set({
        name: name,
        schedule: data,
        preferable: preferableCourts,
        available: availableCourts

    });

}