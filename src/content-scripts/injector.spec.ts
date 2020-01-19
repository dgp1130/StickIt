import { Injector } from './injector';
import { Tabs, browser } from 'webextension-polyfill-ts';

describe('Injector', () => {
  it('injects the given scripts on browser action', async () => {
    spyOn(browser.tabs, 'executeScript').and.returnValues(
      Promise.resolve([]),
      Promise.resolve([]),
    );

    const injector = new Injector(['foo.js', 'bar.js']);

    await injector.onBrowserAction({
      id: 0,
    } as Tabs.Tab);

    expect(browser.tabs.executeScript).toHaveBeenCalledTimes(2);
    expect(browser.tabs.executeScript).toHaveBeenCalledWith(0, {
      files: 'foo.js',
    });
    expect(browser.tabs.executeScript).toHaveBeenCalledWith(0, {
      files: 'bar.js',
    });
  });
});
