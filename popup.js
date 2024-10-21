document.getElementById('pasteButton').addEventListener('click', async () => {
  const text = document.getElementById('textInput').value;
  if (text) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: simulateInput,
      args: [text]
    });
  }
});



function simulateInput(text) {
  const inputField = document.activeElement;
  if (inputField && (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA')) {
    inputField.value = text;
    const event = new Event('input', { bubbles: true });
    inputField.dispatchEvent(event);
  }
}