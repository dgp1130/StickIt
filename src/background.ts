// Listen for the extension icon button to be clicked.
chrome.browserAction.onClicked.addListener((tab) => {
  // Inject the host script.
  chrome.tabs.executeScript(tab.id, {
    file: 'content-scripts/host.js',
  });

  // Also include Webpack runtime to initialize the script.
  chrome.tabs.executeScript(tab.id, {
    file: 'runtime.js',
  });
});
