$(function(){
	
	//gets the existing value
	chrome.storage.sync.get('goal', function (items) {
		$('#goal').val(items.goal);
	});
	
	$('#save').click(function () {
		var goal=$('#goal').val();
		if(goal){
			chrome.storage.sync.set({'goal':goal},function (){
				close();
			});
		}
	});
	
	$('#reset').click(function () {
			chrome.storage.sync.set({'total':0},function (){
				var opt={
					type:"basic",
					title:"total Reset!",
					message: "total has been reset",
					iconUrl: "icon.png"
				}
				
				chrome.notifications.create('reset',opt,function() {});
			});
	});
});