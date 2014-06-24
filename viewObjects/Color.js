
(function(){
	
	up.Color = Color;
	
	function Color(_red, _green, _blue, _alpha){
		
		this.red = 255;
		this.green = 255;
		this.blue = 255;
		this.alpha = 1;
		
		if(_red!=null) this.red = _red;
		if(_green!=null) this.green = _green;
		if(_blue!=null) this.blue = _blue;
		if(_alpha!=null) this.alpha = _alpha;
		
	}//constructor
	
	
	Color.prototype.toCssString = function(){

		return 'rgba('+this.red+','+this.green+','+this.blue+','+this.alpha+')';

	}//toCssString

})();