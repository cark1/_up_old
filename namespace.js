var up = {
	
	extend : function(parent, child){
		
		var extendedPrototype = function(){};
		extendedPrototype.prototype = parent.prototype;
		child.prototype = new extendedPrototype();
		child.prototype.constructor = child;
		
	},
	
	null : null
	
};