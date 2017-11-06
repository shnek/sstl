function register() {
    const email = $("#email-container").val();
    const pass1 = $("#password-container").val();
    const pass2 = $("#password-check-container").val();

    if (pass1 != pass2) {
        window.alert("Password does not match!");
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, pass1).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        })
    }
}