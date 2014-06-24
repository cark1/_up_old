
(function(){
	
	up.Border = Border;
	
	up.Border.DOTTED = "dotted";
	up.Border.DASHED = "dashed";
	up.Border.SOLID = "solid";
	up.Border.DOUBLE = "double";
	up.Border.GROOVE = "groove";
	up.Border.RIDGE = "ridge";
	up.Border.INSET = "inset";
	up.Border.OUTSET = "outset";
	
	function Border(_width, _color, _style){
		
		this.width = 0;
		this.color = new up.Color(0,0,0);
		this.style = up.Border.SOLID;
		
		if(_width!=null) this.width = _width;
		if(_color!=null) this.color = _color;
		if(_style!=null) this.style = _style;
		
	}//constructor
	
	
	Border.prototype.toCssString = function(){

		return this.width+"px "+" "+this.style+" "+this.color.toCssString();

	}//toCssString

})();