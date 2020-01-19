import { Tabs, browser, WebNavigation } from 'webextension-polyfill-ts';

type Tab = Tabs.Tab;

export class Injector {
  constructor(private scripts: string[]) { }

  private injectedTabs = new Set<NonNullable<Tab['id']>>();

  public async onBrowserAction(tab: Tab) {
    // Don't inject into a page which has already been injected.
    if (!tab.id) throw new Error('Received tab with no ID');
    if (this.injectedTabs.has(tab.id)) return; // Already injected, do nothing.
    this.injectedTabs.add(tab.id);

    // Inject the given scripts into the page.
    await Promise.all(this.scripts.map((script) => browser.tabs.executeScript(tab.id, {
      file: script,
    })));
  }

  public onNavigation(details: WebNavigation.OnBeforeNavigateDetailsType) {
    // Page has navigated, no longer contains injected script.
    this.injectedTabs.delete(details.tabId);
  }
}
