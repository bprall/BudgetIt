import loadPage from "../index.js"

export default function renderNavBar() {
  var nav = document.createElement('nav');
  
  // Button 1
  var button1 = document.createElement('button');
  button1.className = 'nav-button radius-left';
  button1.innerHTML = '<i class="fa-solid fa-money-bill-trend-up"></i>';
  button1.onclick = function() {
    loadPage('home');
  };
  nav.appendChild(button1);

  // Button 2
  var button2 = document.createElement('button');
  button2.className = 'nav-button';
  button2.innerHTML = '<i class="fa-solid fa-chart-pie"></i>';
  button2.onclick = function() {
    loadPage('expenses');
  };
  nav.appendChild(button2);

  // Button 3
  var button3 = document.createElement('button');
  button3.className = 'nav-button';
  button3.innerHTML = '<i class="fa-solid fa-bullseye"></i>';
  button3.onclick = function() {
    loadPage('goals');
  };
  nav.appendChild(button3);

  // Button 4
  var button4 = document.createElement('button');
  button4.className = 'nav-button radius-right';
  button4.innerHTML = '<i class="fa-solid fa-trophy"></i>';
  button4.onclick = function() {
    loadPage('achievements');
  };
  nav.appendChild(button4);

  document.body.appendChild(nav);
}