class MoneyConstants {
	
	// Global constants
	static EVENT_DATE_CHANGED = 'bm:date-change';  // triggered from MoneyManager when date changes
	static EVENT_BUDGET_UPDATE = 'bm:budget-update';  // triggered from MoneyTable when budget changes
	static EVENT_BUDGET_LOADED = 'bm:budget-loaded';  // triggered from MoneyStorage when budget is loaded

	static EVENT_SAVE_BUDGET = 'bm:save-budget';
	static EVENT_DELETE_BUDGET = 'bm:delete-budget';

	static EVENT_READY = 'bm:ready';

    static ACCOUNT_TYPE_INCOME = 1;
    static ACCOUNT_TYPE_EXPENSE = 2;
    static ACCOUNT_TYPE_FUND = 3;

    static accountTypes = [{id:1, name:'income'}, {id:2, name:'expense'}, {id:3, name:'fund'}];

    static baseAccounts = [
        { "id":"1", "categoryName": "Income", "accountName": "Paycheck1", "budgeted": 1500, "actual": 0, "accountType": { name: "income", id: 1 }},
        { "id":"2", "categoryName": "Income", "accountName": "Paycheck2", "budgeted": 0, "actual": 0, "accountType": { name: "income", id: 1 }},
        { "id":"3", "categoryName": "Savings", "accountName": "401k", "budgeted": 0, "actual": 0, "accountType": { name: "fund", id: 3 }},
        { "id":"4", "categoryName": "Savings", "accountName": "Emergency fund", "budgeted": 0, "actual": 0, "accountType": { name: "fund", id: 3 }},
        { "id":"5", "categoryName": "Savings", "accountName": "Kids college", "budgeted": 0, "actual": 0, "accountType": { name: "fund", id: 3 }},
        { "id":"6", "categoryName": "Debt", "accountName": "Cay payment", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"7", "categoryName": "Debt", "accountName": "Credit cards", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"8", "categoryName": "Debt", "accountName": "Medical bills", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"9", "categoryName": "Debt", "accountName": "Personal loan", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"10", "categoryName": "Debt", "accountName": "Student loan", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"11", "categoryName": "Food", "accountName": "Groceries", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"12", "categoryName": "Food", "accountName": "Restaurants", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"13", "categoryName": "Giving", "accountName": "Church", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"14", "categoryName": "Giving", "accountName": "Charity", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"15", "categoryName": "Health", "accountName": "Dental", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"16", "categoryName": "Health", "accountName": "Doctor visits", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"17", "categoryName": "Health", "accountName": "Gym membership", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"18", "categoryName": "Health", "accountName": "Medicine/vitamins", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"19", "categoryName": "Housing", "accountName": "Mortgage/rent", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"20", "categoryName": "Housing", "accountName": "Cable", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"21", "categoryName": "Housing", "accountName": "Electric", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"22", "categoryName": "Housing", "accountName": "Lawn care", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"23", "categoryName": "Housing", "accountName": "Natural gas", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"24", "categoryName": "Housing", "accountName": "Trash/water", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"25", "categoryName": "Insurance", "accountName": "Auto", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"26", "categoryName": "Insurance", "accountName": "Health", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"27", "categoryName": "Insurance", "accountName": "Homeowner/Renter", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"28", "categoryName": "Insurance", "accountName": "Identity theft", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"29", "categoryName": "Insurance", "accountName": "Life insurance", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"30", "categoryName": "Lifestyle", "accountName": "Childcare", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"31", "categoryName": "Lifestyle", "accountName": "Entertainment", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"32", "categoryName": "Lifestyle", "accountName": "Gifts", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"33", "categoryName": "Personal", "accountName": "Clothing", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"34", "categoryName": "Personal", "accountName": "Fun Money", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"35", "categoryName": "Personal", "accountName": "Hair/Nails", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"36", "categoryName": "Personal", "accountName": "Phone", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"37", "categoryName": "Personal", "accountName": "Subscriptions", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"38", "categoryName": "Transportation", "accountName": "Gas", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
        { "id":"39", "categoryName": "Transportation", "accountName": "Car Maintenace", "budgeted": 0, "actual": 0, "accountType": { name: "expense", id: 2 }},
    ];
	
}