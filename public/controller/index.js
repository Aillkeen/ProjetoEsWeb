/**
 * Created by Hélisson on 22/03/2017.
 */

function toggleSignIn() {

    if (firebase.auth().currentUser) {

        firebase.auth().signOut();

    } else {
        var email = document.getElementById('inputUser').value;
        var password = document.getElementById('inputPassword').value;

        if (email.length < 4) {
            alert('Insira um email válido');
            return;
        }
        if (password.length < 4) {
            alert('A senha deve ser maior');
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

            var errorCode = error.code;
            //var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                alert('Senha ou usuário incorreto');
            } else {
                alert("Não foi possível autenticar");
            }

            document.getElementById('quickstart-sign-in').disabled = false;

        });

    }
    document.getElementById('quickstart-sign-in').disabled = true;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            var uid = user.uid;
            const ref = firebase.database().ref().child('AdminUsers/Admin1');

            ref.once('value').then(function(snapshot) {
                var objUid = snapshot.val().uid;

                if (uid === objUid) {
                    location.href="main.html";
                }
                else {
                    alert("Usuário não autorizado");
                    location.reload();
                }
            });
        }
    });

}
