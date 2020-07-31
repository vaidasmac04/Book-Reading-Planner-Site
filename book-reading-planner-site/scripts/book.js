class Book {
	
	constructor(title, pages, readingFrom, readingTo, freeDays, planType) {
		this.title = title;
		this.pages = pages;
		this.readingFrom = new Date(readingFrom);
		this.readingTo = new Date(readingTo);
		this.freeDays = freeDays;
		this.planType = planType;
	}
	
	getDaysCount(){
		const dateFromUTC = Date.UTC(this.readingFrom.getFullYear(), this.readingFrom.getMonth(), this.readingFrom.getDate());
		const dateToUTC = Date.UTC(this.readingTo.getFullYear(), this.readingTo.getMonth(), this.readingTo.getDate());
		return Math.floor((dateToUTC - dateFromUTC) / (1000 * 60 * 60 * 24));
	}
}
