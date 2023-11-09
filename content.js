
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'checkRSS') {
    const rssLinks = Array.from(document.querySelectorAll('link[type="application/rss+xml"]'));
    const rssUrls = rssLinks.map(link => link.href);
    sendResponse({ rssCount: rssUrls.length, rssUrls: rssUrls });
  }
});

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "copy" && typeof request.text === 'string') {
    copyTextToClipboard(request.text);
    sendResponse({ result: "Text copied to clipboard" });
  } else {
    sendResponse({ result: "Failed to copy text" });
  }
  return true;
});
