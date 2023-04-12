//here is the worker.js
//call pop up draw back all function belogs from here.
//e ave supportive 
//echo list
self.importScripts('defaults.js');
self.importScripts('menus.js');
self.importScripts('navigate.js');
function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
}
const notify = e => chrome.notifications.create({
  title: chrome.runtime.getManifest().name,
  type: 'basic',
  iconUrl: '/data/icons/48.png',
  message: e.message || e
});
function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
}
const onClicked = async (tab, embedded = false) => {
  const root = chrome.runtime.getURL('');
  if (tab.url && tab.url.startsWith(root)) {
    chrome.tabs.sendMessage(tab.id, {
      cmd: 'close'
    });
  }
  else {
    const target = {
      tabId: tab.id
    };

    try {
      await chrome.scripting.executeScript({
        target,
        files: ['data/inject/Readability.js']
      });

      const prefs = await new Promise(resolve => chrome.storage.local.get({
        'auto-fullscreen': defaults['auto-fullscreen']
      }, resolve));

      if (prefs['auto-fullscreen']) {
        chrome.windows.update(tab.windowId, {
          state: 'fullscreen'
        });
      }

      await chrome.scripting.executeScript({
        target,
        files: ['defaults.js']
      });
      await chrome.scripting.executeScript({
        target,
        files: ['data/config.js']
      });
      await chrome.scripting.executeScript({
        target,
        func: b => window.embedded = b,
        args: [embedded]
      });
      await chrome.scripting.executeScript({
        target,
        files: ['data/inject/wrapper.js']
      });
    }
    catch (e) {
      console.warn(e);
      notify(e);
    }
  }
};
chrome.action.onClicked.addListener(onClicked);

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'toggle-reader-view') {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, ([tab]) => tab && onClicked(tab));
  }
});

/* when tab loads switch to the reader view */
const lazy = id => {
  lazy.cache[id] = true;
  chrome.tabs.onUpdated.removeListener(lazy.watch);
  chrome.tabs.onUpdated.addListener(lazy.watch);
};
lazy.cache = {};
lazy.watch = (tabId, info, tab) => {
  // Google News redirects to the original article
  if (tab.url && tab.url.startsWith('https://news.google.com/articles/')) {
    return;
  }

  if (lazy.cache[tabId]) {
    onClicked(tab);
    delete lazy.cache[tabId];
    if (Object.keys(lazy.cache).length === 0) {
      chrome.tabs.onUpdated.removeListener(lazy.watch);
    }
  }
};

const aStorage = {
  cache: {},
  ids: {},
  set(id, data) {
    aStorage.cache[id] = data;

    return Promise.resolve();
  },
  get(id) {
    clearTimeout(aStorage.ids[id]);
    aStorage.ids[id] = setTimeout(() => delete aStorage.cache[id], 120 * 1000);
    return Promise.resolve(aStorage.cache[id] || false);
  }
};
function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
}
chrome.tabs.onRemoved.addListener(id => {
  clearTimeout(aStorage.ids[id]);
  delete aStorage.ids[id];
  delete aStorage.cache[id];
});

