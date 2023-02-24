import './components/Footer';

function clearTarget() {
  let list = document.getElementById('icons');
  list.querySelectorAll('li').forEach((item) => {
    item.className = '';
  });
}

document.getElementById('icons').onclick = (e) => {
  if (e.target.tagName != 'I') {
    return;
  } else {
    clearTarget();
    e.target.closest('li').className = 'icon_target';
  }
};
