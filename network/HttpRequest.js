
(function(){

	up.HttpRequest = HttpRequest;
	
	function HttpRequest(){
		
		this.url='';
		this.method='get';
		this.async=true;
		this.username=null;
		this.password=null;
		this.authorizationBase64=null;
		this.headers = new Array();
		this.urlParams = new Array();
		this.bodyParams = new Array();
		
		this.xmlhttp=new XMLHttpRequest();
		
		var that = this;
		this.xmlhttp.onreadystatechange = function(){

			that.manageStateChanges(this.readyState);

		};
		
		this.setHeader('Content-Type','application/x-www-form-urlencoded');
		this.setHeader('pragma','no-cache');
		
	}//constructor
	
	
	HttpRequest.prototype.manageStateChanges = function(state){
		
		switch(state){

		case 0:
			this.onUnset();
			break;

		case 1:
			this.onOpened();
			break;

		case 2:
			this.onHeadersReceived();
			break;

		case 3:
			this.onLoading();
			break;

		case 4:
			this.onDone(new up.HttpResponse(this.xmlhttp));
			break;

		}
			
	}//manageStateChanges
	
	
	HttpRequest.prototype.setHeader = function(key,value){
			
		this.headers[key] = value;
			
	}//setHeader
	
	
	HttpRequest.prototype.addUrlParam = function(key, value){
			
		this.urlParams[key] = encodeURIComponent(value);
			
	}//addUrlParam
	
	
	HttpRequest.prototype.addBodyParam = function(key, value){
			
		this.bodyParams[key] = encodeURIComponent(value);
			
	}//addBodyParam
	
	
	HttpRequest.prototype.send = function(){
		
		// 1. prepare url params
		
		var urlParamsString = '';
		
		for(var key in this.urlParams){
			
			if(urlParamsString.length>0) urlParamsString += '&';
			
			urlParamsString+= key+"="+this.urlParams[key];
		
		}
		
		// 2. open connection
		
		this.xmlhttp.open(this.method, this.url+'?'+urlParamsString, this.async);
		
		// 3. set header
		
		for(var key in this.headers){
			
			this.xmlhttp.setRequestHeader(key,this.headers[key]);
			
		}
		
		// set authorization header
		
		if(this.username!=null || this.password!=null){
				this.xmlhttp.setRequestHeader('Authorization','Basic '+encodeBase64(this.username+':'+this.password));
		}
		
		// 4. prepare body
		
		var bodyString='';
		
		for(var key in this.bodyParams){
			
			if(bodyString.length>0) bodyString += '&';
			
			bodyString+= key+"="+this.bodyParams[key];
		
		}
		
		// 5. send request
		
		this.xmlhttp.send(bodyString);
			
	}//send
	
	
	HttpRequest.prototype.abort = function(){
			
		this.xmlhttp.abort();
			
	}//abort
	
	
	HttpRequest.prototype.onUnset = function(){}//onUninitialized
	
	
	HttpRequest.prototype.onOpened = function(){}//onOpened
	
	
	HttpRequest.prototype.onHeadersReceived = function(){}//onHeadersReceived
	
	
	HttpRequest.prototype.onLoading = function(){}//onLoading
	
	
	HttpRequest.prototype.onDone = function(response){}//onDone
	
	
	
	//private
	function encodeBase64(str){
		
		var chr1, chr2, chr3, rez = '', arr = [], i = 0, j = 0, code = 0;
		
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');

		while(code = str.charCodeAt(j++)){
			
			if(code < 128){
				arr[arr.length] = code;
			}
			else if(code < 2048){
				arr[arr.length] = 192 | (code >> 6);
				arr[arr.length] = 128 | (code & 63);
			}
			else if(code < 65536){
				arr[arr.length] = 224 | (code >> 12);
				arr[arr.length] = 128 | ((code >> 6) & 63);
				arr[arr.length] = 128 | (code & 63);
			}
			else{
				arr[arr.length] = 240 | (code >> 18);
				arr[arr.length] = 128 | ((code >> 12) & 63);
				arr[arr.length] = 128 | ((code >> 6) & 63);
				arr[arr.length] = 128 | (code & 63);
			}
			
		};

		while(i < arr.length){
			
			chr1 = arr[i++];
			chr2 = arr[i++];
			chr3 = arr[i++];

			rez += chars[chr1 >> 2];
			rez += chars[((chr1 & 3) << 4) | (chr2 >> 4)];
			rez += chars[chr2 === undefined ? 64 : ((chr2 & 15) << 2) | (chr3 >> 6)];
			rez += chars[chr3 === undefined ? 64 : chr3 & 63];
			
		}
		
		return rez;
	
	}//encodeBase64


})();