
(function(){

	up.Shadow = Shadow;
	
	function Shadow(_hShadow, _vShadow, _blur, _spread, _color, _inset){
		
		this.hShadow = 0;
		this.vShadow = 0;
		this.blur = 0;
		this.spread = 0;
		this.color = new up.Color(255,255,255);
		this.inset = "";
		
		if(_hShadow!=null) this.hShadow = _hShadow;
		if(_vShadow!=null) this.vShadow = _vShadow;
		if(_blur!=null) this.blur = _blur;
		if(_spread!=null) this.spread = _spread;
		if(_color!=null) this.color = _color;
		if(_inset!=null && _inset==true) this.inset = "inset";
		
	}//constructor
	
	
	Shadow.prototype.toCssString = function(){
			
		return this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color.toCssString()+" "+this.inset;
			
	}//toCssString

})();