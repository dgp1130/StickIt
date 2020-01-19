const injectedTabs = new Set<number>();

// Listen for the extension icon button to be clicked.
chrome.browserAction.onClicked.addListener((tab) => {
  // Don't inject into a page which has already been injected.
  if (!tab.id) throw new Error('Received tab with no ID');
  if (injectedTabs.has(tab.id)) return;
  injectedTabs.add(tab.id);

  // Inject the host script.
  chrome.tabs.executeScript(tab.id, {
    file: 'content-scripts/host.js',
  });

  // Also include Webpack runtime to initialize the script.
  chrome.tabs.executeScript(tab.id, {
    file: 'runtime.js',
  });
});

// Remove the tab from the injected list when the user navigates and loses the
// host script.
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  injectedTabs.delete(details.tabId);
});
