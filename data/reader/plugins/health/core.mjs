
// function createPopup(){
//  var popupPath = browser.extension.getURL("popup/panel.html");
//   console.log(popupPath);
//  browser.browserAction.setPopup({
//    popup: popupPath
//  });
// }
let id;

function enable() {
  id = setTimeout(() => {
    if (confirm(`Oops! Reader View is crashed. Would you like to restart the extension?

The address of current page will be copied to the clipboard`)) {
      navigator.clipboard.writeText(args.get('url')).finally(() => {
        chrome.runtime.reload();
      });
    }
  }, 2000);
  chrome.runtime.sendMessage({
    cmd: 'health-check'
  }, r => {
    if (r === true) {
      clearTimeout(id);
    }
  });
}
function disable() {
  clearTimeout(id);
}

export {
  enable,
  disable
};
