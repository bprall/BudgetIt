import getCatColor from "../utils/getCatColor.js";
import loadPage from "../index.js";

export default function renderAddPurchase() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthOptions = months.map(month => `<option value="${month}">${month}</option>`).join('');

  const formHtml = `
    <div id="purchasepage">
      <form id="addPurchaseForm">
        <div class="inputs">
          <label for="category">Select Category:</label>
          <select id="category" name="category">
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Clothing">Clothing</option>
            <option value="Rent">Rent</option>
            <option value="Other">Other</option>
          </select><br>
          
          <label for="month">Select Month:</label>
          <select id="month" name="month">
            ${monthOptions}
          </select><br>

          <label for="amount">Enter Amount:</label>
          <input type="number" id="amount" name="amount" required><br>
        </div>
        <div class="bottom-button">
          <button type="button">Add Purchase</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', formHtml);
  document.querySelector('#addPurchaseForm button').addEventListener('click', addPurchase);
}

function addPurchase() {
  const category = document.getElementById("category").value;
  const month = document.getElementById("month").value;
  const amount = parseFloat(document.getElementById("amount").value);

  const initialStore = readInitialStore();
  const expenseSummary = initialStore.expenseSummary || [];

  // Check if an entry for the category and month already exists
  const existingExpenseIndex = expenseSummary.findIndex(
    (expense) => expense.category === category && expense.month === month
  );

  if (existingExpenseIndex !== -1) {
    // Update the existing entry by adding the new amount
    expenseSummary[existingExpenseIndex].amount += amount;
  } else {
    // Create a new entry
    const updatedExpense = {
      expenseID: generateExpenseID(),
      userID: 1,
      category: category,
      color: getCatColor(category),
      amount: amount,
      month: month,
    };

    expenseSummary.push(updatedExpense);
  }

  writeInitialStore({ ...initialStore, expenseSummary });
  loadPage("expenses");
}
   
const generateExpenseID = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

const readInitialStore = () => {
  const storedData = localStorage.getItem('initialStore');
  return storedData ? JSON.parse(storedData) : {};
};

const writeInitialStore = (data) => {
  localStorage.setItem('initialStore', JSON.stringify(data, null, 2));
};