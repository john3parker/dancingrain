<div class="row">
	<div class="col-12 col-lg-3 border"><div class=""></div></div>
	<div class="col-12 col-lg-6">
		<div style="margin-left:20px;">
		    
		    <h1>Javen the Money Man</h1>
			<div class="" id="leftToBudget">
				<h4>
					<span class="text-success">$2,736.00</span><span>&nbsp;left to budget</span>
				</h4>
				</div>
		    
		    <table id="datatables" class="table">
		        <thead>
		            <tr>
		                <th>Category</th>
		                <th>Name</th>
		                <th>Budgeted</th>
		                <th>Actual</th>
		                <th>Type</th>
		                <th>Action</th>
		            </tr>
		        </thead>    
		    </table>
		</div> 
	</div>
	<div class="col-12 col-lg-3 border">


		<div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link active" href="#budgetPlanned" data-toggle="tab">Planned</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#budgetSpent" data-toggle="tab">Spent</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#budgetRemaining" data-toggle="tab">Remaining</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#tabTransactions" data-toggle="tab">Transactions</a>
				</li>
			</ul>
		</div>
		<div class="tab-content overflow-auto" style="height: calc(100% - 105px)">
			<div class="tab-pane fade" id="tabTransactions">
				<div class="">
					<h3 class="p-1" data-bind="text: activeAccount().name()"></h3>
					<button id="btnAddTrans" class="btn btn-secondary btn-sm m-2">Add Transaction</button>
					<p data-bind="visible: activeAccount().entries().length == 0" class="text-italics m-2">No transactions found</p>
					
					<table class="table table-hover">
						<tbody data-bind="foreach: activeAccount().entries()">
							<tr>
								<td data-bind="text: dateFormatted()"></td>
								<td data-bind="text: amount().currency()" class="text-right"></td>
								<td data-bind="text: note()"></td>
								<td data-bind="click: $root.activeAccount().deleteJournalEntry.bind($data, $root)"><span class="oi oi-circle-x cursor-pointer text-danger"></span></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="tab-pane fade show active" id="budgetPlanned">
				<div class="w-75 position-relative" id="budgetedChart">
				<!-- 
					<canvas id="budgetedChart"></canvas>
					<div class="position-absolute text-center" style="top:50%;left:50%;transform:translate(-50%,-50%);">
						<span>INCOME</span>
						<p id="totalIncome"></p>
					</div>
				 -->
				</div>			
				<table class="table">
					<thead>
						<tr>
							<th>Account</th>
							<th class="text-right">Budgeted</th>
							<th class="text-right">Percent of Income</th>
						</tr>
					</thead>
					<tbody data-bind="foreach: filteredCategoriesNoIncome()">
						<tr>
							<td data-bind="text: name()"></td>
							<td data-bind="text: budgetPlanned().currency()" class="text-right"></td>
							<td data-bind="text: budgetPercent().percent(), css: {'text-danger': budgetPercent() > 1 }" class="text-right"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="tab-pane fade" id="budgetSpent">
				<div class="w-75 position-relative">
					<canvas data-bind="chart: filteredCategoriesNoIncome, type: 'doughnut', label: 'name', value:'budgetSpent', subscribe: [totalPlanned, totalIncome, totalSpent] "></canvas>
					<div class="position-absolute text-center" style="top:50%;left:50%;transform:translate(-50%,-50%);">
						<span>SPENT</span>
						<p data-bind="text: totalIncome().currency()"></p>
					</div>
				</div>
				<table class="table">
					<tbody data-bind="foreach: filteredCategoriesNoIncome()">
						<tr>
							<td data-bind="text: name()"></td>
							<td data-bind="text: budgetSpent().currency()" class="text-right"></td>
						</tr>
					</tbody>
				</table>

			</div>
			<div class="tab-pane fade" id="budgetRemaining">
				<div class="w-75 position-relative">
					<canvas data-bind="chart: filteredCategoriesNoIncome, type: 'doughnut', label: 'name', value:'budgetSpent', subscribe: [totalPlanned, totalIncome, totalSpent] "></canvas>
					<div class="position-absolute text-center" style="top:50%;left:50%;transform:translate(-50%,-50%);">
						<span>REMAINING</span>
						<p data-bind="text: totalRemaining().currency()"></p>
					</div>
				</div>
				<table class="table">
					<tbody data-bind="foreach: filteredCategoriesNoIncome()">
						<tr>
							<td data-bind="text: name()"></td>
							<td data-bind="text: budgetRemaining().currency()" class="text-right"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	
	
	</div>
	
