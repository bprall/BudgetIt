import { getMonth } from "../utils/changePage.js"
import loadPage from "../index.js"

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var currentMonth = getMonth();

export default function renderExpenses() {
  const mainElement = createMainElement();
  const pageContainer = createPageContainer();
  const monthSelection = createMonthSelection();
  const chartContainer = createChartContainer();
  const expensesContainer = createExpensesContainer();
  const bottomButton = createBottomButton();

  appendElementsToPage(pageContainer, monthSelection, chartContainer, expensesContainer, bottomButton);
  mainElement.appendChild(pageContainer);
  document.body.appendChild(mainElement);
}


function changeMonth(direction) {
  currentMonth += direction;
  
  if (currentMonth >= months.length) {
    currentMonth = 0;
  } else if (currentMonth < 0) {
    currentMonth = months.length - 1;
  }
  
  let monthTag = document.getElementsByTagName('h2')[0];
  if (monthTag) {
    monthTag.textContent = months[currentMonth];
  }
  
  const currentBottomButton = document.querySelector('.bottom-button');
  
  const currentExpenseContainer = document.getElementById('expenses-container');
  if (currentExpenseContainer) {
    currentExpenseContainer.remove();
  }
  
  const newExpenseContainer = createExpensesContainer(currentMonth);
  document.querySelector('.page-container')
    .insertBefore(newExpenseContainer, currentBottomButton);
  
  const currentChartContainer = document.querySelector('.chart-container');
  if (currentChartContainer) {
    currentChartContainer.remove();
  }
  
  const newChartContainer = createChartContainer();
  document.querySelector('.page-container')
    .insertBefore(newChartContainer, newExpenseContainer);
  
  newChartContainer.classList.remove('hidden');
  newExpenseContainer.classList.remove('hidden');
}


function createExpenseRow(category, color, amount) {
  var expenseRow = document.createElement('div');
  expenseRow.className = 'expense-row';

  var categoryCircle = document.createElement('div');
  categoryCircle.className = 'category-circle';
  categoryCircle.style.backgroundColor = color;

  var categoryName = document.createElement('p');
  categoryName.className = 'category-name';
  categoryName.textContent = category;

  var expenseAmount = document.createElement('p');
  expenseAmount.className = 'expense-amount';
  expenseAmount.textContent = amount;

  expenseRow.appendChild(categoryCircle);
  expenseRow.appendChild(categoryName);
  expenseRow.appendChild(expenseAmount);

  return expenseRow;
} 

function createMainElement() {
  return document.createElement('main');
}

function createPageContainer() {
  const pageContainer = document.createElement('div');
  pageContainer.id = 'pageContainer';
  pageContainer.className = 'page-container hidden';
  return pageContainer;
}

function createMonthSelection() {
  const monthSelection = document.createElement('div');
  monthSelection.id = 'month-selection';

  var leftArrow = document.createElement('button');
  leftArrow.id = 'left-arrow';
  leftArrow.className = 'hidden';
  leftArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  leftArrow.addEventListener('click', function() {
    changeMonth(-1)
  });

  var h2Month = document.createElement('h2');
  h2Month.className = 'hidden';
  h2Month.textContent = months[currentMonth];
  
  var rightArrow = document.createElement('button');
  rightArrow.id = 'right-arrow';
  rightArrow.className = 'hidden';
  rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  rightArrow.addEventListener('click', function() {
    changeMonth(1)
  });

  monthSelection.appendChild(leftArrow);
  monthSelection.appendChild(h2Month);
  monthSelection.appendChild(rightArrow);

  return monthSelection;
}



function createChartContainer() {
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container hidden';

  let canvasDiv = document.createElement('div');
  let canvas = document.createElement('canvas');
  canvas.id = 'expenseChart';
  canvas.width = '50';
  canvas.height = '50';
  canvasDiv.appendChild(canvas);

  let chartJsScript = document.createElement('script');
  chartJsScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  chartContainer.appendChild(canvasDiv);
  chartContainer.appendChild(chartJsScript);

  let createChartScript = document.createElement('script');
  createChartScript.textContent = `
    function createExpenseChart() {
      fetch('../initialstore.json')
        .then(response => response.json())
        .then(data => {
          const expenseData = data.expenseSummary.filter(item => item.month === '${months[currentMonth]}');
          const expenseCategories = expenseData.map(item => item.category);
          const expenseAmounts = expenseData.map(item => item.amount);
          const ctx = document.getElementById('expenseChart').getContext('2d');
          const expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: expenseCategories,
              datasets: [{
                data: expenseAmounts,
                backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
              }],
            },
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    createExpenseChart();
  `;
  chartContainer.appendChild(createChartScript);

  return chartContainer;
}


function createExpensesContainer() {
  const expensesContainer = document.createElement('div');
  expensesContainer.id = 'expenses-container';
  expensesContainer.className = 'hidden';
  
  fetch('../initialstore.json')
    .then(response => response.json())
    .then(data => {
      const currentMonthExpenses = data.expenseSummary.filter(expense => expense.month === months[currentMonth]);
      currentMonthExpenses.forEach(expense => {
        const expenseRow = createExpenseRow(expense.category, expense.color, `$${expense.amount.toFixed(2)}`);
        expensesContainer.appendChild(expenseRow);
      });
    })
    .catch(error => console.error('Error loading initialstore.json:', error));
  return expensesContainer;
}


function createBottomButton() {
  const bottomButton = document.createElement('div');
  bottomButton.className = 'bottom-button';

  var addButton = document.createElement('button');
  addButton.className = 'hidden';

  var addPurchaseLink = document.createElement('a');
  addPurchaseLink.id = 'add-purchase';
  addPurchaseLink.innerHTML = '<b>Add Purchase</b>';
  addButton.appendChild(addPurchaseLink);
  
  addButton.addEventListener('click', function() {
    loadPage('addpurchase');
  });

  bottomButton.appendChild(addButton);

  return bottomButton;
}

function appendElementsToPage(mainElement, ...elements) {
  elements.forEach(element => {
    mainElement.appendChild(element);
  });
}