$(document).ready(function canvas() {
	alert('canvas ready!');
	
	var ema = document.getElementById("ema");
	var matrix = ema.getContext("2d");

	var width = document.getElementById('ema').offsetWidth;
	var height = document.getElementById('ema').offsetHeight;

	drawAxes(matrix, width, height);
});

function drawAxes(field, width, height) {
	// untere Ecke y-Wert
	var uEy = height-25;
	// rechte Ecke x-Wert
	var rEx = width-20;
	// Mitte y-Achse
	var my = (height-20-25)/2 + 20;
	// Mitte x-Achse
	var mx = (width-25-20)/2 + 25;

	// Spitze senkrechter Pfeil
	field.moveTo(25,20);
	// zur untere Ecke
	field.lineTo(25,uEy);
	field.stroke();
	// zur rechten Spitze
	field.lineTo(rEx,uEy);
	field.stroke();

	// Pfeil oben linke Seite
	field.moveTo(15,30);
	field.lineTo(25,20);
	field.stroke();
	// Pfeil oben rechte Seite
	field.lineTo(35,30);
	field.stroke();

	// Pfeil rechts oberer Teil
	field.moveTo(rEx-10,uEy-10);
	// zur rechten Spitze
	field.lineTo(rEx,uEy);
	field.stroke();
	// zum Pfeil rechts unterer Teil
	field.lineTo(rEx-10,uEy+10);
	field.stroke();

	// Mittellinie y-Achse
	field.moveTo(25,my);
	field.lineTo(rEx,my);
	field.stroke;

	// Mittellinie x-Achse
	field.moveTo(mx,20);
	field.lineTo(mx,uEy);
	field.stroke();

	// Beschriftung x-Achse
	field.font = "20px Arial";
	// field.textAlign = "center";
	field.fillText("U R G E N T", width/2-50, height);

	field.save();
	field.translate(width/2,height/2);
	// Beschriftung y-Achse
	field.font = "20px Arial";
	field.rotate(-Math.PI/2);
	field.translate(height/2,-width/2);
	field.fillText("I M P O R T A N T", -height/2-50, 15);

	field.restore();
}