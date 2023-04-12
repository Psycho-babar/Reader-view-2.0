
/* global article, iframe, Prism, ready */
// function createPopup(){
//  var popupPath = browser.extension.getURL("popup/panel.html");
//   console.log(popupPath);
//  browser.browserAction.setPopup({
//    popup: popupPath
//  });
// }// function createPopup(){
//  var popupPath = browser.extension.getURL("popup/panel.html");
//   console.log(popupPath);
//  browser.browserAction.setPopup({
//    popup: popupPath
//  });
// }
'use strict';

const observe = () => {
  const link = article.doi;
  if (link) {
    fetch(link, {
      headers: {
        'Accept': 'application/vnd.citationstyles.csl+json'
      }
    }).then(r => r.json()).then(r => {
      if (r.indexed) {
        const date = r.indexed.timestamp;
        if (date) {
          const div = document.createElement('div');
          div.id = 'doi';
          const a = document.createElement('a');
          a.href = article.doi;
          a.target = '_blank';
          a.textContent = r.DOI;
          div.appendChild(document.createTextNode('DOI: '));
          div.appendChild(a);
          div.appendChild(document.createTextNode(', '));
          const more = document.createElement('a');
          more.href = '#';
          more.textContent = 'Show';
          const json = document.createElement('pre');
          more.onclick = e => {
            e.preventDefault();
            import('./prism/prism.js').then(() => {
              json.id = 'doi-json';
              const code = document.createElement('code');
              code.innerHTML = Prism.highlight(JSON.stringify(r, null, '  '), Prism.languages.json, 'json');
              json.appendChild(code);
              div.insertAdjacentElement('afterend', json);

              const style = document.createElement('link');
              style.href = 'plugins/doi/prism/prism.css';
              style.rel = 'stylesheet';
              iframe.contentDocument.head.appendChild(style);

              more.expanded = true;
              more.textContent = 'Hide';
              more.onclick = e => {
                e.preventDefault();
                e.stopPropagation();
                if (more.expanded) {
                  more.expanded = false;
                  more.textContent = 'Show';
                  json.classList.add('hidden');
                }
                else {
                  more.expanded = true;
                  more.textContent = 'Hide';
                  json.classList.remove('hidden');
                }
              };
            });
          };
          div.appendChild(more);
          div.appendChild(document.createTextNode(' Details'));

          iframe.contentDocument.getElementById('published-time').insertAdjacentElement('afterend', div);
        }
      }
    }).catch(e => {
      console.warn('DOI plug-in error', e);
    });
  }
};

function enable() {
  disable();
  ready().then(observe);
}
function disable() {
  try {
    document.getElementById('doi').remove();
  }
  catch (e) {}
}

export {
  enable,
  disable
};
