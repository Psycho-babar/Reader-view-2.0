

let container;

function enable() {
  container = document.createElement('div');
  container.classList.add('notify');
  document.body.appendChild(container);
  window.notify = (e, type = 'info', delay = 3000) => {
    const div = document.createElement('div');
    div.textContent = e.message || e;
    div.classList.add(type);
    container.appendChild(div);
    setTimeout(() => div.remove(), delay);
  };
}
function disable() {
  try {
    container.remove();
  }
  catch (e) {}
  delete window.notify;
}

export {
  enable,
  disable
};
