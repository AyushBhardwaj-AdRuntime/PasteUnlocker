chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Remove restrictions
      document.querySelectorAll('*').forEach(el => {
        el.onpaste = null;
        el.oncopy = null;
        el.oncut = null;
        el.onkeydown = null;
      });

      ['paste', 'copy', 'cut', 'keydown', 'keyup', 'keypress'].forEach(evt => {
        document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
      });

      const observer = new MutationObserver(() => {
        document.querySelectorAll('*').forEach(el => {
          el.onpaste = null;
          el.oncopy = null;
          el.oncut = null;
          el.onkeydown = null;
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });

      console.log("✅ Paste restriction removed!");
      alert("✅ Paste restriction removed! You can now paste.");
    }
  });
});
