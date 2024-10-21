let container = null;
let iframe = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleUI') {
    toggleUI();
  }
});



function toggleUI() {
  if (container) {
    container.remove();
    container = null;
    iframe = null;
  } else {
    container = document.createElement('div');
    container.id = 'extension-container';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.zIndex = '10000';
    container.style.backgroundColor = 'white';
    container.style.padding = '10px';
    container.style.border = '1px solid #ccc';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('inject.html');
    iframe.style.width = '300px';
    iframe.style.height = '200px';
    iframe.style.border = 'none';

    container.appendChild(iframe);
    document.body.appendChild(container);
  }
}


toggleUI();