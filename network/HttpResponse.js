
(function(){

	up.HttpResponse = HttpResponse;
	
	function HttpResponse(xmlhttp){
		
		this.xmlhttp = xmlhttp;
		
		this.status = this.xmlhttp.status;
		this.statusText = this.xmlhttp.statusText;
		
		if(this.xmlhttp.responseText!=null){
			this.body=this.xmlhttp.responseText;
		}else{
			this.xml=this.xmlhttp.responseXML;	
		}
		
	}//constructor
	
	
	HttpResponse.prototype.getHeader = function(key){
			
		return this.xmlhttp.getResponseHeader(key);
			
	}//getHeader


})();