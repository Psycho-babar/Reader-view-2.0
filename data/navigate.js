// function createPopup(){
//  var popupPath = browser.extension.getURL("popup/panel.html");
//   console.log(popupPath);
//  browser.browserAction.setPopup({
//    popup: popupPath
//  });
// }
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
// function createPopup(){
//  var popupPath = browser.extension.getURL("popup/panel.html");
//   console.log(popupPath);
//  browser.browserAction.setPopup({
//    popup: popupPath
//  });
// }
document.addEventListener('DOMContentLoaded', () => {
  const next = () => setTimeout(() => chrome.runtime.sendMessage({
    cmd: 'switch-to-reader-view',
    type: 'auto-navigate'
  }), 0);

  const navEntries = performance.getEntriesByType('navigation');
  if (navEntries && navEntries[0] && navEntries[0].type === 'back_forward') {
    return console.info('auto navigation is skipped due to back or forward navigation');
  }

  chrome.storage.local.get({
    'auto-rules': []
  }, prefs => {
    for (const rule of prefs['auto-rules']) {
      if (rule.startsWith('r:')) {
        try {
          const r = new RegExp(rule.substr(2), 'i');
          if (r.test(location.href)) {
            next();
            break;
          }
        }
        catch (e) {
          console.warn('Cannot create regexp from', rule);
          return '';
        }
      }
      else {
        if (location.hostname === rule) {
          next();
          break;
        }
      }
    }
  });
});
