import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onChildAdded, query, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

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
const database = getDatabase(app);
const readings_ref = ref(database, 'readings')

let wi_node = document.getElementById("water_intake");

// Recent readings
const NUM_READS = 5;
const query_ref = query(readings_ref, limitToLast(NUM_READS));
onChildAdded(query_ref, (data) => {
  let dataobj = JSON.parse(data.val());
  let listnode = document.createElement("li");
  let textnode = document.createTextNode(`${dataobj.datetime} ${dataobj.water}`);
  listnode.appendChild(textnode);
  wi_node.appendChild(listnode);
});