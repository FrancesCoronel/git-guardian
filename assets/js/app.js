// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFfNgFkt5zX6DLwix-kccBBWfW2Pt3FZw",
    authDomain: "nyt-twitter-2ff1f.firebaseapp.com",
    databaseURL: "https://nyt-twitter-2ff1f.firebaseio.com",
    storageBucket: "nyt-twitter-2ff1f.appspot.com",
    messagingSenderId: "878355248382"
};

firebase.initializeApp(config);

var getUser = function(accessToken) {
    $.ajax({
        method: "GET",
        url: "https://api.github.com/users&access_token=" + accessToken,
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
};

var getUserCommits = function() {

    $.ajax({
        method: "GET",
        url: "https://api.github.com/users/events&access_token=" + accessToken,
        dataType: 'json',
        success: function(json) {
            // Iterate over each item returned from the call
            json.forEach(function(data) {
                // Save each piece of data individually
                var loginName = data.actor.login;
                var eventType = data.type;
                var repoName = data.repo.name;
                console.log(eventType + repoName);
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
};

function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GithubAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('repo');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
}
// [END buttoncallback]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
 *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
 */
function initApp() {
    // Result from Redirect auth flow.
    // [START getidptoken]
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // [START_EXCLUDE]
            document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
            // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
    });
    // [END getidptoken]
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var accessToken = user.stsTokenManager.accessToken;
            getUser(accessToken);
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with GitHub';
            document.getElementById('quickstart-account-details').textContent = 'null';
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function() {
    initApp();
    //getUserCommits();
};
