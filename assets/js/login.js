function login() {
    const email = $("#email-container").val();
    const pass = $("#password-container").val();
    console.log(email + ":"  + pass);

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "results.html";
    }
});
