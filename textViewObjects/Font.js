
(function(){
	
	up.Font = Font;
    
    up.Font.NORMAL = "normal";
    up.Font.ITALIC = "italic";
    up.Font.OBLIQUE = "oblique";
    
    up.Font.BOLD = "bold";
    
    up.Font.SMALL_CAPS = "small-caps";
	
	function Font(_family, _size, _lineHeight, _style, _weight, _variant){
		
		this.family = "Arial";
		this.size = 12;
		this.lineHeight = 12;
		this.style = up.Font.NORMAL;
        this.variant = up.Font.NORMAL;
        this.weight = up.Font.NORMAL;
		
		if(_family!=null) this.family = _family;
		if(_size!=null) this.size = _size;
		if(_lineHeight!=null) this.lineHeight = _lineHeight;
		else this.lineHeight = this.size;
		if(_style!=null) this.style = _style;
        if(_weight!=null) this.weight = _weight;
        if(_variant!=null) this.variant = _variant;
		
	}//constructor
	
	
	Font.prototype.toCssString = function(){

		return this.style+' '+this.variant+' '+this.weight+' '+this.size+'px/'+this.lineHeight+'px '+this.family+' ';

	}//toCssString
    
    
    Font.loadFont = function(_name, _url){
	
		var fontFace = 
		"@font-face {"+
			"font-family: '"+_name+"';"+
			"src: url('"+_url+"/"+_name+".eot'); /* IE9 Compat Modes */"+
			"src: url('"+_url+"/"+_name+".eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */"+
			     "url('"+_url+"/"+_name+".woff') format('woff'), /* Modern Browsers */"+
			     "url('"+_url+"/"+_name+".ttf')  format('truetype'), /* Safari, Android, iOS */"+
			     "url('"+_url+"/"+_name+".svg#"+_name+"') format('svg'); /* Legacy iOS */"+
			"}";
        
		var styleNode = document.createElement('style');
        styleNode.type = "text/css";
        
        if(styleNode.styleSheet){
            styleNode.styleSheet.cssText = fontFace;
        }else{
            styleNode.appendChild(document.createTextNode(fontFace));
        }
        
        document.head.appendChild(styleNode);

	}//loadFont

})();