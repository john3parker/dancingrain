function MoneyManager(config) {
	var self = this;
	
	self.config = {};
	self.element = {};
	self.constants = {};
	self.constants.ELEMENT_DATE_SELECT = 'bm_date_select';
	self.constants.DATE_FORMAT_USER = 'MMMM YYYY';
	self.constants.DATE_FORMAT_INTERNAL = 'YYYY-MM';
	self.constants.COOKIE_DATE = 'bm:current-date';

	self.config.currentDate = $.cookie(self.constants.COOKIE_DATE);
	if (null == self.config.currentDate || self.config.currentDate == undefined || self.config.currentDate == '') {
		self.config.currentDate = moment().format(self.constants.DATE_FORMAT_INTERNAL);
	}

	self.config.numberOfYears = 3;
	self.element.bindTo = config.bindTo;
		
	self.buildSelect = function(dateToSelect) {
		var date = moment("2019-01-01", 'YYYY-MM-DD');		
		var select = $('<select></select>').addClass('custom-select').attr('id',self.constants.ELEMENT_DATE_SELECT);
		for(var x=0; x < 12*self.config.numberOfYears; x++) {
			var selected = 'none';
			if (dateToSelect == date.format(self.constants.DATE_FORMAT_INTERNAL)) {
				selected = 'selected';
			}
			select.append($('<option/>').val(date.format(self.constants.DATE_FORMAT_INTERNAL)).attr(selected,'').text(date.format(self.constants.DATE_FORMAT_USER)));
			date.add(1, 'months');
		}
		
		var prev = $('<div/>').addClass('input-group-text oi oi-chevron-left pt-2 ').css('top', '0').css('cursor','pointer');
		var next = $('<div/>').addClass('input-group-text oi oi-chevron-right pt-2 ').css('top', '0').css('cursor','pointer');
		var prependGroup = $('<div/>').addClass('input-group-prepend').append(prev);
		var appendGroup = $('<div/>').addClass('input-group-append').append(next);
		var inputGroup = $('<div/>').addClass('input-group col-12').append(prependGroup).append(select).append(appendGroup);
				
		$(self.element.bindTo).append(inputGroup);
		
		// Set up event handler for buttons
		$(document).on('click', 'div.oi-chevron-left, div.oi-chevron-right', function(e) {
			var index = $(select).prop('selectedIndex');
			if (e.currentTarget.className.includes('left')) {
				if (index > 0) {
					index--;
				}
			}
			else if (e.currentTarget.className.includes('right')) {
				if (index < $(select).find('option').length-1) {
					index++;
				}
			}
			$(select).prop('selectedIndex', index);
			$(select).trigger('change');

		});
		
		// Set up event handler for date changes
		$(document).on('change','#'+self.constants.ELEMENT_DATE_SELECT, function() {
			self.config.currentDate = $(this).val();
			$.cookie(self.constants.COOKIE_DATE, self.config.currentDate);
			//$(document).trigger(MoneyConstants.EVENT_DATE_CHANGED, [self.config.currentDate]);
			window.location = window.location;

		});

		// Set up event handler for budget changes
		$(document).on(MoneyConstants.EVENT_BUDGET_UPDATE, function(e,data) {
			$(document).trigger(MoneyConstants.EVENT_SAVE_BUDGET, [self.config.currentDate, JSON.stringify(data)]);
		});
	
		// trigger the first date change so it loads the current budget
		
		setTimeout(function(){
			// Give everything time to load before triggering
			$(document).trigger(MoneyConstants.EVENT_DATE_CHANGED, [self.config.currentDate]);
		},300);

	}
	
	self.buildSelect(self.config.currentDate);
}