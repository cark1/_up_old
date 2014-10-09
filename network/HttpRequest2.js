
(function(){

	up.HttpRequest2 = HttpRequest2;
	
	//methods
	up.HttpRequest2.GET = "GET";
	up.HttpRequest2.POST = "POST";
	up.HttpRequest2.PUT = "PUT";
	up.HttpRequest2.DELETE = "DELETE";
	
	//response type
	up.HttpRequest2.ARRAYBUFFER = "ARRAYBUFFER";
	up.HttpRequest2.BLOB = "BLOB";
	up.HttpRequest2.DOCUMENT = "DOCUMENT";
	up.HttpRequest2.JSON = "JSON";
	up.HttpRequest2.TEXT = "TEXT";
	
	
	function HttpRequest2(){
		
		this.url = null;
		this.method = up.HttpRequest2.GET;
		this.isAsynchronous = true;
		this.responseType = up.HttpRequest2.JSON;
		this.filesEnabled = false;
		
		this.headers = new Array();
		
		this.urlParams = new Array();
		this.bodyParams = new Array();
		
		this.username = null;
		this.password = null;
		this.authorizationBase64=null;
	
		this.xmlHttpRequest = new XMLHttpRequest();
		
	}//constructor
	
	
	HttpRequest2.prototype.setUrl = function(_url){
			
		this.url = _url;
			
	}//setUrl
	
	
	HttpRequest2.prototype.setMethod = function(_method){
			
		this.method = _method;
			
	}//setMethod
	
	
	HttpRequest2.prototype.setAsynchronous = function(_isAsynchronous){
			
		this.isAsynchronous = _isAsynchronous;
			
	}//setAsynchronous
	
	
	HttpRequest2.prototype.setFilesEnabled = function(_filesEnabled){
		
		//if filesEnabled is true, the request send a formData, with multipart/form-data mimetype
		//with php the multipart/form-data mimetype dosn't support the PUT method (params are not sent)
		this.filesEnabled = _filesEnabled;
			
	}//setFilesEnabled
	
	
	HttpRequest2.prototype.setResponseType = function(_responseType){
			
		this.responseType = _responseType;
			
	}//setResponseType
	
	
	HttpRequest2.prototype.setHeader = function(_key, _value){
		
		this.headers[_key] = _value;
			
	}//setHeader
	
	
	HttpRequest2.prototype.setUrlParam = function(key, value){
			
		this.urlParams[key] = value;
			
	}//setUrlParam
	
	
	HttpRequest2.prototype.setBodyParam = function(key, value){
		
		this.bodyParams[key] = value;
			
	}//setBodyParam
	
	
	HttpRequest2.prototype.setUsernameAndPassword = function(_username, _password){
			
		this.username = _username;
		this.password = _password;
			
	}//setUsernameAndPassword
	
	
	HttpRequest2.prototype.addEventListener = function(_type, _listener, _functionName){
		
		var request = this;
		
		var listenerClosure = function(_event){
			
			var response = new up.HttpResponse2(request.xmlHttpRequest);
			_listener[_functionName](response, request, _event);
				
		}
		
		this.xmlHttpRequest.addEventListener(_type, listenerClosure, false);
		
		return listenerClosure;
			
	}//addEventListener
	
	
	HttpRequest2.prototype.removeEventListener = function(_type, _listenerClosure){
			
		this.xmlHttpRequest.removeEventListener(_type, _listenerClosure, false);
			
	}//removeEventListener
	
	
	HttpRequest2.prototype.send = function(){
		
		// 1. prepare url params
		
		var urlParamsString = '';
		
		for(var key in this.urlParams){
			
			if(urlParamsString.length>0) urlParamsString += '&';
			
			if(this.urlParams[key]==null){
				urlParamsString+= key+"=";
			}else{
				urlParamsString+= key+"="+encodeURIComponent(this.urlParams[key]);
			}
		
		}
		
		// 2. open connection
		
		this.xmlHttpRequest.open(this.method, this.url+'?'+urlParamsString, this.isAsynchronous);
		
		// 3. set header
		
		for(var key in this.headers){
			
			this.xmlHttpRequest.setRequestHeader(key,this.headers[key]);
			
		}
		
		// set authorization header
		
		if(this.username!=null || this.password!=null){
				this.xmlHttpRequest.setRequestHeader('Authorization','Basic '+encodeBase64(this.username+':'+this.password));
		}
		
		// 4. prepare body
		
		var bodyString='';
		var formData = new FormData();
		
		if(this.filesEnabled == false){
			
			for(var key in this.bodyParams){
			
				if(bodyString.length>0) bodyString += '&';
				
				if(this.bodyParams[key]==null){
					bodyString+= key+"=";
				}else{
					bodyString+= key+"="+encodeURIComponent(this.bodyParams[key]);
				}
				
			}
		
		}else{
			
			for(var key in this.bodyParams){
			
				formData.append(key, this.bodyParams[key]);
		
			}
			
		}
		
		// 5. send request
		
		if(this.filesEnabled == false){
			
			this.xmlHttpRequest.send(bodyString);
			
		}else{
			
			this.xmlHttpRequest.send(formData);
			
		}
			
	}//send
	
	
	
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