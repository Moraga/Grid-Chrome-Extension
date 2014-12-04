var act = [], pos;

chrome.browserAction.onClicked.addListener(function (tab) {
	pos = act.indexOf(tab.id);
	
	if (pos == -1) {
		act.push(tab.id);
		chrome.tabs.sendMessage(tab.id, {text: 'set'});
	}
	else {
		act.splice(pos, 1);
		chrome.tabs.sendMessage(tab.id, {text: 'del'});
	}
});