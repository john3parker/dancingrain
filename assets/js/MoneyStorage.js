function MoneyStorage(config) {
	var self = this; 

	self.config = {};
	self.element = {};
	self.constants = {};

	self.constants.STORAGE_PREFIX = 'bm:budget-';


	self.get = function(date) {
		return localStorage.getItem(self.constants.STORAGE_PREFIX + date);
	}	
	self.set = function(date, data) {
		localStorage.setItem(self.constants.STORAGE_PREFIX + date,data);
	}	
	self.delete = function(date) {
		localStorage.deleteItem(self.constants.STORAGE_PREFIX + date);
	}	
	
	self.subscribeToEvents = function() {
		
		// Set up event handlers for date changes
		$(document).on(MoneyConstants.EVENT_DATE_CHANGED, function(e,date) {
			var data = self.get(date);
			$(document).trigger(MoneyConstants.EVENT_BUDGET_LOADED, [JSON.parse(data)]);
		});

		// Set up event handler to save budget
		$(document).on(MoneyConstants.EVENT_SAVE_BUDGET, function(e,date,data) {
			self.set(date, data);			
		});

		// Set up event handler to delete budget
		$(document).on(MoneyConstants.EVENT_DELETE_BUDGET, function(e,date,data) {
			self.delete(date, data);			
		});

	}

	self.subscribeToEvents();
}