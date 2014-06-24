
(function(){
	
	up.ListController = ListController;
	up.extend(up.ViewController , up.ListController);

	function ListController(){
		
		up.ViewController.prototype.constructor.call(this);

		this.view = new up.ListView();
		
		this.data = new Array();
		this.adapter = null;
		
	}//constructor
	
	
	ListController.prototype.setListAdapter = function(_adapter){
			
		this.adapter = _adapter;
			
	}//setListAdapter
	
	
	ListController.prototype.loadData = function(_data){
		
		this.data = _data;
		
		this.view.removeItemsView();
		
		for(var i=0 ; i<this.data.length ; i++){
			
			var itemView = this.adapter.createItem(this.data[i], i, this.view);
			itemView.id = i;
			this.view.addItemView(itemView);
			
		}
			
	}//loadData
	

})();