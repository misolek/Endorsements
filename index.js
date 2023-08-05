import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-14c8e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsDB = ref(database, "endorsements")

const inputEl = document.getElementById("input-el");
const publishBtn = document.getElementById("publish-btn");
const endorsements = document.getElementById("endorsements");

publishBtn.addEventListener("click", function(){
    let inputFieldValue = inputEl.value;
    
    push(endorsementsDB, inputFieldValue);
    
    clearInputEl()
})

function clearInputEl() {
    inputEl.value = ""
}

function clearEndorsements() {
    endorsements.innerHTML = ""
}

onValue(endorsementsDB, function(snapshot) {
    let endorsementsArray = Object.values(snapshot.val())
    
    clearEndorsements()
    
    for (let i = 0; i < endorsementsArray.length; i++) {
        addEndorsements(endorsementsArray[i])
    }
})

function addEndorsements(items){
    endorsements.innerHTML += `<li>${items}</li>`
}