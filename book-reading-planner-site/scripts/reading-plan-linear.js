class ReadingPlanLinear extends ReadingPlan{
	
	constructor(pages, daysCount, freeDays){
		super(pages, daysCount, freeDays);
	}
	
	getPagesForEveryDay(){
		var numberOfPagesPerDay = parseInt(this.pages/(this.daysCount-this.freeDays));
		var pagesLeft = this.pages%(this.daysCount-this.freeDays);
		var freeDaysArray = super.pickRandomFreeDays();
		var pagesArray = new Array();
		
		for(var i = 0; i < parseInt(this.daysCount); i++){
			
			var isFreeDay = false;
			
			for(var j = 0; j < freeDaysArray.length; j++){
				if(i == freeDaysArray[j]){
					isFreeDay = true;
					break;
				}
			}
			
			if(!isFreeDay){
				pagesArray[i] = numberOfPagesPerDay;
			}
			else{
				pagesArray[i] = 0;
			}
		}
		
		super.splitLeftover(pagesLeft, pagesArray);
		
		return pagesArray;
	}
}