</div>



<script>
    var accounts = [
        { "id":"1", "categoryName": "Income", "accountName": "Paycheck1", "budgeted": 1586, "actual": 0, "accountType": { name: "income", id: 1 }},
        { "id":"2", "categoryName": "Income", "accountName": "Paycheck2", "budgeted": 2500, "actual": 0, "accountType": { name: "income", id: 1 }},
        { "id":"3", "categoryName": "Savings", "accountName": "401k", "budgeted": 250, "actual": 0, "accountType": { name: "fund", id: 3 }},
        { "id":"4", "categoryName": "Savings", "accountName": "Emergency fund", "budgeted": 0, "actual": 0, "accountType": { name: "fund", id: 3 }},
        { "id":"5", "categoryName": "Savings", "accountName": "Kids college", "budgeted": 0, "actual": 0, "accountType": { name: "fund", id: 3 }},
        { "id":"6", "categoryName": "Debt", "accountName": "Cay payment", "budgeted": 450, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"7", "categoryName": "Debt", "accountName": "Credit cards", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"8", "categoryName": "Debt", "accountName": "Medical bills", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"9", "categoryName": "Debt", "accountName": "Personal loan", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"10", "categoryName": "Debt", "accountName": "Student loan", "budgeted": 250, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"11", "categoryName": "Food", "accountName": "Groceries", "budgeted": 250, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"12", "categoryName": "Food", "accountName": "Restaurants", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"13", "categoryName": "Giving", "accountName": "Church", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"14", "categoryName": "Giving", "accountName": "Charity", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"15", "categoryName": "Health", "accountName": "Dental", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"16", "categoryName": "Health", "accountName": "Doctor visits", "budgeted": 120, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"17", "categoryName": "Health", "accountName": "Gym membership", "budgeted": 45, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"18", "categoryName": "Health", "accountName": "Medicine/vitamins", "budgeted": 25, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"19", "categoryName": "Housing", "accountName": "Mortgage/rent", "budgeted": 650, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"20", "categoryName": "Housing", "accountName": "Cable", "budgeted": 150, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"21", "categoryName": "Housing", "accountName": "Electric", "budgeted": 350, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"22", "categoryName": "Housing", "accountName": "Lawn care", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"23", "categoryName": "Housing", "accountName": "Natural gas", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"24", "categoryName": "Housing", "accountName": "Trash/water", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"25", "categoryName": "Insurance", "accountName": "Auto", "budgeted": 300, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"26", "categoryName": "Insurance", "accountName": "Health", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"27", "categoryName": "Insurance", "accountName": "Homeowner/Renter", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"28", "categoryName": "Insurance", "accountName": "Identity theft", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"29", "categoryName": "Insurance", "accountName": "Life insurance", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"30", "categoryName": "Lifestyle", "accountName": "Childcare", "budgeted": 300, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"31", "categoryName": "Lifestyle", "accountName": "Entertainment", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"32", "categoryName": "Lifestyle", "accountName": "Gifts", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"33", "categoryName": "Personal", "accountName": "Clothing", "budgeted": 100, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"34", "categoryName": "Personal", "accountName": "Fun Money", "budgeted": 100, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"35", "categoryName": "Personal", "accountName": "Hair/Nails", "budgeted": 60, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"36", "categoryName": "Personal", "accountName": "Phone", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"37", "categoryName": "Personal", "accountName": "Subscriptions", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"38", "categoryName": "Transportation", "accountName": "Gas", "budgeted": 100, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"39", "categoryName": "Transportation", "accountName": "Car Maintenace", "budgeted": 25, "actual": 0, "accountType": { name: "expense", id: 2 }},
    ];
 
$(document).ready(function() {
    new MoneyChart('#budgetedChart');
    new MoneyTable({table: '#datatables', leftToBudget: '#leftToBudget', data: accounts});
});

</script>

