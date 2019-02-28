import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3cqWY66H2moOwM14z-JNOoH76vFORJ5w",
    authDomain: "neverending-story.firebaseapp.com",
    databaseURL: "https://neverending-story.firebaseio.com",
    projectId: "neverending-story",
    storageBucket: "neverending-story.appspot.com",
    messagingSenderId: "779792565384"
};
firebase.initializeApp(config);

export default firebase