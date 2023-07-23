// In your background script (background.js)

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, newTab) {
    // Print the URL of the newly created tab
    console.log("New Tab URL:", changeInfo.url);
  
    // Get all tab details in the current window
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      const newUrl = changeInfo.url;
      console.log("New Tab URL:", newUrl);
  
      tabs.forEach(function(tab) {
        const tabId = tab.id;
        const tabUrl = tab.url;
        const tabTitle = tab.title;
        const tabFavIconUrl = tab.favIconUrl;
  
        console.log("Tab URL:", tabUrl, " New Tab URL:", newUrl);
        if (tabId !== newTab.id && tabUrl === newUrl) {
          console.log("Found a duplicate tab with URL:", tabUrl);
          chrome.tabs.update(tabId, { "active": true });
          chrome.tabs.remove(newTab.id);
        }
      });
    });
  });
  