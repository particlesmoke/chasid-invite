const scene = document.getElementById('scene');
const theme = document.getElementById('theme-color')
const themeColors = {
	haldi:'#e2510a',
	wedding:'#980225',
	mehendi:'#50a80d',
	home:'#ffe373'
}
const dropIntervals = []

var parallaxInstance = new Parallax(scene,{
	limitX:50,
	limitY:50,
	// calibrateX :true,
	selector:'.parallax'
});
new fullpage('#fullpage', {
	// nothing:console.log("here"),
	licenseKey:'ok',
	navigation: true,
	navigationPosition: 'right',
	// autoScrolling:true,
	// scrollHorizontally: true
	onLeave: function(origin, destination, direction, trigger){
		// if(origin=='home')
		// scene.style.top='50px'
		dropIntervals.forEach(interval=>clearInterval(interval))
		if(destination.anchor=='mehendi' || destination.anchor=='haldi' || destination.anchor=='wedding') 
		{
			let textElements = document.getElementById(`${destination.anchor}-invite`).getElementsByClassName('content')[0].children
			for(let x in textElements){
				textElements[x].className+=' focus-in-contract-bck'
			}
			if(destination.anchor=='haldi'){
				dropIntervals.push(
					setInterval(()=>{
						dropOneFoolInHaldi()
					},1500)
				)
			}
			else if(destination.anchor=='wedding'){
				dropIntervals.push(
					setInterval(()=>{
						dropOnePetalInWedding()
					},250)
				)
			}
			else if(destination.anchor=='mehendi'){
				dropIntervals.push(
					setInterval(()=>{
						dropOneLeafInMehendi()
					},250)
				)
			}

		}
		theme.content = themeColors[destination.anchor]
        // console.log(origin)
        // console.log(destination)
    }
})

window.addEventListener('load',()=>{
	// fadeOut(
	// 	document.getElementById('loading-screen'),500
	// )
	fadeOut(document.getElementsByClassName('dank-ass-loader')[0],500)
	setTimeout(()=>{
		fadeIn(document.getElementById('CS-logo-loading'),600)
		fadeIn(document.getElementById('open-invite-button'), 1200)
		fadeIn(document.getElementById('loading-screen-bg'), 2400)
		fadeIn(document.getElementById('loading-screen').getElementsByTagName('span')[0], 900)
	},500)
})

document.getElementById('open-invite-button').addEventListener('click', ()=>{
	fadeOut(
		document.getElementById('loading-screen'),500
	)
	document.getElementsByTagName('audio')[0].play()
	document.getElementsByTagName('audio')[0].volume = 0.5
})

function fadeOut( elem, ms )
{
    var opacity = 1;
    var timer = setInterval( function() {
		opacity -= 30 / ms;
		if( opacity <= 0 ){
			clearInterval(timer);
			opacity = 0;
			elem.style.display = "none";
			elem.style.visibility = "hidden";
		}
		elem.style.opacity = opacity;
		elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 30 ); 
}
function fadeIn( elem, ms )
{
    var opacity = 0;
    var timer = setInterval( function() {
		opacity += 30 / ms;
		if( opacity >= 100 ){
			clearInterval(timer);
			opacity = 0;
			elem.style.display = "none";
			elem.style.visibility = "hidden";
		}
		elem.style.opacity = opacity;
		elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 30 ); 
}



function dropOneFoolInHaldi(){
	const box = document.getElementById(`haldi-invite`).getElementsByClassName('box')[0]
	const img = document.createElement('img')
	img.src = '../../Assets/genda-fool.png'
	img.className = 'genda-fool'
	let left = Math.random()*85
	if (left>0.3&&left<0.55){
		if(left>0.42)
			left+= (Math.random())*85
		else
			left-= (Math.random())*85
	}
	img.style.left = `${left}vw`
	setTimeout(()=>box.appendChild(img), Math.random()*2000)
}

var petalDropCount = 1
function dropOnePetalInWedding(){
	const box = document.getElementById(`wedding-invite`).getElementsByClassName('droppings')[0]
	const img = document.createElement('img')
	img.src = `../../Assets/p${petalDropCount%4 +1}.png`
	img.className = 'petal'
	let left = Math.random()*155
	// if (left>0.3&&left<0.55){
	// 	if(left>0.42)
	// 		left+= (Math.random())*85
	// 	else
	// 		left-= (Math.random())*85
	// }
	img.style.left = `${left}vw`
	// img.style.animationName = `falling${petalDropCount%2 +1}`
	img.style.webkitAnimationName = `falling${petalDropCount%2 +1}`
	petalDropCount++
	setTimeout(()=>box.appendChild(img), Math.random()*2000)
}

var leafDropCount = 1
function dropOneLeafInMehendi(){
	const box = document.getElementById(`mehendi-invite`).getElementsByClassName('droppings')[0]
	const img = document.createElement('img')
	img.src = `../../Assets/l${leafDropCount%4 +1}.png`
	img.className = 'petal'
	let left = Math.random()*155
	// if (left>0.3&&left<0.55){
	// 	if(left>0.42)
	// 		left+= (Math.random())*85
	// 	else
	// 		left-= (Math.random())*85
	// }
	img.style.left = `${left}vw`
	img.style.animationName = `falling${leafDropCount%5 +1}`
	leafDropCount++
	setTimeout(()=>box.appendChild(img), Math.random()*2000)
}