import renderNavBar from "./components/navbar.js"
import renderExpenses from "./components/pageExpenses.js"
import renderHome from "./components/pageHome.js"
import renderGoals from "./components/pageGoals.js"
import renderAchievements from "./components/pageAchievements.js"
import renderAddPurchase from "./components/addPurchase.js"
import renderAddGoal from "./components/addGoal.js"
import renderUpdateGoal from "./components/updateGoal.js"
import fadeInContent from "./utils/changePage.js"

export default function loadPage(currentPage = "home") {
  document.body.innerHTML = '';
  renderNavBar();
  
  switch (currentPage) {
    case "home": 
      renderHome();
      break;
    case "expenses":
      renderExpenses();
      break;
    case "goals":
      renderGoals();
      break;
    case "achievements":
      renderAchievements();
      break;
    case "addpurchase":
      renderAddPurchase();
      break;
    case "addgoal":
      renderAddGoal();
      break;
    case "updategoal":
      renderUpdateGoal();
      break;
    default:
      renderHome();
      break;
  }
  
  requestAnimationFrame(() => {
    fadeInContent();
  });
}

document.addEventListener('DOMContentLoaded', function() {
    loadPage();
});
