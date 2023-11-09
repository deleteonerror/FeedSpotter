chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {
      chrome.tabs.sendMessage(tabId, { action: 'checkRSS' }, function(response) {
       if (response && response.rssCount > 0) {
          chrome.action.setIcon({
            path: {
              "16": "images/icon16.png",
              "48": "images/icon48.png",
              "128": "images/icon128.png"
            },
            tabId: tabId,
          });

          currentRSSUrl[tabId] = response.rssUrls[0];
        } else {
          chrome.action.setIcon({
            path: {
              "16": "images/icon16_gray.png",
              "48": "images/icon48_gray.png",
              "128": "images/icon128_gray.png"
            },
            tabId: tabId,
          });
          currentRSSUrl[tabId] = '';
        }
      });
    }
  });
});

chrome.action.onClicked.addListener(function(tab) {
  const url = currentRSSUrl[tab.id];
  if (url) {
    chrome.tabs.sendMessage(tab.id, { action: "copy", text: url }, function(response) {
      console.log('Background: Sent the copy message', response?.result);
    });
  }
  // } else {
  //   console.error('No RSS feed URL found.');
  // }
});


const currentRSSUrl = {};
