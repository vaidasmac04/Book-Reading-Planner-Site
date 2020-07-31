function getDaysCount(x1, x2){
	var date1 = new Date(x1);
	var date2 = new Date(x2);
	const dateFromUTC = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const dateToUTC = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	return Math.floor((dateToUTC - dateFromUTC) / (1000 * 60 * 60 * 24));
}


//formats date to 'yyyy-mm-dd' pattern
function formatDate(date){
	var formattedDate = date.getFullYear() + "-";
	
	if(date.getMonth()+1 < 10){
		formattedDate += "0";
	}
	
	formattedDate += (date.getMonth()+1) + "-";
	
	if(date.getDate() < 10){
		formattedDate += "0";
	}
	
	formattedDate += date.getDate();
	return formattedDate;
}