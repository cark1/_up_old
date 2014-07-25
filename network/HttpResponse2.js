
(function(){

	up.HttpResponse2 = HttpResponse2;
	
	function HttpResponse2(_xmlHttpRequest){
		
		this.status = _xmlHttpRequest.status;
		this.statusText = _xmlHttpRequest.statusText;
		this.responseUrl = _xmlHttpRequest.responseURL;
		
		this.headers = _xmlHttpRequest.getAllResponseHeaders();
		
		this.responseType = _xmlHttpRequest.responseType;
		this.body = _xmlHttpRequest.response;
		this.bodyText = _xmlHttpRequest.responseText;
		this.bodyXml = _xmlHttpRequest.responseXML;
		
	}//constructor
	
	
	HttpResponse2.prototype.getHeader = function(_key){
			
		return this.headers[key];
			
	}//getHeader
	

})();