import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js'
import { getFirestore, getDocs, collection, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'

const firebaseConfig = {
	apiKey: "AIzaSyB2hU6LFK6A6LeT75U4hNbvdHSCJqpWOQg",
	authDomain: "chasid-2d939.firebaseapp.com",
	projectId: "chasid-2d939",
	storageBucket: "chasid-2d939.appspot.com",
	messagingSenderId: "657384527459",
	appId: "1:657384527459:web:61d0563832719a62b18a56"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

const container = document.getElementById('container')

const families = await getDocs(collection(db, "invitees"));
families.forEach((family) => {
  addFamily(family.id, family.data());
});

function addFamily(endpoint, family){
	const div = document.createElement('div')
	div.className = 'family'
	const ul = document.createElement('ul')
	for(let member in family.Members){
		const li = document.createElement('li')
		li.innerText = member
		if(family.Members[member]==true)
			li.className = 'attending'
		ul.appendChild(li)
	}
	const nameEl = document.createElement('h2')
	const inviteLinkEl = document.createElement('a')
	inviteLinkEl.innerText = 'Link to invite'
	inviteLinkEl.href = '/'+endpoint
	nameEl.innerText = family.FamilyName
	const messageEl = document.createElement('p')
	messageEl.innerText = family.Message
	div.appendChild(nameEl)
	div.appendChild(inviteLinkEl)
	div.appendChild(ul)
	if(family.Message!=undefined)
		div.appendChild(messageEl)
	container.appendChild(div)
}