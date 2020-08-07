function MoneyTable(config) {
	var self = this; 
	
	self.config = {};
	self.constants = {};
	self.elements = {};
	
	self.elements.table = config.table;
	self.elements.leftToBudget = config.leftToBudget;
	self.config.data = config.data;
	
	self.constants.PROCESSING_INDICATOR = 'DTE_Processing_Indicator';
	self.constants.SELECT_INDICATOR = 'DTE_select_indicator';
	self.constants.COL_CATEGORY_NAME = 0;
	self.constants.COL_ACCOUNT_NAME = 1;
	self.constants.COL_BUDGETED = 2;
	self.constants.COL_ACTUAL = 3;
	self.constants.COL_ACCOUNT_TYPE = 4;
	self.constants.COL_ACTION_BUTTONS = 5;
	self.constants.COL_ID = 6;
	
	self.initialConfiguration = function() {
		
		self.config.xdom = 'Bfrtip';
		self.config.keys = false;
		self.config.columns = [
            { data: "categoryName", editable: true, type: "text" },
            { data: "accountName", editable: true, type: "text" },
            { data: "budgeted", editable: true, type: "number" },
            { data: "actual", editable: true, type: "number" },
            { data: "accountType.name", editable: true, type: "accountType" },
			{ data: null, render: function() {return self.actionButtons()}},			
			{ data: "id", visible:true}
		];
		self.config.order = [[self.constants.COL_CATEGORY_NAME, 'asc']];
		self.config.orderFixed = [self.constants.COL_ACCOUNT_TYPE, 'desc'];
		self.config.rowGroup = {
			startRender: function(rows,group) {
				return $('<div/>').text(group).append($('<span/>').addClass('oi oi-plus ml-2').css('font-size', '.8rem').css('cursor','pointer').attr('title','Add new account'));
			},
			dataSrc: 'categoryName'
			};
		
		$(document).on(MoneyConstants.EVENT_BUDGET_UPDATE, function() {
			self.leftToBudget();
		});

		self.accountTypes = [{id:1, name:'income'}, {id:2, name:'expense'}, {id:3, name:'fund'}];
	}
	
	self.initEditor = function() {
		$(self.elements.table + ' tbody').on('click', 'td', function (e) {
			self.addEdit(this,e);
		});
		$(self.elements.table + ' tbody').on('click', 'span.oi-trash', function (e) {
			var data = self.dataTable.row($(e.currentTarget).closest('tr')).data();
			self.dataTable.row($(e.currentTarget).closest('tr')).remove();
			self.dataTable.draw(false);
			
			for(var x=0; x < self.config.data.length; x++) {
				if (self.config.data[x].id == data.id) {
					self.config.data.splice(x,1);
					self.dataTable.draw(false);
					console.log('triggering budget update')
					$(document).trigger(MoneyConstants.EVENT_BUDGET_UPDATE, [self.config.data]);
					return;
				}
			}
		});

		$(self.elements.table + ' tbody').on('click', 'span.oi-plus', function (e) {
			var data = self.dataTable.row($(e.currentTarget).closest('tr').next('tr')).data();
			self.addRow(data);
		});

	}
	self.addRow = function(data) {
		var maxIndex = 0;
		var rows = self.dataTable.rows().data();
		
		console.log(self.config.data);
		console.log(self.config.data.length)

		for(var x=0; x < self.config.data.length; x++) {
			if (+self.config.data[x].id > +maxIndex) {
				maxIndex = +self.config.data[x].id;
			}
		}
		maxIndex = maxIndex+1;
		var newRow = {id:maxIndex, categoryName: data.categoryName, accountName:'New account', budgeted:0, actual:0, accountType:data.accountType}; 
		self.dataTable.row.add(newRow);
		self.dataTable.draw(false);
		self.config.data.push(newRow);
		
		self.dataTable.page.jumpToData(newRow.id, self.constants.COL_ID ); // 6 is the column of id
		$(document).trigger(MoneyConstants.EVENT_BUDGET_UPDATE, [self.config.data]);
	}

	
	self.createDataTable = function() {
		self.dataTable = $(self.elements.table).DataTable(self.config);
		self.initEditor();
		$(document).trigger(MoneyConstants.EVENT_BUDGET_UPDATE, [self.config.data]);
		
		// force a sort to fix a bug in grouping
		self.dataTable.column(self.constants.COL_CATEGORY_NAME).data().sort();
		
		// reload datatables with new budget
		$(document).on(MoneyConstants.EVENT_BUDGET_LOADED, function(e,data) {
			
			//console.log('receiving new data=' + data);
			//console.log(data)
			if (data == null || data == undefined || data == '') {
				self.config.data = MoneyConstants.baseAccounts;
			}
			else {
				self.config.data = data;
			}
			
			self.dataTable.clear();
			self.dataTable.rows.add(self.config.data);
			self.dataTable.draw();
			// force a sort to fix a bug in grouping
			self.dataTable.column(self.constants.COL_CATEGORY_NAME).data().sort();
			
			$(document).trigger(MoneyConstants.EVENT_BUDGET_UPDATE, [self.config.data]);
		});
	}
		
	self.actionButtons = function() {
		var div = $('<div/>').append($('<a/>').attr('href','#').append($('<span/>').addClass('oi oi-trash')));
		return $(div).html();
	}
	
	/*
	 * el = TD element with focus
	 */
	self.addEdit = function(el, event) {
	
		if (el && el !== undefined && $(el).length > 0 && !$(el).parent().hasClass('dtrg-group')) {
			var cellIndex = $(el)[0].cellIndex;
		
			if ($(self.elements.table + ' tbody').find('div.' + self.constants.PROCESSING_INDICATOR).length > 0) {
				var currentEdit = $(self.elements.table + ' tbody').find('div.' + self.constants.PROCESSING_INDICATOR);
				
				// if user click on same element being edited, then exit
				if ($(currentEdit).parent().is($(el))) {
					$(el).find('input').select();
					return;
				}
				//console.log('clearing edit');
				self.clearEdit(currentEdit, true);
			}
			    
		    if ($(el).find('div').hasClass(self.constants.PROCESSING_INDICATOR) ) {
		    	$(el).find('input').select();
		    	return;
		    }
		    
		    if (self.dataTable.settings().init().columns[cellIndex].editable) {
			//console.log('setting up edit');
			    var currentValue = self.dataTable.cell( el ).data();
			    var data = self.dataTable.row(el).data();
			    
			    var div = $('<div/>').addClass(self.constants.PROCESSING_INDICATOR);
			    var input = undefined;
			    
			    if (self.dataTable.settings().init().columns[cellIndex].type == 'accountType') {
			    	div.addClass(self.constants.SELECT_INDICATOR);
			    	input = $('<select/>').addClass('form-control form-control-sm').val(currentValue).bind('blur', self.handleKeypress).data('src', self.dataTable.settings().init().columns[cellIndex].data); 
			    	$(self.accountTypes).each(function() {
			    		var selected = 'none';
			    		if (this.id == data.accountType.id) {
			    			selected = 'selected';
			    		}
			    		$(input).append($('<option/>').attr('value', this.id).attr(selected,'').text(this.name));
			    	});
			    }
			    else {
			    	input = $('<input/>').attr('type', self.dataTable.settings().init().columns[cellIndex].type).addClass('form-control form-control-sm').val(currentValue).bind('keydown', self.handleKeypress).bind('blur', self.handleKeypress).data('src', self.dataTable.settings().init().columns[cellIndex].data);
		    	}
			    
			    $(el).html($(div).append(input));
			    input.focus();
			    //dataTable.keys.disable();
		    }    
		    //console.log(dataTable.settings().init().columns[cellIndex]);
		}
	}
	
	self.isEditMode = function() {
		return ($(self.elements.table).find('div.' + self.constants.PROCESSING_INDICATOR).length > 0);
	}
	
	self.isCurrentlyEditing = function(el) {
		return ( $(el).hasClass(self.constants.PROCESSING_INDICATOR) || $(el).parent().hasClass(self.constants.PROCESSING_INDICATOR) );
	}
	
	self.clearEdit = function(el, saveEdit) {
	
		if ($(el).is('input') || $(el).is('select') || $(el).is('div.' + self.constants.PROCESSING_INDICATOR)) {
			if ($(el).is('div.' + self.constants.PROCESSING_INDICATOR)) {
				// need to find the input or select
				el = $(el).find('input,select');
			}
			
			var data = self.dataTable.row($(el).parent().parent()).data();
			var cell = self.dataTable.cell($(el).parent().parent()).data();
			var isSelect = $(el).parent().hasClass(self.constants.SELECT_INDICATOR);
			
		    var srcField = $(el).data('src');
		    var newValue = $(el).val() || 0;
		    var newIndex = 0;
		    
			if (srcField == undefined)
				return
		    if (saveEdit) {
		    	// are we coming from a select? 
		    	if (isSelect) {
		    		newIndex = newValue;
		    		newValue = $(el).find(':selected').text();
		    		self.setByDot(data, 'accountType.id', newIndex);
		    	}
		    	self.setByDot(data, srcField, newValue);
		    }
		    //dataTable.keys.enable();
		    $(el).parent().parent().text(self.getByDot(data, srcField));
		    $(el).parent().remove();

			// only redraw when category is updated
	    	self.dataTable.draw(false); // sending false keeps DataTables on same page
	
		    //console.log(accounts);
		    //console.log(self.dataTable.rows().data());
		    
		    //TODO : where does sumTotal really go?
			//self.sumTotal();
			
			// Fire an Event
			$(document).trigger(MoneyConstants.EVENT_BUDGET_UPDATE, [self.config.data]);
			
		    return $(el).parent().next();
		}
	}

	self.handleKeypress = function(event) {
		var newFocus = $('td.focus');
	
		if (event.which == 27) {
			// ESC - cancel edit
			self.clearEdit(event.currentTarget, false);
		}
		else if(event.which == 13) {
			// ENTER - save edit
			if (self.isEditMode()) {
				self.clearEdit(event.currentTarget, true);
			}
			else {
				self.addEdit(newFocus);
			}
		}
		else if (event.which == 9 || event.which == 13) {// || event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40) {
			// TAB and arrow keys
			self.addEdit(newFocus);
		}
		else {
			if (event.type == 'blur') {
				
				setTimeout(function(){
					// Give the click event time to fire
					if (self.isCurrentlyEditing(event.currentTarget)) {
						// this could havwe been cleared already if they clicked on another TD
       					self.clearEdit(event.currentTarget, true);		
					}
    			},250);
			}
		}
	}
	
	self.setByDot = function(_obj, _path, _val) {
	    return _path.split('.').reduce(function (prev, curr, _idx, _arr) {
	        if ( _idx == (_arr.length-1) && prev ) {
	            prev[curr] = _val;
	        }
	
	        return prev ? prev[curr] : null
	    }, _obj || self);
	}
	
	self.getByDot = function(_obj, _path) {
	    return _path.split('.').reduce(function (prev, curr, _idx, _arr) {
	        if ( _idx == (_arr.length-1) && prev ) {
	            return prev[curr];
	        }
	
	        return prev ? prev[curr] : null
	    }, _obj || self);
	}
	
	self.leftToBudget = function() {
	
		var totalIncome = 0;
		var totalBudget = 0;
	
		for(var x=0;x < self.config.data.length; x++) {
			
			var account = self.config.data[x];
	
			if (account.accountType.id == '1') { // income
				totalIncome += +account.budgeted;
			} else {
				totalBudget += +account.budgeted;
			}
		}
	
		var amount = $('<span/>').text( (totalIncome - totalBudget).currency() );
		var message = $('<span/>');
		
		if (totalIncome - totalBudget > 0) {
			amount.addClass('text-success');
			message.text( ' left to budget' );
		}
		else if (totalIncome - totalBudget < 0) {
			amount.addClass('text-danger');
			message.text( ' over budget' );
		}
		else if (totalIncome - totalBudget == 0) {
			amount.addClass('text-success').text('You have a balanced budget!');
		}
			
		var h4 = $('<h4/>').append(amount).append(message);
		$(self.elements.leftToBudget).empty().append(h4);
		
	}	
	
	self.initialConfiguration();
	self.createDataTable();
}

jQuery.fn.dataTable.Api.register( 'page.jumpToData()', function ( data, column ) {
    var pos = this.column(column, {order:'current'}).data().indexOf( data );
 
console.log('after add data=' + data + ' in columnID=' + column + ' was found at pos=' + pos);
    if ( pos >= 0 ) {
        var page = Math.floor( pos / this.page.info().length );
        this.page( page ).draw( false );
    }
 
    return this;
} );