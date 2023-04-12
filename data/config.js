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
// }

/* global defaults */
'use strict';

// iframe issue
if (window.top !== window) {
  chrome = top.chrome;
}

// do not load config when possible
if (typeof config === 'undefined') {
  const config = {
    callbacks: [], // will be called when prefs are ready,
    onChanged: []
  };
  window.config = config;

  config.prefs = defaults;

  chrome.storage.onChanged.addListener(prefs => {
    Object.keys(prefs).forEach(key => config.prefs[key] = prefs[key].newValue);
    config.onChanged.forEach(c => c(prefs));
  });

  chrome.storage.local.get(config.prefs, prefs => {
    Object.assign(config.prefs, prefs);
    config.ready = true;
    config.callbacks.forEach(c => c());
  });
  config.load = c => {
    if (config.ready) {
      c();
    }
    else {
      config.callbacks.push(c);
    }
  };
}

