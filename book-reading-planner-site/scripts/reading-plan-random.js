class ReadingPlanRandom extends ReadingPlan{
	
	constructor(pages, daysCount, freeDays){
		super(pages, daysCount, freeDays);
	}
	
	getPagesForEveryDay(){
		var numberOfPagesPerDayIfLinear = parseInt(this.pages/(this.daysCount-this.freeDays));
		var pagesLeft = this.pages%(this.daysCount-this.freeDays);
		var freeDaysArray = super.pickRandomFreeDays();
		var pagesArray = new Array();
		var needGenerateRandom = true;
		var randomPages;
		
		for(var i = 0; i < this.daysCount; i++){
			var isFreeDay = false;
			
			for(var j = 0; j < freeDaysArray.length; j++){
				if(freeDaysArray[j] == i){
					isFreeDay = true;
					break;
				}
			}
			
			if(isFreeDay){
				pagesArray[i] = 0;
				continue;
			}
			
			if(needGenerateRandom){
				randomPages = this.getRandomInt(1, numberOfPagesPerDayIfLinear*2-1);
				pagesArray[i] = randomPages;
				needGenerateRandom = false;
			}
			else{
				pagesArray[i] = numberOfPagesPerDayIfLinear*2 - randomPages;
				needGenerateRandom = true;
			}
		}
		
		if((this.daysCount-this.freeDays) % 2 != 0){
			pagesArray[pagesArray.length-1] = numberOfPagesPerDayIfLinear;
		}
		
		super.splitLeftover(pagesLeft, pagesArray);
		
		return pagesArray;
	}
	
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}