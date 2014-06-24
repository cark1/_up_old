
(function(){

	up.Cursor = Cursor;
	
	up.Cursor.URL = "url";
	up.Cursor.AUTO = "auto";
	up.Cursor.CROSSHAIR = "crosshair";
	up.Cursor.DEFAULT = "default";
	up.Cursor.E_RESIZE = "e-resize";
	up.Cursor.HELP = "help";
	up.Cursor.MOVE = "move";
	up.Cursor.N_RESIZE = "n-resize";
	up.Cursor.NE_RESIZE = "ne-resize";
	up.Cursor.NW_RESIZE = "nw-resize";
	up.Cursor.POINTER = "pointer";
	up.Cursor.PROGRESS = "progress";
	up.Cursor.S_RESIZE = "s-resize";
	up.Cursor.SE_RESIZE = "se-resize";
	up.Cursor.SW_RESIZE = "sw-resize";
	up.Cursor.TEXT = "text";
	up.Cursor.W_RESIZE = "w-resize";
	up.Cursor.WAIT = "wait";
	up.Cursor.INHERIT = "inherit";
	
	
	function Cursor(_type, _image){

		this.type = up.Cursor.AUTO;
		this.image = null;
		
		if(_type!=null) this.type = _type;
		if(_image!=null && this.type == up.Cursor.URL) this.image = _image;
		
	}//constructor
	
	
	Cursor.prototype.toCssString = function(){
		
		if(this.image != null){
			
			return "url('"+this.image+"'), auto";
			
		}else{
			
			return this.type;
			
		}
			
	}//toCssString

})();