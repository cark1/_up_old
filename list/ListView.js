
(function(){
	
	up.ListView = ListView;
	up.extend(up.View , up.ListView);


	function ListView(){
		
		up.View.prototype.constructor.call(this);
		
		this.itemViews = new Array();
		
	}//constructor
	
	
	//overridden
	ListView.prototype.doStyle = function(){
			
		up.View.prototype.doStyle.call(this);
		
		this.setBackgroundColor(new up.Color(255,255,255));
		this.setScrollable(false, true);

	}//doStyle
	
	
	//overridden
	ListView.prototype.doLayout = function(_parentLayout){
			
		up.View.prototype.doLayout.call(this, _parentLayout);

		var last = null;
		
		for(var i=0 ; i<this.itemViews.length ; i++){
			
			var itemView = this.itemViews[i];
			
			if(last != null){
				
				itemView.bottom(last);
				
			}
			
			last = itemView;
			
		}
		
	}//doLayout
	
	
	ListView.prototype.addItemView = function(_itemView){
		
		this.addView(_itemView);
		this.itemViews.push(_itemView);
			
	}//addItemView
	
	
	ListView.prototype.removeItemsView = function(){
			
		for(var i=0 ; i<this.itemViews.length ; i++){
			
			this.removeView(this.itemViews[i]);
			
		}
		
		this.itemViews = new Array();
			
	}//removeItems
	
	
})();