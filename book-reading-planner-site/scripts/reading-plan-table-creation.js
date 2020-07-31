function createReadingPlan(){
	hideAllErrors();
	
	if(validatePlanCreationForm()){
		
		if(isPlanTableAlreadyCreated()){
			document.getElementById("planTableContainer").removeChild(document.getElementById("planTable"));
		}
		
		var planTable = document.createElement("table");
		planTable.id = "planTable";
		fillPlanTable(planTable);
		document.getElementById("planTableContainer").appendChild(planTable);
	}
}

function fillPlanTable(planTable){
	
	var book = createBook();
	var readingPlan = null;
	
	if(book.planType == "linear"){
		readingPlan = new ReadingPlanLinear(book.pages, book.getDaysCount(), book.freeDays);
	}
	else if(book.planType == "random"){
		readingPlan = new ReadingPlanRandom(book.pages, book.getDaysCount(), book.freeDays);
	}
	
	var pagesArray = readingPlan.getPagesForEveryDay();
	
	var caption = document.createElement("caption");
	caption.innerHTML = "Reading plan for book: '" + book.title + "'";
	planTable.appendChild(caption);
	
	var header = document.createElement("tr");
	headerNames = ["Days count", "Date", "Pages"];
	
	for(var i = 0; i < headerNames.length; i++){
		var cell = document.createElement("th");
		cell.innerHTML = headerNames[i];
		header.appendChild(cell);
	}
	
	planTable.appendChild(header);
	
	for(i = 0; i < book.getDaysCount(); i++){
		var row = document.createElement("tr");

		var rowNumberCell = document.createElement("td");
		rowNumberCell.innerHTML = parseInt(i+1);

		var dateCell = document.createElement("td");
		var date = new Date(book.readingFrom);
		date.setDate(date.getDate() + i);
		dateCell.innerHTML = formatDate(date);
		
		var pagesCell = document.createElement("td");
		
		if(pagesArray[i] == "0"){
			pagesCell.innerHTML = '<span style="color:red;">free</span>';
		}
		else{
			pagesCell.innerHTML = pagesArray[i];
		}
		
		
		row.appendChild(rowNumberCell);
		row.appendChild(dateCell);
		row.appendChild(pagesCell);
		
		planTable.appendChild(row);
	}
}	

function isPlanTableAlreadyCreated(){
	if(document.getElementById("planTable") == null){
		return false;
	}
	
	return true;
}

//getting user input after validation
function createBook(){
	var title = document.getElementById("bookTitleField").value;
	var pages = document.getElementById("pagesField").value;
	var dateFrom = document.getElementById("readingFromField").value;
	var dateTo = document.getElementById("readingToField").value;
	var freeDays = document.getElementById("freeDaysField").value;
	
	var typeRadioGroup = document.getElementsByName("planGroup");
	var type;
	
	for(i = 0; i < typeRadioGroup.length; i++){
		if(typeRadioGroup[i].checked){
			type = typeRadioGroup[i].value;
			break;
		}
	}
	
	var book = new Book(title, pages, dateFrom, dateTo, freeDays, type);
	return book;
}


	
	
	
	
	
	
	
	

