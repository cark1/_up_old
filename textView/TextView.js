
(function(){
	
	up.TextView = TextView;
	up.extend(up.View , up.TextView);
	
	
	//align
    up.TextView.LEFT = "left";
    up.TextView.RIGHT = "right";
    up.TextView.CENTER = "center";
    up.TextView.JUSTIFY = "justify";
    
    up.TextView.NONE = "none";
    
	//decoration
    up.TextView.UNDERLINE = "underline";
    up.TextView.OVERLINE = "overline";
    up.TextView.LINE_THROUGH = "line-through";
    
	//transform
    up.TextView.CAPITALIZE = "capitalize";
    up.TextView.UPPERCASE = "uppercase";
    up.TextView.LOWERCASE = "lowercase"

	
	function TextView(_tag){
		
		if(_tag==null) _tag='p';
		
		up.View.prototype.constructor.call(this, _tag);
		
		this.text="";
		
		this.textColor = new up.Color(0,0,0);
		this.font = new up.Font();
        this.align = up.TextView.LEFT;
        this.decoration = up.TextView.NONE;
        this.transform = up.TextView.NONE;
		
		this.padding = new up.Padding();
	
	}//constructor
	
	
	TextView.prototype.setText = function(_text){
			
		this.text = _text;
		this.html.innerHTML = this.text;
			
	}//setText
	
	
	TextView.prototype.getText = function(){
		
		return this.text;
			
	}//getText

	
	TextView.prototype.setTextColor = function(_color){
			
		this.textColor = _color;
		this.html.style.color = this.textColor.toCssString();
			
	}//setTextColor
	
	
	TextView.prototype.setFont = function(_font){
		
		this.font = _font;
		this.html.style.font = this.font.toCssString();
		
	}//setFont
	
	
	TextView.prototype.setTextAlign = function(_type){
		
		this.align = _type;
		this.html.style.textAlign = this.align;
			
	}//setTextAlign
	
    
    TextView.prototype.setDecoration = function(_type){
			
		this.decoration = _type;
		this.html.style.textDecoration = this.decoration;
			
	}//setDecoration
    
    
    TextView.prototype.setTransform = function(_type){
			
		this.transform = _type;
		this.html.style.textTransform = this.transform;
			
	}//setTransform
	

	TextView.prototype.setPadding = function(_padding, _fixed){ 
		
		if(this.currentRatioH == null && this.parentView == null) return;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;
		
		_padding.top = _padding.top*ratioH;
		_padding.right = _padding.right*ratioW;
		_padding.bottom = _padding.bottom*ratioH;
		_padding.left = _padding.left*ratioW;
		
		this.padding = _padding;
		this.html.style.padding = this.padding.toCssString();
			
	}//setPadding


})();