import { browser } from 'webextension-polyfill-ts';
import { Injector } from 'src/content-scripts/injector';

const injector = new Injector(['content-scripts/host.js', 'runtime.js']);

// Listen for the extension icon button to be clicked.
browser.browserAction.onClicked.addListener(async (tab) => {
  await injector.onBrowserAction(tab);
});

// Remove the tab from the injected list when the user navigates and loses the
// host script.
browser.webNavigation.onBeforeNavigate.addListener((details) => {
  injector.onNavigation(details);
});
