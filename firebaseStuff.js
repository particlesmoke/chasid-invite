import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js'
import { getFirestore, getDocs, collection, doc, getDoc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'

const firebaseConfig = {
	apiKey: "AIzaSyB2hU6LFK6A6LeT75U4hNbvdHSCJqpWOQg",
	authDomain: "chasid-2d939.firebaseapp.com",
	projectId: "chasid-2d939",
	storageBucket: "chasid-2d939.appspot.com",
	messagingSenderId: "657384527459",
	appId: "1:657384527459:web:61d0563832719a62b18a56"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);


const docRef = doc(db, "invitees", endpoint);
const docSnap = (await getDoc(docRef)).data();
const members = docSnap.Members

document.getElementById("message-textarea").innerHTML= docSnap.Message

const form = document.getElementById('presence-marker-form')

const checkboxes = []
const checkedState = {}

for(let member in members){
	addMember(member, members[member])
}


function addMember(name, checked){
	checkedState[name] = checked
	const div = document.createElement('div')
	div.className = 'member-checkbox-div'
	const inputEl = document.createElement('input')
	inputEl.type = 'checkbox'
	inputEl.value = name
	inputEl.checked = checked
	inputEl.addEventListener('click', ()=>{
		for(let x in checkboxes){
			checkedState[checkboxes[x].value] = checkboxes[x].checked
		}
		updateDoc(docRef, {Members:checkedState})
		console.log(checkedState)
	})
	div.appendChild(inputEl)
	checkboxes.push(inputEl)
	const labelEl = document.createElement('label')
	labelEl.innerText = name
	div.append(labelEl)
	form.appendChild(div)
}

document.getElementById("message-save-button").addEventListener('click',()=>{
	let message = document.getElementById("message-textarea").value
	updateDoc(docRef, {Message:message})
	console.log(message)
})


// const querySnapshot = await getDocs(collection(db, "invitees"));
// querySnapshot.forEach((doc) => {
// 	console.log(`${doc.id} => ${doc.data()}`);
// 	console.log(doc.data())
// })