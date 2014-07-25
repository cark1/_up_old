
(function(){

	up.Cookie = Cookie;
	
	function Cookie(name){
		
		this.name = name;
		
	}//constructor
	
	
	Cookie.prototype.write = function(value,life){//life in seconds
		
		if(life){
			var date = new Date();
			date.setTime(date.getTime()+(life*1000));
			var expires = "; expires="+date.toGMTString();
		}else{
			var expires = "";
		}
		
		document.cookie = this.name+"="+value+expires+"; path=/";
			
	}//write
	
	
	Cookie.prototype.read = function(){
			
		if(document.cookie.length > 0){

			var start = document.cookie.indexOf(this.name + "=");

			if(start != -1){

				start = start + this.name.length + 1;
				var end = document.cookie.indexOf(";",start);

				if (end == -1){
					end = document.cookie.length;
				}
				
				return document.cookie.substring(start,end);

			}else{	
				return null;
			}
			
		}
		
		return null;
			
	}//read
	
	
	Cookie.prototype.delete_ = function(){
			
		this.write('',-1);
			
	}//delete_
	
})();