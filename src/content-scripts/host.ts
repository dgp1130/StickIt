// Execute in IIFE to allow early return.
(() => {
  if (document.querySelector('body > #stickit-container')) {
    return; // Sticky note iframe already exits, don't do anything.
  }

  // Create a container to hold a sticky note.
  const container = document.createElement('aside');
  container.id = 'stickit-container';
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.right = '0';
  container.style.width = '400px';
  container.style.height = '400px';
  container.style.backgroundColor = 'yellow';
  container.style.zIndex = '1000'; // 1000 'ought to be enough for any page.

  // Create an iframe to link to load the Chrome extension content.
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('/index.html');
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.style.border = '0';
  container.appendChild(iframe);

  // Add the container to the document.
  document.body.appendChild(container);
})();