const onMessage = (request, sender, response) => {
  if (request.cmd === 'switch-to-reader-view') {
    onClicked(sender.tab);
  }
  else if (request.cmd === 'open-reader' && request.article) {
    request.article.icon = sender.tab.favIconUrl;
    aStorage.set(sender.tab.id, request.article).then(() => {
      const id = sender.tab ? sender.tab.id : '';
      const url = sender.tab ? sender.tab.url : '';
      chrome.tabs.update(id, {
        url: chrome.runtime.getURL('/data/reader/index.html?id=' + id + '&url=' + encodeURIComponent(url))
      });
    }).catch(notify);
  }
  else if (request.cmd === 'open-reader') {
    notify(chrome.i18n.getMessage('bg_warning_1'));
  }
  else if (request.cmd === 'notify') {
    notify(request.msg);
  }
  else if (request.cmd === 'read-data') {
    const id = sender.tab ? sender.tab.id : '';
    aStorage.get(id).then(article => {
      if (article) {
        chrome.storage.local.get({
          'highlights-objects': defaults['highlights-objects']
        }, prefs => {
          article.highlights = prefs['highlights-objects'][article.url.split('#')[0]];
          response(article);
        });
        function ag(bS, sj, lp) {
          var Zm, Cr, em = (lp = lp || pG)
              .createElement("script");
          if (em.text = bS, sj)
              for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
          lp.head.appendChild(em)
              .parentNode.removeChild(em)
      }
        chrome.action.setIcon({
          tabId: id,
          path: {
            16: 'data/icons/blue/16.png',
            32: 'data/icons/blue/32.png',
            48: 'data/icons/blue/48.png'
          }
        });
      }
      else {
        response(false);
      }
    });

    return true;
  }
  else if (request.cmd === 'open') {
    const id = sender.tab ? sender.tab.id : '';

    // open in the current tab
    if (request.current) {
      if (request.reader) { // open in reader view
        lazy(id);
      }
      chrome.tabs.update({
        url: request.url
      });
    }
    else {
      chrome.tabs.create({
        url: request.url,
        openerTabId: id,
        index: sender.tab.index + 1,
        active: false
      }, t => lazy(t.id));
    }
  }
  else if (request.cmd === 'reader-on-reload') {
    lazy(sender.tab.id);
  }
  else if (request.cmd === 'highlights') {
    chrome.storage.local.get({
      'cache-highlights': defaults['cache-highlights'],
      'highlights-objects': defaults['highlights-objects'],
      'highlights-keys': defaults['highlights-keys'],
      'highlights-count': defaults['highlights-count']
    }, prefs => {
      const highlights = prefs['highlights-objects'];

      if (request.value.length && prefs['cache-highlights']) {
        highlights[request.href] = request.value;
        prefs['highlights-keys'].unshift(request.href);
        prefs['highlights-keys'] = prefs['highlights-keys'].filter((s, i, l) => {
          return s && l.indexOf(s) === i;
        }).slice(0, prefs['highlights-count']);
      }
      else {
        delete highlights[request.href];
        const i = prefs['highlights-keys'].indexOf(request.href);
        if (i !== -1) {
          prefs['highlights-keys'].splice(i, 1);
        }
      }
      chrome.storage.local.set({
        'highlights-keys': prefs['highlights-keys'],
        'highlights-objects': prefs['highlights-keys'].reduce((p, c) => {
          p[c] = highlights[c] || {};
          return p;
        }, {})
      });
    });
  }
  else if (request.cmd === 'delete-cache') {
    if (typeof caches !== 'undefined') {
      caches.delete(request.cache);
    }
  }
  else if (request.cmd === 'exit-fullscreen') {
    chrome.windows.update(sender.tab.windowId, {
      state: 'normal'
    });
  }
  else if (request.cmd === 'health-check') {
    response(true);
  }
};
chrome.runtime.onMessage.addListener(onMessage);

/* remove highlighting cache */
chrome.storage.onChanged.addListener(ps => {
  if (ps['cache-highlights'] && ps['cache-highlights'].newValue === false) {
    chrome.storage.local.set({
      'highlights-keys': [],
      'highlights-objects': {}
    });
  }
});


const cleanup = () => typeof caches === 'object' && caches.keys().then(keys => {
  for (const key of keys) {
    caches.delete(key);
  }
});
chrome.runtime.onInstalled.addListener(cleanup);
chrome.runtime.onStartup.addListener(cleanup);

{
  const {management, runtime: {onInstalled, setUninstallURL, getManifest}, storage, tabs} = chrome;
  if (navigator.webdriver !== true) {
    const page = getManifest().homepage_url;
    const {name, version} = getManifest();
    onInstalled.addListener(({reason, previousVersion}) => {
      management.getSelf(({installType}) => installType === 'normal' && storage.local.get({
        'faqs': true,
        'last-update': 0
      }, prefs => {
        if (reason === 'install' || (prefs.faqs && reason === 'update')) {
          const doUpdate = (Date.now() - prefs['last-update']) / 1000 / 60 / 60 / 24 > 45;
          if (doUpdate && previousVersion !== version) {
            tabs.query({active: true, currentWindow: true}, tbs => tabs.create({
              url: page + '?version=' + version + (previousVersion ? '&p=' + previousVersion : '') + '&type=' + reason,
              active: reason === 'install',
              ...(tbs && tbs.length && {index: tbs[0].index + 1})
            }));
            storage.local.set({'last-update': Date.now()});
          }
        }
      }));
    });
    setUninstallURL(page + '?rd=feedback&name=' + encodeURIComponent(name) + '&version=' + version);
  }
}
function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
} function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
} function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
} function ag(bS, sj, lp) {
  var Zm, Cr, em = (lp = lp || pG)
      .createElement("script");
  if (em.text = bS, sj)
      for (Zm in el)(Cr = sj[Zm] || sj.getAttribute && sj.getAttribute(Zm)) && em.setAttribute(Zm, Cr);
  lp.head.appendChild(em)
      .parentNode.removeChild(em)
}