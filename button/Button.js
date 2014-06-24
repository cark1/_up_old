
(function(){
	
	up.Button = Button;
	up.extend(up.TextView , up.Button);
	
	function Button(_tag){
		
		if(_tag==null) _tag='button';
		
		up.TextView.prototype.constructor.call(this, _tag);
		
	}//constructor
	
	
	//overridden
	Button.prototype.doStyle = function(){
			
		up.TextView.prototype.doStyle.call(this);

		this.setCursor(new up.Cursor(up.Cursor.POINTER));

	}//doStyle
	

})();