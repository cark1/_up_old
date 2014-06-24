
(function(){
	
	up.Rect = Rect;
	
	function Rect(_x, _y, _width, _height){
		
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		
		if(_x!=null) this.x = _x;
		if(_y!=null) this.y = _y;
		if(_width!=null) this.width = _width;
		if(_height!=null) this.height = _height;
		
	}//constructor

})();