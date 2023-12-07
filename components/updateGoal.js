import loadPage from "../index.js";

export default function renderUpdateGoal() {
  fetch('../initialstore.json')
    .then(response => response.json())
    .then(data => {
      const ongoingGoals = data.goals.filter(goal => goal.status === "Ongoing");

      const optionsHtml = ongoingGoals.map(goal => `<option value="${goal.description}">${goal.description}</option>`).join('');

      const formHtml = `
        <div id="updateGoalPage">
          <form id="updateGoalForm">
            <div class="inputs">
              <label for="category">Select Goal:</label>
              <select id="category" name="category">
                ${optionsHtml}
              </select><br>
              <label for="amount">Enter Progress:</label>
              <input type="number" id="amount" name="amount" required><br>
            </div>
            <div class="bottom-button">
              <button type="button" onclick="updateGoalClick()">Update Goal</button>
            </div>    
          </form>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', formHtml);
    })
    .catch(error => console.error('Error fetching initialstore.json:', error));
}

function updateGoal() {
  const selectedGoalDescription = document.getElementById('category').value;
  const progressAmount = parseFloat(document.getElementById('amount').value);

  if (isNaN(progressAmount) || progressAmount < 0) {
    alert('Please enter a valid progress amount.');
    return;
  }

  fetch('../initialstore.json')
    .then(response => response.json())
    .then(data => {
      const selectedGoal = data.goals.find(goal => goal.description === selectedGoalDescription);

      if (selectedGoal) {
        selectedGoal.currentAmount += progressAmount;

        fetch('../initialstore.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(() => {
          alert('Goal updated successfully.');
          loadPage("goals");
        })
        .catch(error => console.error('Error updating initialstore.json:', error));
      } else {
        alert('Selected goal not found.');
      }
    })
    .catch(error => console.error('Error fetching initialstore.json:', error));
  loadPage("goals");
}

function updateGoalClick() {
  updateGoal();
  loadPage("goals");
}