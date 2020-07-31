window.onload = function() {
    setDefaultDate();
};

function setDefaultDate(){
	var date = new Date();
	document.getElementById("readingFromField").value = formatDate(date);
	date.setDate(date.getDate() + 7);
	document.getElementById("readingToField").value = formatDate(date);
}