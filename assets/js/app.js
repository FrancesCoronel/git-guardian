// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFfNgFkt5zX6DLwix-kccBBWfW2Pt3FZw",
    authDomain: "nyt-twitter-2ff1f.firebaseapp.com",
    databaseURL: "https://nyt-twitter-2ff1f.firebaseio.com",
    storageBucket: "nyt-twitter-2ff1f.appspot.com",
    messagingSenderId: "878355248382"
};

firebase.initializeApp(config);

var headline = "";
var headline_url = "";

var getHeadline = function(date) {
    var commit_date = moment(date, "YYYY-MM-DD HH:mm");
    var prettyDate = moment(date).format("YYYY-MM-DD");
    var url = "https://content.guardianapis.com/search?api-key=9e7bb694-fc4e-4eb5-a69e-e73d692733c5&from-date=" + prettyDate + "&to-date=" + prettyDate;
    $.ajax({
        url: url,
        method: 'GET',
        async: false
    }).done(function(articles) {
        //var matches = [];
        $.each(articles.response.results, function(key, article) {
            var results = articles.response.results;
            var randomArticle = results[Math.floor(Math.random() * results.length)];
            //var article_date = moment(article.webPublicationDate, "YYYY-MM-DD HH:mm");
            headline = randomArticle.webTitle;
            headline_url = randomArticle.webUrl;

            // console.log(toReturn);
            /// return toReturn;
            // if (commit_date.diff(article_date, 'minutes') < 30) {
            //     matches.push(article.webTitle);
            // } else {
            //     matches.push(articles.response.results[0].webTitle);
            // }
        });
        //return matches[Math.floor(Math.random()*matches.length)];
    }).fail(function(err) {
        throw err;
    });
};

console.log(getHeadline());

var getUser = function(accessToken) {
    $.ajax({
        method: "GET",
        url: "https://api.github.com/user?access_token=" + accessToken,
        dataType: 'json',
    }).done(function(data) {
        console.log(data);
    }).fail(function(error) {
        console.log(error);
    });
};

var getUserCommits = function() {
    var commit_date = "";
    var show_date = "";
    var commit_headline = "";
    $.ajax({
        method: "GET",
        url: "https://api.github.com/users/cornelltech/events",
        dataType: 'json',
        async: false,
        success: function(events) {
            $.each(events, function(key, event) {
                if (event.type === "PushEvent") {
                    commit_date = event.created_at;
                    repo = event.repo.name;
                    show_date = moment(commit_date).format('MMMM Do YYYY, h:mm a');
                    $.each(event.payload.commits, function(key2, pushEvent) {
                        getHeadline(commit_date);
                        $("#commits").append("<div class='col s12 m6'><div class='card medium'><div class='card-content'><span class='card-title'><a target='_blank' href='" + headline_url + "'>" + headline + "</a></span><h5>" + repo + "</h5><br><p>" + show_date + "</p><br><p>" + pushEvent.message + "</p></div><div class='card-action'><a href='" + pushEvent.url + "'>View on GitHub</a></div></div></div>");
                    });
                }
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
        provider.addScope('user');
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
            //  document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
            // document.getElementById('quickstart-oauthtoken').textContent = 'null';
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
            //document.getElementById('user-info').css("display", "block");
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var currentUser = JSON.stringify(user, null, '  ');
            // user.getToken().then(function(idToken) {
            //     getUser(idToken);
            // });
            // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            // document.getElementById('quickstart-account-details').textContent = currentUser;
            // document.getElementById('user-photo').attr('src', photoURL);
            // document.getElementById('user-name').textContent = displayName;
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with GitHub';
            //document.getElementById('quickstart-account-details').textContent = 'null';
            //document.getElementById('quickstart-oauthtoken').textContent = 'null';
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
    getUserCommits();
};
