
(function(){

	up.BorderRadius = BorderRadius;
	
	function BorderRadius(topLeft,topRight,bottomRight,bottomLeft){
		
		//horizontal
		this.topLeftH = 0;
		this.topRightH = 0;
		this.bottomRightH = 0;
		this.bottomLeftH = 0;
		
		//vertical
		this.topLeftV = 0;
		this.topRightV = 0;
		this.bottomRightV = 0;
		this.bottomLeftV = 0;
			
		if(topLeft!=null && topRight==null && bottomRight==null && bottomLeft==null){
			
			this.topLeftH = topLeft
			this.topRightH = topLeft;
			this.bottomRightH = topLeft;
			this.bottomLeftH = topLeft;
			
			this.topLeftV = topLeft
			this.topRightV = topLeft;
			this.bottomRightV = topLeft;
			this.bottomLeftV = topLeft;
			
		}else if(topLeft!=null && topRight!=null && bottomRight!=null && bottomLeft!=null){
			
			this.topLeftH = topLeft
			this.topRightH = topRight;
			this.bottomRightH = bottomRight;
			this.bottomLeftH = bottomLeft;
			
			this.topLeftV = topLeft
			this.topRightV = topRight;
			this.bottomRightV = bottomRight;
			this.bottomLeftV = bottomLeft;
			
		}
		
	}//constructor
	
	
	BorderRadius.prototype.toCssString = function(){

		return this.topLeftH+'px '+this.topRightH+'px '+this.bottomRightH+'px '+this.bottomLeftH+'px'+' / '+this.topLeftV+'px '+this.topRightV+'px '+this.bottomRightV+'px '+this.bottomLeftV+'px'

	}//toCssString

})();