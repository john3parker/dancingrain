function MoneyChart(elementToBind) {
	var self = this;
	
	self.constants = {};
	self.elements = {};
	self.elements.elementToBind = elementToBind;
	self.constants.CHART_ID = 'bm:budgetChart';
	
	self.initialConfiguration = function() {
		self.config = {};
		
		self.config.labelField = 'name';
		self.config.valueField = 'budgeted';
		self.config.type = 'doughnut';
		self.config.data = {};
		self.config.data.labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
		self.config.data.datasets = [];
		self.config.options = {legend:{display:false}, cutoutPercentage:75};
		
		self.dataset = {};
		self.dataset.label = "cccc";
		self.dataset.data = [1,1,1,1];
		self.dataset.backgroundColor = self.colors(14);
		self.dataset.borderColor = self.colors(14);
		self.dataset.borderWidth = "1";

	}
	
	self.createChart = function() {

		self.elements.canvas = $('<canvas></canvas>').attr('id', self.constants.CHART_ID);
		self.elements.incomeDiv = $('<div/>').addClass('position-absolute text-center').css('top','50%').css('left','50%').css('transform','translate(-50%,-50%)').append($('<span/>').text('INCOME')).append($('<p/>'));
		
		self.elements.topDiv = $('<div/>').append(self.elements.canvas).append(self.elements.incomeDiv);
		
		$(self.elements.elementToBind).append(self.elements.topDiv);

		self.config.data.datasets.push(self.dataset);

		self.chart = new Chart($(self.elements.canvas), self.config);
		
		$(document).on(MoneyConstants.EVENT_BUDGET_UPDATE, function(event, accounts) {
			self.sumTotal(accounts);
		});
	}
	
	self.updateChart = function(newArrayValues) {
		//console.log('updateChart')
		//console.log(newArrayValues)
	
		self.config.data.label = [];
		self.dataset.data = [];
		self.dataset.backgroundColor = self.colors(newArrayValues.length);
		self.dataset.borderColor = self.dataset.backgroundColor;
			
		newArrayValues.forEach(function(o, index, array) {
			//console.log(config.valueField)
			//console.log(o[config.valueField])
	
			if (typeof o[self.config.labelField] == 'function') {
		  		self.config.data.label.push(o[self.config.labelField]());
			} else {
				self.config.data.label.push(o[self.config.labelField]);
			}
			if (typeof o[self.config.valueField] == 'function') {
				self.dataset.data.push(o[self.config.valueField]());
			} else {
				self.dataset.data.push(o[self.config.valueField]);
			}
					
		});
		//console.log(dataset.data);		
		//console.log('updating chart');
		self.chart.data.datasets[0].data = self.dataset.data;
		self.chart.data.labels = self.config.data.label;

		self.chart.update();
	}
	
	self.colors = function (size) {
		// custom
		return ['#00b2f6','#e64b40','#faab19','#48ce65','#b34fa0','#16a597','#f26552','#e3b409','#35bd59','#634fb3', '#5cbae6','#b6d957','#fac364','#8cd3ff','#d998cb','#f2d249','#93b9c6','#ccc5a8','#52bacc','#dbdb46','#98aafb'].slice(0,size);
			
			
		// Google Material Pallette
		// indigo, deep orange, blue gray, amber,teal,red, light blue, brown, yellow, green,gray secondary,gray
		//return ['#3F51B5','#FF5722','#607D8B','#FFC107','#009688','#F44336','#03A9F4','#795548','#FFEB3B','#4CAF50','#757575','#9E9E9E'].slice(0,size);
		
		// SAP Qualitative Palette - visually different for visualization
		//return ['#5899DA','#E8743B','#19A979','#ED4A7B','#945ECF','#13A4B4','#525DF4','#BF399E','#6C8893','#EE6868','#2F6497'].slice(0,size);
		
		// SAP Chart Color Pallette -  Qualitative https://experience.sap.com/fiori-design-web-versions-1-26-and-1-28/ui-components/color-palettes/
		//return ['#5cbae6','#b6d957','#fac364','#8cd3ff','#d998cb','#f2d249','#93b9c6','#ccc5a8','#52bacc','#dbdb46','#98aafb'].slice(0,size);
		
		// SAP Chart Colors - Sequential (offset by shade)
		//return ['#abdbf2','#d7eaa2','#fde5bd','#d5dadc','#84caec','#c6e17d','#fbd491','#bac1c4','#5cbae5','#b6d957','#fac364','#9ea8ad','#1b7eac','#759422','#dd8e07','#69767c','#156489','#5b731a','#b57506','#5e696e'].slice(0,size);
		
	}

	self.sumTotal = function(accounts) {
		
		var map = new Map();
		var totals = [];
		var totalIncome = {budgeted:0, actual:0};
		var totalBudget = {budgeted:0, actual:0};

		for(var x=0;x < accounts.length; x++) {
			
			var categoryTotal = map.get(accounts[x].categoryName);
	
			if (categoryTotal == undefined) {
				categoryTotal = {};
				categoryTotal.name = accounts[x].categoryName;
				categoryTotal.budgeted = 0;
				categoryTotal.actual = 0;
				categoryTotal.accountType = accounts[x].accountType;
				map.set(accounts[x].categoryName, categoryTotal);
			}
			
			categoryTotal.budgeted += +accounts[x].budgeted;
			categoryTotal.actual += +accounts[x].actual;
			
			if (accounts[x].accountType.id == MoneyConstants.ACCOUNT_TYPE_INCOME) { // income
				totalIncome.budgeted += +accounts[x].budgeted;
			} else {
				totalBudget.budgeted += +accounts[x].budgeted;
			}
			
			
		}
		
		for (var [key, category] of map) {
			if (category.accountType.id != MoneyConstants.ACCOUNT_TYPE_INCOME) {
				totals.push(category);
			}
		}
		
		self.updateChart(totals);
		
		// TODO: where do we want to handle these? 
		$(self.elements.incomeDiv).find('p').text(totalIncome.budgeted.currency());
		//leftToBudget(totalIncome, totalBudget);
	}

	self.initialConfiguration();
	self.createChart();
}



Number.prototype.currency = function() {
	return this.toLocaleString('en-US', {'currency': 'USD', 'style':'currency'});
}
Number.prototype.percent = function() {
	return this.toLocaleString('en-US', {'style':'percent', 'minimumFractionDigits':'1', 'maximumFractionDigits':'1'});
}
