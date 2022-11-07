import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js'
import { getFirestore, getDocs, collection, doc, getDoc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'
var presenceMessageVisible = 0
var savedMessageVisible = 0

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

if(docSnap.Message != null && docSnap.Message!=''){
	document.getElementById("message-textarea").innerHTML= docSnap.Message
	addSavedMessage("Thanks for your message! It has been saved")
}

const form = document.getElementById('presence-marker-form')

const checkboxes = []
const checkedState = {}

for(let member in members){
	addMember(member, members[member])
}


function addMember(name, checked){
	checkedState[name] = checked
	// console.log("ok", name, checked)
	if(checked==true){
		addPresenceMessage()
	}
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

		let anyComing = false
		let allComing = true
		for(let name in checkedState){
			if(checkedState[name]==true){
				anyComing = true
			}
			if(checkedState[name]==false){
				allComing = false
			}
		}
		if(anyComing){
			addPresenceMessage()
		}
		else{
			if(presenceMessageVisible)
			removePresenceMessage()
		}
		if(allComing){
			confettiInPresence()
		}
		else{
			stopConfettiInPresence()
		}
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
	if(message!=null && message!='')
	{
		if(!savedMessageVisible)
			addSavedMessage("Thanks for your message! Changes have been saved")
		else
			addSavedMessage("Thanks for your message! It has been saved")
	}
	else{
		addSavedMessage("Please type a message before saving")
	}
	updateDoc(docRef, {Message:message})
})


function addPresenceMessage(){
	console.log("hmm", presenceMessageVisible)

	if(presenceMessageVisible!=0) return
	const content = document.getElementById('rsvp-page').getElementsByClassName('content')[0]
	const p = document.createElement('p')
	p.innerHTML = "Thanks! We have recorded your presence"
	p.id = 'presence-message'
	content.appendChild(p)
	presenceMessageVisible++
}

function removePresenceMessage(){
	presenceMessageVisible = 0
	document.getElementById('presence-message').remove()
}

function addSavedMessage(text){
	if(savedMessageVisible!=0){
		document.getElementById('saved-message').remove()
	}
	const content = document.getElementById('message-page').getElementsByClassName('content')[0]
	const p = document.createElement('p')
	p.innerHTML = text
	p.id = 'saved-message'
	content.appendChild(p)
	savedMessageVisible++
}

// const querySnapshot = await getDocs(collection(db, "invitees"));
// querySnapshot.forEach((doc) => {
// 	console.log(`${doc.id} => ${doc.data()}`);
// 	console.log(doc.data())
// })

function confettiInPresence(){
	tsParticles.load("presence-content", {
	"fullScreen": {
	  "zIndex": 1
	},
	"emitters": [
	  {
		"position": {
		  "x": 0,
		  "y": 30
		},
		"rate": {
		  "quantity": 3,
		  "delay": 0.1
		},
		"particles": {
		  "move": {
			"direction": "top-right",
			"outModes": {
			  "top": "none",
			  "left": "none",
			  "default": "destroy"
			}
		  }
		}
	  },
	  {
		"position": {
		  "x": 100,
		  "y": 30
		},
		"rate": {
		  "quantity": 3,
		  "delay": 0.1
		},
		"particles": {
		  "move": {
			"direction": "top-left",
			"outModes": {
			  "top": "none",
			  "right": "none",
			  "default": "destroy"
			}
		  }
		}
	  }
	],
	"particles": {
	  "color": {
		"value": [
		  "#b8ffcc",
		  "#8ff3ff",
		  "#ffe187",
		  "#ffe187"
		]
	  },
	  "move": {
		"decay": 0.05,
		"direction": "top",
		"enable": true,
		"gravity": {
		  "enable": true
		},
		"outModes": {
		  "top": "none",
		  "default": "destroy"
		},
		"speed": {
		  "min": 10,
		  "max": 50
		}
	  },
	  "number": {
		"value": 0
	  },
	  "opacity": {
		"value": 1
	  },
	  "rotate": {
		"value": {
		  "min": 0,
		  "max": 360
		},
		"direction": "random",
		"animation": {
		  "enable": true,
		  "speed": 30
		}
	  },
	  "tilt": {
		"direction": "random",
		"enable": true,
		"value": {
		  "min": 0,
		  "max": 360
		},
		"animation": {
		  "enable": true,
		  "speed": 30
		}
	  },
	  "size": {
		"value": {
		  "min": 0,
		  "max": 2
		},
		"animation": {
		  "enable": true,
		  "startValue": "min",
		  "count": 1,
		  "speed": 16,
		  "sync": true
		}
	  },
	  "roll": {
		"darken": {
		  "enable": true,
		  "value": 25
		},
		"enable": true,
		"speed": {
		  "min": 5,
		  "max": 15
		}
	  },
	  "wobble": {
		"distance": 30,
		"enable": true,
		"speed": {
		  "min": -7,
		  "max": 7
		}
	  },
	  "shape": {
		"type": "circle",
		"options": {}
	  }
	}
  	});
}

function stopConfettiInPresence(){
	const particles = tsParticles.domItem(1)
	particles.destroy()
}