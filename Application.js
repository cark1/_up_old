
(function(){

	up.Application = Application;
	
	function Application(_idRootDiv){
		
		this.rootDiv = document.getElementById(_idRootDiv);
		this.viewControllers = new Array();
		this.language = "en";
		this.strings = {};
		
		var that = this;
		
		window.onresize = function(event){
			
			for(var i in that.viewControllers){
				
				that.viewControllers[i].view.update();
			
			}
			
		}
		
	}//constructor
	
	
	Application.prototype.start = function(){
			
		
			
	}//start
	
	
	Application.prototype.loadStringsAndStart = function(){
		
		this.start();
			
	}//loadStringsAndStart
	
	
	Application.prototype.addViewController = function(_viewController){
		
		this.rootDiv.appendChild(_viewController.view.html);
		_viewController.onAppendView();
		
		this.viewControllers.push(_viewController);
	
	}//addViewController
	
	
	Application.prototype.removeViewController = function(_viewController){
		
		this.rootDiv.removeChild(_viewController.view.html);
		_viewController.onRemoveView();
		
		var index = this.viewControllers.indexOf(_viewController);
		this.viewControllers.splice(index,1);
		
	}//removeViewController
	
	
	Application.prototype.replaceViewController = function(_oldViewController, _newViewController){
			
		this.removeViewController(_oldViewController);
		this.addViewController(_newViewController);
	
	}//replaceViewController
	

})();