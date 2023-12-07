import loadPage from "../index.js"

function createGoalHeader(headerText) {
  var goalHeader = document.createElement('h3');
  goalHeader.className = 'goal-header';
  goalHeader.textContent = headerText;
  return goalHeader;
}

function createProgressContainer(currentAmount, progressPercent, targetAmount) {
  var progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';

  var currentAmountDiv = document.createElement('div');
  currentAmountDiv.className = 'current-amount';
  currentAmountDiv.textContent = currentAmount;

  var progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';

  var progressBarInner = document.createElement('div');
  progressBarInner.className = 'progress-bar-inner';

  var progressTitle = document.createElement('p');
  progressTitle.className = 'progress-title';

  var progressPercentDiv = document.createElement('p');
  progressPercentDiv.className = 'progress-percent';
  progressPercentDiv.textContent = progressPercent;

  var targetAmountDiv = document.createElement('div');
  targetAmountDiv.className = 'target-amount';
  targetAmountDiv.textContent = targetAmount;

  progressBarInner.appendChild(progressTitle);
  progressBarInner.appendChild(progressPercentDiv);

  progressBar.appendChild(progressBarInner);

  progressContainer.appendChild(currentAmountDiv);
  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(targetAmountDiv);

  // Set the width dynamically based on the progress percentage
  progressBarInner.style.width = progressPercent;

  return progressContainer;
}

export default function renderGoals() {
  var mainElement = document.createElement('main');
  var pageContainer = document.createElement('div');
  pageContainer.className = 'page-container hidden';

  fetch('../initialstore.json')
    .then(response => response.json())
    .then(data => {
      const goals = data.goals || [];

      goals.forEach(goal => {
        var goalHeader = createGoalHeader(goal.description);
        var progressContainer = createProgressContainer(
          `$${goal.currentAmount}`,
          calculateProgressPercent(goal.currentAmount, goal.targetAmount),
          `$${goal.targetAmount}`
        );

        // Append elements to pageContainer
        pageContainer.appendChild(goalHeader);
        pageContainer.appendChild(progressContainer);
        });
      });

      // Bottom Buttons
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-container';
      const bottomButton2 = createBottomButton2();
      const bottomButton1 = createBottomButton1();

      // Append buttons to buttonContainer
      buttonContainer.appendChild(bottomButton1);
      buttonContainer.appendChild(bottomButton2);
      
      // Append buttonContainer to pageContainer
      pageContainer.appendChild(buttonContainer);


  // Append pageContainer to the body
  mainElement.appendChild(pageContainer);
  document.body.appendChild(mainElement);
}



function calculateProgressPercent(currentAmount, targetAmount) {
  const percent = (currentAmount / targetAmount) * 100;
  return `${percent.toFixed(0)}%`;
}



function createBottomButton1() {
  const bottomButton = document.createElement('div');
  bottomButton.className = 'bottom-button';

  var addButton = document.createElement('button');
  addButton.className = 'hidden';

  var addGoalLink = document.createElement('a');
  addGoalLink.id = 'add-goal';
  addGoalLink.innerHTML = '<b>Add Goal</b>';
  addButton.appendChild(addGoalLink);
  
  addButton.addEventListener('click', function() {
    loadPage('addgoal');
  });

  bottomButton.appendChild(addButton);

  return bottomButton;
}

function createBottomButton2() {
  const bottomButton = document.createElement('div');
  bottomButton.className = 'bottom-button';

  var addButton = document.createElement('button');
  addButton.className = 'hidden';

  var updateGoalLink = document.createElement('a');
  updateGoalLink.id = 'update-goal';
  updateGoalLink.innerHTML = '<b>Update Goal</b>';
  addButton.appendChild(updateGoalLink);
  
  addButton.addEventListener('click', function() {
    loadPage("updategoal");
  });

  bottomButton.appendChild(addButton);

  return bottomButton;
}