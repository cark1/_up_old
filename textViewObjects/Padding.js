
(function(){

	up.Padding = Padding;
	
	function Padding(_top, _right, _bottom, _left){
		
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
		this.left = 0;
		
        if(_top!=null && _right==null && _bottom==null && _left==null){
        
            this.top = _top;
            this.right = _top;
            this.bottom = _top;
            this.left = _top;
            
        }else if(_top!=null && _right!=null && _bottom==null && _left==null){
        
            this.top = _top;
            this.right = _right;
            this.bottom = _top;
            this.left = _right;
            
        }else if(_top!=null && _right!=null && _bottom!=null && _left!=null){
        
            this.top = _top;
            this.right = _right;
            this.bottom = _bottom;
            this.left = _left;
        }
		
	}//constructor
	
	
	Padding.prototype.toCssString = function(){

		return this.top+"px "+this.right+"px "+this.bottom+"px "+this.left+"px";

	}//toCssString

})();