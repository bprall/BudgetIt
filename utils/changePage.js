function removeHiddenClass(element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  }

  var children = element.children;
  for (var i = 0; i < children.length; i++) {
    removeHiddenClass(children[i]);
  }
}

export function getMonth() {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const d = new Date();
  return d.getMonth();
}

export default function fadeInContent() {
  var animatedDiv = document.querySelector('.page-container');

  if (!animatedDiv) {
    animatedDiv = document.querySelector('#andy-container');
  }

  removeHiddenClass(animatedDiv);
  animatedDiv.classList.add('visible');
}

