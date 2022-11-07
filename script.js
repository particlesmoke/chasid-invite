(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Legacy Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Legacy Edge';
            version = nAgt.substring(verOffset + 5);
        } 
        // Edge (Chromium)
        else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Chrome OS', r:/CrOS/},
            {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
            case 'Android':
                osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
        
        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

if(jscd.os == 'iOS'){
	document.querySelectorAll('.cursive').forEach((el)=>el.style.fontFamily = 'very-cursive-iphone')
}

var petalDropCount = 1
var foolDropCount = 1
var leafDropCount = 1

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
	recordHistory: false,
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
	// const box = document.getElementById(`haldi-invite`).getElementsByClassName('box')[0]
	const box = document.getElementById('haldi-invite').getElementsByClassName('droppings')[0]
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
	img.style.animationName = `fall${foolDropCount%2 +1}`
	setTimeout(()=>box.appendChild(img), Math.random()*2000)
}

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
	if(jscd.os == 'iOS'){
		img.style.animationName = `falling-basic${petalDropCount%5 +1}`
	}
	else{
		img.style.animationName = `falling${petalDropCount%5 +1}`
	}
	petalDropCount++
	setTimeout(()=>box.appendChild(img), Math.random()*2000)
}

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
	if(jscd.os == 'iOS'){
		img.style.animationName = `falling-basic${leafDropCount%5 +1}`
	}
	else{
		img.style.animationName = `falling${leafDropCount%5 +1}`
	}
	leafDropCount++
	setTimeout(()=>box.appendChild(img), Math.random()*2000)
}