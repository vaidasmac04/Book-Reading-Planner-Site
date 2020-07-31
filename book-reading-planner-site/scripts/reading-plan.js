//this class shouldn't be instantiated. It is a base class for different reading plans.
class ReadingPlan{
	
	constructor(pages, daysCount, freeDays){
		this.pages = pages;
		this.daysCount = daysCount;
		this.freeDays = freeDays;
		this.pagesArray = new Array();
	}
	
	//this method should be overriden in child's class
	getPagesForEveryDay(){
		return new Array();
	}
	
	pickRandomFreeDays(){
		var daysArray = new Array();
		var freeDaysArray = new Array();
		
		if(this.freeDays != 0){
			for(i = 0; i < parseInt(this.daysCount)-1; i++){
				daysArray[i] = i;
			}
			
			daysArray.sort(function (a, b) { return 0.5 - Math.random() });
			
			for(i = 0; i < this.freeDays; i++){
				freeDaysArray[i] = daysArray[i];
			}
			
			freeDaysArray.sort(function (a, b) { return a - b; });
		}
		
		return freeDaysArray;
	}
	
	splitLeftover(pagesLeft, pagesArray){
		var i = 0;
		
		while(pagesLeft > 0){
			if(i == pagesArray.length - 1){
				i = 0;
			}
			
			if(pagesArray[i] == 0){
				i++;
				continue;
			}
			
			pagesArray[i] += 1;
			pagesLeft--;
			
			i++;
		}
	}
}