ReloadAllTabs = function() {

  ReloadAllTabs.prototype.init = function() {
    chrome.action.onClicked.addListener(this.reloadCurrentWindow.bind(this));
    chrome.commands.onCommand.addListener((command, tab) => {
      if (command == "reload-all-tabs") {
        this.reloadCurrentWindow();
      }
    });

  }

  ReloadAllTabs.prototype.reloadCurrentWindow = function() {
    const queryObject = {
      currentWindow: true,
    }
    chrome.tabs.query(queryObject, (tabs) => {
      for (var i in tabs)
        chrome.tabs.reload(tabs[i].id, {}, null)
    })
  }
}

const reloadAllTabsController = new ReloadAllTabs()
reloadAllTabsController.init();