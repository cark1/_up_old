
(function(){

	up.ViewController = ViewController;
	
	function ViewController(){
		
		this.view = new up.View();
		
	}//constructor
	
	
	ViewController.prototype.onAppendView = function(){
		
		this.view.doLayout();
		this.view.doStyle();
			
	}//onAppendView
	
	
	ViewController.prototype.onRemoveView = function(){
			
	}//onRemoveView

})();