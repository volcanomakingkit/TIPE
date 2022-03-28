var dist = 10;
var lat = 48.85;
var lon = 2.35;

calcul();

function calcul(){
	dist = document.getElementById("dist").value;
	lat = document.getElementById("lat").value;
	lon = document.getElementById("lon").value;
	console.log("calcul");
	var requestURL = 'https://api.cquest.org/dvf?lat='+lat+'&lon='+lon+'&dist='+dist;
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	var obj = ''; // tests pour appel console chrome
	var n_test;	  // aussi
	var len_test;
	
	request.onload = function() {
		document.getElementById("test").style.height = window.innerHeight;
		var data = request.response;
		var len = data.features.length;
		var dataText = ''
		var n = 0;
		for (var i = 0; i < len; i++){
			n += data.features[i].properties.valeur_fonciere;
			// dataText += data.features[i].properties.valeur_fonciere + ' € <br>';
		}
		dataText += 'Moyenne : ' + n/len + ' €';
		dataText += '<br/>Nombres de valeurs : ' + len;
		document.getElementById("test").innerHTML = dataText;
		obj = data;
		n_test = n;
		len_test = len;
		if (isNaN(n/len) && dist < 100){
			document.getElementById("dist").value ++;
			calcul();
		}
	}
}
