var menuItem={
"id":"addCalories",
"title":"Add Calories",
"contexts":["selection"]
}
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId == "addCalories" && clickData.selectionText){
		var intRegex = /^\d+$/;
		if (intRegex.test(clickData.selectionText)){
				chrome.storage.sync.get('total',function(items){
					var newTotal=0;
					if(items.total){
						newTotal +=parseInt(items.total);
					}
					newTotal +=parseInt(clickData.selectionText);
					chrome.storage.sync.set({'total':newTotal});
				});
		}
	}
});


chrome.storage.onChanged.addListener(function(changes){
	chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString() });
});