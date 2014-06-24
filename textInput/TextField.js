
(function(){
	
	up.TextField = TextField;
	up.extend(up.AbstractTextInput , up.TextField);
	
	function TextField(_tag){
		
		if(_tag==null) _tag='input';
		
		up.AbstractTextInput.prototype.constructor.call(this, _tag);
		
		this.html.type = 'text';
		this.passwordMode = false;
		
	}//constructor
	
	
	TextField.prototype.setPasswordMode = function(_passwordMode){
		
		this.passwordMode = _passwordMode;
			
		if(this.passwordMode){
			
			this.html.type = 'password';
			
		}else{
			
			this.html.type = 'text';
			
		}
		
		this.showPlaceholder();
			
	}//setPasswordMode


	//overridden
	TextField.prototype.showPlaceholder = function(){
			
		up.AbstractTextInput.prototype.showPlaceholder.call(this);
		
		if(this.text == 0 && this.passwordMode){
			
			this.html.type = 'text';
			
		}
	
	}//showPlaceholder
	
	
	//overridden
	TextField.prototype.hidePlaceholder = function(){
			
		up.AbstractTextInput.prototype.hidePlaceholder.call(this);
		
		if(this.passwordMode){
			
			this.html.type = 'password';
			
		}

	}//hidePlaceholder
	

})();