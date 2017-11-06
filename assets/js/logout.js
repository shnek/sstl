
function logout(){
    firebase.auth().signOut().then(function(){
        window.location.href = "login.html";
    }).catch(function(error){
        window.alert(error);
    })
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email + " is logged in!");
    } else {
        window.location.href="login.html";
    }
});

$(document).on('ready', function(){
    var user = firebase.auth().currentUser;
    if(user){
        console.log("All good!");
    }else{
        logout();
    }
})