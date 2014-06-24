
(function(){
	
	up.TextArea = TextArea;
	up.extend(up.AbstractTextInput , up.TextArea);
	
	function TextArea(_tag){
		
		if(_tag==null) _tag='textarea';
		
		up.AbstractTextInput.prototype.constructor.call(this, _tag);		
		
	}//constructor

})();