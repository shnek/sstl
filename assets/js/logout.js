
function logout(){
    firebase.auth().signOut().then(function(){
    }).catch(function(error){
        window.alert(error);
    })
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(user.email + " is logged in!");
    } else {
        window.location.href = "login.html";
    }
});
