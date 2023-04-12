
/* global links, config */

'use strict';

const tips = [{
  message: 'By <a data-href="faq23" target=_blank>selecting the actual content or part of it</a> before switching to the reader view, you can prevent unwanted content from cluttering your view. This is also useful if the automatic selection module fails to detect the correct content.'
}, {
  message: 'This page contains cross-origin images that Reader View cannot access. You can <a href="#" data-cmd="image-permission">click here</a> to grant this access.',
  hidden: true,
  save: false
}, {
  message: 'If you prefer "Reader View" to display the "favicon" of websites, <a href="#" data-cmd="favicon-permission">click here</a> to grant permission.',
  hidden: true,
  save: false
}];
window.tips = tips;

tips.show = (i, forced = false) => {
  chrome.storage.local.get({
    ['tip.' + i]: localStorage.getItem('tip.' + i)
  }, prefs => {
    if (prefs['tip.' + i] !== 's' || forced) {
      const t = document.querySelector('#tips template');
      const clone = document.importNode(t.content, true);
      clone.querySelector('div').dataset.id = i;

      const p = new DOMParser();
      const d = p.parseFromString(tips[i].message, 'text/html');
      for (const c of [...d.body.childNodes]) {
        clone.querySelector('span').appendChild(c);
      }

      clone.querySelector('input').addEventListener('click', e => {
        const div = e.target.closest('div');
        chrome.storage.local.set({
          ['tip.' + div.dataset.id]: 's'
        });
        div.remove();
        if (document.querySelector('#tips > div') === null) {
          document.body.dataset.tips = false;
        }
      });

      document.getElementById('tips').appendChild(clone);
      document.body.dataset.tips = true;

      if (tips[i].save !== false) {
        chrome.storage.local.set({
          ['tip.' + i]: 's'
        });
      }
      links();
    }
  });
};

const permission = e => {
  if (e.target.dataset.cmd === 'favicon-permission') {
    chrome.permissions.request({
      permissions: ['favicon']
    }, granted => {
      if (granted) {
        chrome.storage.local.set({
          'ask-for-favicon': false
        }, () => location.reload());
      }
    });
  }
  else if (e.target.dataset.cmd === 'image-permission') {
    chrome.permissions.request({
      origins: ['*://*/*']
    }, granted => {
      if (granted) {
        location.reload();
      }
    });
  }
};

function enable() {
  document.addEventListener('click', permission);
  // favicon
  chrome.permissions.contains({
    permissions: ['favicon']
  }, granted => {
    if (config.prefs['ask-for-favicon'] && granted !== true) {
      tips[2].hidden = false;
    }

    for (let i = 0; i < tips.length; i += 1) {
      if (tips[i].hidden === true) {
        continue;
      }
      tips.show(i);
    }
  });
}
function disable() {
  document.removeEventListener('click', permission);
}

export {
  enable,
  disable
};
