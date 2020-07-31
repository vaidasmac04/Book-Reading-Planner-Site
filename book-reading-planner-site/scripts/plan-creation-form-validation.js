//after each 'go' button click errors, if any, are hidden and new validation process starts
function hideAllErrors(){
	var elements = document.getElementsByClassName("validation-field");
	
	for(var i = 0; i < elements.length; i++){
		if(elements[i].style.display != "none"){
			elements[i].style.display = "none";
		}
	}
}

function isBookTitleValid(){
	var bookTitleField = document.getElementById("bookTitleField");
	
	if(isEmpty(bookTitleField.value)){
		showError("bookTitleValidationField", "Book title field cannot be empty<br>");
		return false;
	}
	
	return true;
}

function isPagesValid(){
	var pagesField = document.getElementById("pagesField");
	
	if(isEmpty(pagesField.value)){
		showError("pagesValidationField", "Pages field cannot be empty or not an integer.<br>");
		return false;
	}
	else if(!isNumber(pagesField.value)){
		showError("pagesValidationField", "Pages must be a number<br>");
		return false;
	}
	else if(pagesField.value <= 0){
		showError("pagesValidationField", "Pages must be a positive number<br>");
		return false;
	}
	else if(pagesField.value > Number.MAX_SAFE_INTEGER){
		showError("pagesValidationField", "Pages cannot be bigger than " + Number.MAX_SAFE_INTEGER + "<br>");
		return false;
	}
	
	return true;
}

function isStartDateValid(){
	var startDateField = document.getElementById("readingFromField");
	
	if(isEmpty(startDateField.value)){
		showError("readingFromValidationField", "Start date field cannot be empty<br>");
		return false;
	}
	
	return true;
}

function isEndDateValid(){
	var endDateField = document.getElementById("readingToField");
	
	if(isEmpty(endDateField.value)){
		showError("readingToValidationField", "End date field cannot be empty<br>");
		return false;
	}
	
	return true;
}

function isFreeDaysValid(){
	var freeDaysField = document.getElementById("freeDaysField");
	
	if(isEmpty(freeDaysField.value)){
		showError("freeDaysValidationField", "Free days field cannot be empty or not an integer<br>");
		return false;
	}
	else if(!isNumber(freeDaysField.value)){
		showError("freeDaysValidationField", "Free days must be a number<br>");
		return false;
	}
	else if(freeDaysField.value < 0){
		showError("freeDaysValidationField", "Free days cannot be a negative number<br>");
		return false;
	}
	
	return true;
}

//form validation
function validatePlanCreationForm(){

	var isValid = true, pagesFieldValid = true, startDateFieldValid = true, endDateFieldValid = true, freeDaysFieldValid = true;

	if(!isBookTitleValid()){
		isValid = false;
	}
	
	if(!isPagesValid()){
		isValid = false;
		pagesFieldValid = false;
	}
	
	if(!isStartDateValid()){
		isValid = false;
		startDateFieldValid = false;
	}
	
	if(!isEndDateValid()){
		isValid = false;
		endDateFieldValid = false;
	}
	
	if(!isFreeDaysValid()){
		isValid = false;
		freeDaysFieldValid = false;
	}
	
	//additional date validation
	if(startDateFieldValid && endDateFieldValid){
		if(!isEarlierOrEqual(document.getElementById("readingFromField").value, document.getElementById("readingToField").value)){
			isValid = false;
			showError("readingFromValidationField", "End date cannot be earlier or equal to start date<br>");
		}
		
		if(getDaysCount(document.getElementById("readingFromField").value, document.getElementById("readingToField").value) > 365){
			isValid = false;
			showError("readingFromValidationField", "Too long time interval<br>");
		}
	}
	
	//additional free days validation
	if(pagesFieldValid && startDateFieldValid && endDateFieldValid && freeDaysFieldValid){
		var daysCount = getDaysCount(document.getElementById("readingFromField").value, document.getElementById("readingToField").value);
		if(daysCount <= document.getElementById("freeDaysField").value && daysCount > 0){
			isValid = false;
			showError("freeDaysValidationField", "Too much free days<br>");
		}
		
		if(daysCount - document.getElementById("freeDaysField").value > document.getElementById("pagesField").value){
				isValid = false;
				showError("pagesValidationField", "There has to be at least 1 page per day to read<br>");	
		}
	}
	
	return isValid;
}

function isEmpty(x){
	if(x == ""){
		return true;
	}
	return false;
}

function isNumber(x){
	if(isNaN(x)){
		return false;
	}
	return true;
}

function isEarlierOrEqual(date1, date2){
	if(date1 < date2){
		return true;
	}
	return false;
}

function showError(validationFieldId, message){
	var validationField = document.getElementById(validationFieldId);
	validationField.innerHTML = message;
	validationField.style.display = "inline";
}

function hideError(validationFieldId){
	var validationField = document.getElementById(validationFieldId);
	validationField.style.display = "none";
}