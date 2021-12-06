import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onChildAdded, query, limitToLast } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js"

//import { getDatabase } from "../../node_modules/firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgHQhbQPFDCUiHI5DQMvOJkLMxdDgfgBM",
    authDomain: "h2go-575f0.firebaseapp.com",
    databaseURL: "https://h2go-575f0-default-rtdb.firebaseio.com",
    projectId: "h2go-575f0",
    storageBucket: "h2go-575f0.appspot.com",
    messagingSenderId: "466823744518",
    appId: "1:466823744518:web:a36030c3c07f5853738787"
  };

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

console.log("javascript is rad")

const weightRef = ref(database, 'readings/weights')
var weight = 0

var data = 10
var i = 0
const recentWeights = query(ref(database, 'readings/weights'), limitToLast(20))
onChildAdded(recentWeights, (snapshot) => {
    console.log(snapshot.val())
})

console.log(recentWeights.ref)

document.getElementById("weight").innerHTML = weight