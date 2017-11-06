function login() {
    const email = $("#email-container").val();
    const pass = $("#password-container").val();

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    })
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email + " is logged in!");
        window.location.href = "results.html";
    } else {
        window.alert("Logout successful!");
    }
});