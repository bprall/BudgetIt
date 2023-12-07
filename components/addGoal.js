import loadPage from "../index.js";

export default function renderAddGoal() {
  const formHtml = `
    <div id="addGoalPage">
      <form id="addGoalForm">
        <div class="inputs">
          <label for="category">Select Goal Type:</label>
          <select id="category" name="category">
            <option value="Long-term">Long-term</option>
            <option value="Short-term">Short-term</option>
          </select><br>
          <div class="box-format">
            <label for="description">Enter Goal Description:</label>
            <input type="text" id="description" name="description" required><br>
          </div>
          <div class="box-format">
            <label for="currentAmount">Enter Current Amount:</label>
            <input type="number" id="currentAmount" name="currentAmount" required><br>
          </div>
          <div class="box-format">
            <label for="targetAmount">Enter Target Amount:</label>
            <input type="number" id="targetAmount" name="targetAmount" required><br>
          </div>
        </div>
        <div class="bottom-button">
          <button type="button" onclick="addGoalClick()">Add Goal</button>
        </div>
      </form>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", formHtml);
}

function addGoal() {
  const goalType = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const currentAmount = parseFloat(document.getElementById("currentAmount").value);
  const targetAmount = parseFloat(document.getElementById("targetAmount").value);

  if (!goalType || !description || isNaN(currentAmount) || isNaN(targetAmount)) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const newGoal = {
    "goalID": generateUniqueId(),
    "userID": 1,
    "goalType": goalType,
    "description": description,
    "targetAmount": targetAmount,
    "currentAmount": currentAmount,
    "startDate": getCurrentDate(),
    "endDate": calculateEndDate(goalType),
    "status": "Ongoing"
  };

  fetch('/getGoals')
    .then(response => response.json())
    .then(existingGoals => {
      existingGoals.push(newGoal);

      fetch('/updateGoals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goals: existingGoals }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data.message);
        loadPage('goals');
      })
      .catch(error => console.error('Error updating goals:', error));
    })
    .catch(error => console.error('Error fetching goals:', error));
  loadPage("goals");
}

function calculateEndDate(goalType) {
  const now = new Date();
  let endDate;

  if (goalType === 'Long-term') {
    const oneYearLater = new Date(now);
    oneYearLater.setFullYear(now.getFullYear() + 1);
    endDate = formatDate(oneYearLater);
  } else if (goalType === 'Short-term') {
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endDate = formatDate(lastDayOfMonth);
  }
  return endDate;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addGoalClick() {
  addGoal();
  loadPage("goals");
}