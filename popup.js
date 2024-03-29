$(function(){
	
	//gets the existing value
	chrome.storage.sync.get(['total','goal'], function (items) {
		$('#total').text(items.total);
		$('#goal').text(items.goal);
	});
	
	$('#addAmount').click(function () {
		/*sync is going to take the value from other instances. so takes value from the cloud
		*/
		chrome.storage.sync.get(['total','goal'], function(items){
			var newTotal=0;
			if (items.total) {
				newTotal += parseInt(items.total);
			}
			
			var amount=$('#amount').val();
			if(amount){
			newTotal += parseInt(amount);
			}
			/*store the total and update the UI*/
		chrome.storage.sync.set({'total': newTotal});
		$('#total').text(newTotal);
		$('#amount').val('');
		
		if(newTotal >=items.goal){
			var opt={
					type:"basic",
					title:"goal reached!",
					message: "you reached your goal of "+items.goal +"!",
					iconUrl: "icon.png"
				}
				
				chrome.notifications.create('goalReached',opt,function() {});
		}
		});
	});
});