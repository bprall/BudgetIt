function createAchievement(description, progress) {
  var achievementContainer = document.createElement('div');
  achievementContainer.className = 'achievement-container';

  var trophyIcon = document.createElement('i');
  trophyIcon.className = 'fa-solid fa-trophy';

  var textBodies = document.createElement('div');
  textBodies.className = 'text-bodies';

  var achievementDescription = document.createElement('div');
  achievementDescription.className = 'achievement-description';
  achievementDescription.textContent = description;

  var achievementProgress = document.createElement('div');
  achievementProgress.className = 'achievement-progress';
  achievementProgress.textContent = 'Progress: ' + progress;

  textBodies.appendChild(achievementDescription);
  textBodies.appendChild(achievementProgress);

  achievementContainer.appendChild(trophyIcon);
  achievementContainer.appendChild(textBodies);

  return achievementContainer;
}

export default function renderAchievements() {
  var mainElement = document.createElement('main');
  
  var pageContainer = document.createElement('div');
  pageContainer.className = 'page-container hidden';

  var achievementsHeader = document.createElement('h3');
  achievementsHeader.className = 'achievement-header';
  achievementsHeader.textContent = 'ACHIEVEMENTS';

  pageContainer.appendChild(achievementsHeader);

  fetch('../initialstore.json')
    .then(response => response.json())
    .then(data => {
      const achievementCatalog = data.achievementCatalog || [];

      achievementCatalog.forEach(achievement => {
        const achievementsContainer = createAchievement(
          achievement.description,
          achievement.progress
        );

        pageContainer.appendChild(achievementsContainer);
      });
    });

  mainElement.appendChild(pageContainer);
  document.body.appendChild(mainElement);
}