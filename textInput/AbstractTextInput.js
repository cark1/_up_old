
(function(){
	
	up.AbstractTextInput = AbstractTextInput;
	up.extend(up.TextView , up.AbstractTextInput);
	
	function AbstractTextInput(_tag){
		
		up.TextView.prototype.constructor.call(this, _tag);
		
		this.addEventListener('input',this,'updateTextOnInput');
		this.addEventListener('focus',this,'hidePlaceholder');
		this.addEventListener('blur',this,'showPlaceholder');
		
		this.placeholder = "";
		this.placeholderColor = new up.Color(150,150,150);
		
	}//constructor
	
	
	AbstractTextInput.prototype.updateTextOnInput = function(){
			
		this.text = this.html.value;
		
	}//updateTextOnInput
	
	
	AbstractTextInput.prototype.setText = function(_text){
			
		this.text = _text;
		this.html.value = this.text;
		
		this.hidePlaceholder();
			
	}//setText
	
	
	AbstractTextInput.prototype.getText = function(){
		
		return this.text;
			
	}//getText
	
	
	AbstractTextInput.prototype.setPlaceholder = function(_placeholder){
			
		this.placeholder = _placeholder;
		
		this.showPlaceholder();
			
	}//setPlaceholder

	
	AbstractTextInput.prototype.setPlaceholderColor = function(_placeholderColor){
			
		this.placeholderColor = _placeholderColor;
		this.showPlaceholder();
			
	}//setPlaceholderColor

	
	AbstractTextInput.prototype.showPlaceholder = function(){
			
		if(this.text == 0){
			
			this.html.value = this.placeholder;
			this.html.style.color = this.placeholderColor.toCssString();
			
		}
			
	}//showPlaceholder
	
	
	AbstractTextInput.prototype.hidePlaceholder = function(){
			
		this.html.value = this.text;
		this.html.style.color = this.textColor.toCssString();
			
	}//hidePlaceholder
	

})();