
(function(){
	
	up.View = View;
	
	function View(_tag){
		
		if(_tag==null) _tag='div';
		
		this.html = document.createElement(_tag);
		this.html.style.position = 'absolute';
		
		//views
		
		this.id = null;
		this.parentView = null;
		this.childViews = Array();
		
		//layout
		
		this.layouts = new Array();
		this.currentLayout = null;
		this.currentRatioW = 0;
		this.currentRatioH = 0;
		
		//frame	
		
		this.frame = new up.Rect();
		this.borderTop = new up.Border();
		this.borderRight = new up.Border();
		this.borderBottom = new up.Border();
		this.borderLeft = new up.Border();
		
		//style
		
		this.isVisible = true;
		this.backgroundColor = new up.Color();
		this.isScrollableHorizontally = false;
		this.isScrollableVertically = false;
		this.cursor = new up.Cursor();
		this.opacity = 1.0;
		this.shadow = new up.Shadow();
		this.borderRadius = new up.BorderRadius();
		
	}//constructor
	
//views
	
	View.prototype.setId = function(_id){
			
		this.id = _id;
		this.html.id = _id;
			
	}//setId
	
	
	View.prototype.addView = function(_view){
		
		_view.parentView = this;	
		this.childViews.push(_view);
		this.html.appendChild(_view.html);
		
		_view.doStyle();
	
	}//addView
	
	
	View.prototype.removeView = function(_view){
		
		var index = this.childViews.indexOf(_view);
		
		if(index>=0){
			
			_view.parentView = null;
			this.childViews.splice(index,1);
			this.html.removeChild(_view.html);
		
		}
		
	}//removeView
	
	
	View.prototype.removeAllViews = function(){
		
		while(this.childViews.length > 0){
			
			this.removeView(this.childViews[0]);
			
		}
			
	}//removeAllViews

//layout

	View.prototype.registerLayout = function(_layout){

		this.layouts.push(_layout);

	}//registerLayout


	View.prototype.doLayout = function(_parentLayout){
		
		this.chooseLayout(_parentLayout);
		
		var i = this.childViews.length;
		while(i--){
			this.childViews[i].doLayout(this.currentLayout);
		}
		
		//it's very important that when the view calls doLayout, his children have just choosed their layout. 
		//In this way it's possible to set children's size properties, in the parent overwritten doLayout. 
		
		if(this.layouts.length > 0){
			this["doLayout_"+this.currentLayout.width+"_"+this.currentLayout.height](this.currentRatioW, this.currentRatioH);
		}

	}//doLayout


	View.prototype.chooseLayout = function(_parentLayout){

		var screenWidth = document.documentElement.clientWidth;
		var screenHeight = document.documentElement.clientHeight;
		var screenRatio = screenWidth/screenHeight;

		var bestLayout = _parentLayout;
		var bestDelta = -1;

		for(var i in this.layouts){

			var delta = Math.abs(this.layouts[i].ratio - screenRatio);

			if(bestDelta == -1 || delta < bestDelta){

				bestLayout = this.layouts[i];
				bestDelta = delta;

			}

		}

		this.currentLayout = bestLayout;
		this.currentRatioW = screenWidth / bestLayout.width;
		this.currentRatioH = screenHeight / bestLayout.height;

	}//chooseLayout
	
//frame	
	
	View.prototype.setX = function(_x, _fixed){
		
		if(this.currentRatioW == 0 && this.parentView == null) return;

		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;
		
		this.frame.x = Math.round(_x*ratioW);
		this.html.style.left = this.frame.x+'px';
		
		return this;
		
	}//setX
	
	
	View.prototype.setY = function(_y, _fixed){
		
		if(this.currentRatioH == 0 && this.parentView == null) return;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;
		
		this.frame.y = Math.round(_y*ratioH);
		this.html.style.top = this.frame.y+'px';
		
		return this;
			
	}//setY


	View.prototype.setWidth = function(_width, _fixed){
		
		if(this.currentRatioW == 0 && this.parentView == null) return;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;
		
		this.frame.width = Math.round(_width*ratioW);
		this.html.style.width = this.frame.width+'px';
		
		return this;

	}//setWidth

	
	View.prototype.setHeight = function(_height, _fixed){
		
		if(this.currentRatioH == null && this.parentView == null) return;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;
		
		this.frame.height = Math.round(_height*ratioH);
		this.html.style.height = this.frame.height+'px';
		
		return this;
		
	}//setHeight
		
	
	View.prototype.setPosition = function(_x, _y, _fixed){
		
		this.setX(_x, _fixed);
		this.setY(_y, _fixed);
		
		return this;
		
	}//setPosition
	
	
	View.prototype.setSize = function(_width, _height, _fixed){
		
		this.setWidth(_width, _fixed);
		this.setHeight(_height, _fixed);
		
		return this;
		
	}//setSize
	
	
	View.prototype.setFrame = function(_x, _y, _width, _height, _fixed){
		
		this.setPosition(_x, _y, _fixed);
		this.setSize(_width, _height, _fixed);
		
		return this;
		
	}//setFrame

//border

	View.prototype.setBorder = function(_border, _fixed){

		this.setBorderTop(new up.Border(_border.width, _border.color, _border.style), _fixed);
		this.setBorderRight(new up.Border(_border.width, _border.color, _border.style), _fixed);
		this.setBorderBottom(new up.Border(_border.width, _border.color, _border.style), _fixed);
		this.setBorderLeft(new up.Border(_border.width, _border.color, _border.style), _fixed);

	}//setBorder


	View.prototype.setBorderTop = function(_border, _fixed){

		if(this.currentRatioH == 0 && this.parentView == null) return;

		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		this.borderTop = _border;
		this.borderTop.width = Math.ceil(this.borderTop.width*ratioH);
		this.html.style.borderTop = this.borderTop.toCssString();

	}//setBorderTop


	View.prototype.setBorderRight = function(_border, _fixed){

		if(this.currentRatioW == 0 && this.parentView == null) return;

		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		this.borderRight = _border;
		this.borderRight.width = Math.ceil(this.borderRight.width*ratioW);
		this.html.style.borderRight = this.borderRight.toCssString();

	}//setBorderRight


	View.prototype.setBorderBottom = function(_border, _fixed){

		if(this.currentRatioH == 0 && this.parentView == null) return;

		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		this.borderBottom = _border;
		this.borderBottom.width = Math.ceil(this.borderBottom.width*ratioH);
		this.html.style.borderBottom = this.borderBottom.toCssString();

	}//setBorderBottom


	View.prototype.setBorderLeft = function(_border, _fixed){

		if(this.currentRatioW == 0 && this.parentView == null) return;

		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		this.borderLeft = _border;
		this.borderLeft.width = Math.ceil(this.borderLeft.width*ratioW);
		this.html.style.borderLeft = this.borderLeft.toCssString();

	}//setBorderLeft

//align

	View.prototype.alignTop = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		if(_relView != null){

			this.setY(_relView.frame.y + _distance*ratioH , true);

		}else if(this.parentView != null){

			this.setY(_distance*ratioH, true);

		}

		return this;

	}//alignTop


	View.prototype.alignRight = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		if(_relView != null){

			this.setX(_relView.frame.x + _relView.frame.width - this.frame.width + _distance*ratioW , true);

		}else if(this.parentView != null){

			this.setX(this.parentView.frame.width - this.frame.width + _distance*ratioW , true);

		}

		return this;

	}//alignRight


	View.prototype.alignBottom = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		if(_relView != null){

			this.setY(_relView.frame.y + _relView.frame.height - this.frame.height +  _distance*ratioH , true);

		}else if(this.parentView != null){

			this.setY(this.parentView.frame.height - this.frame.height + _distance*ratioH , true);

		}

		return this;

	}//alignBottom


	View.prototype.alignLeft = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		if(_relView != null){

			this.setX(_relView.frame.x + _distance*ratioW , true);

		}else if(this.parentView != null){

			this.setX(_distance*ratioW , true);

		}

		return this;

	}//alignLeft

//position

	View.prototype.top = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		this.setY(_relView.frame.y - this.frame.height + _distance*ratioH , true);

		return this;

	}//top


	View.prototype.right = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		this.setX(_relView.frame.x + _relView.frame.width + _distance*ratioW , true);

		return this;

	}//right


	View.prototype.bottom = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		this.setY(_relView.frame.y + _relView.frame.height + _distance*ratioH , true);

		return this;

	}//bottom


	View.prototype.left = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		this.setX(_relView.frame.x - this.frame.width + _distance*ratioW , true);

		return this;

	}//left

//center	

	View.prototype.centerHorizontal = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioW = this.currentRatioW;
		if(ratioW == 0) ratioW = this.parentView.currentRatioW;
		if(_fixed) ratioW = 1;

		if(_relView != null){

			this.setX( _relView.frame.x + (_relView.frame.width/2) - (this.frame.width/2) + _distance*ratioW , true);

		}else if(this.parentView != null){

			this.setX( (this.parentView.frame.width/2) - (this.frame.width/2) + _distance*ratioW , true);

		}

		return this;

	}//centerHorizontal


	View.prototype.centerVertical = function(_relView, _distance, _fixed){

		if(_distance == null) _distance = 0;
		
		var ratioH = this.currentRatioH;
		if(ratioH == 0) ratioH = this.parentView.currentRatioH;
		if(_fixed) ratioH = 1;

		if(_relView != null){

			this.setY( _relView.frame.y + (_relView.frame.height/2) - (this.frame.height/2) + _distance*ratioH , true);

		}else if(this.parentView != null){

			this.setY( (this.parentView.frame.height/2) - (this.frame.height/2) + _distance*ratioH , true);

		}

		return this;

	}//centerVertical

//copy

	View.prototype.copyFrameFrom = function(_relView){
		
		this.setFrame(_relView.frame.x, _relView.frame.y, _relView.frame.width, _relView.frame.height, true);
		
		return this;
		
	}//copyFrameFrom

//events
	
	View.prototype.addEventListener = function(_type, _listener, _functionName, _firstThisThenChild, _onlyIfIsTarget){
		
		if(_firstThisThenChild == null) _firstThisThenChild = false;
		if(_onlyIfIsTarget == null) _onlyIfIsTarget = false;
		
		var listenerClosure = (function closure(_thisView){

			return function(e){
				
				if(e.target == this || _onlyIfIsTarget){
					_listener[_functionName](_thisView, e);
				}
				
			}

		})(this);
			
		this.html.addEventListener(_type, listenerClosure, _firstThisThenChild); 
		
		return listenerClosure;
			
	}//addEventListener
	
	
	View.prototype.removeEventListener = function(_type, _listenerClosure, _firstThisThenChild){
		
		if(_firstThisThenChild == null) _firstThisThenChild = false;
		
		this.html.removeEventListener(_type, _listenerClosure, _firstThisThenChild); 
			
	}//removeEventListener
	
//style

	View.prototype.doStyle = function(){
		
		this.setScrollable(false, false);
			
	}//doStyle

	
	View.prototype.setVisible = function(_isVisible){
		
		this.isVisible = _isVisible;
		
		if(this.isVisible == true){
			this.html.style.display = 'block';
		}else{
			this.html.style.display = 'none';
		}
			
	}//setVisible
	
	
	View.prototype.setBackgroundColor = function(_color){

		this.backgroundColor = _color;
		
		if(_color == null){
			
			this.html.style.backgroundColor = "transparent";
			
		}else{
			
			this.html.style.backgroundColor = this.backgroundColor.toCssString();
			
		}

	}//setBackgroundColor
	
	
	View.prototype.setScrollable = function(_isScrollableHorizontally, _isScrollableVertically){
		
		this.isScrollableHorizontally = _isScrollableHorizontally;
		this.isScrollableVertically = _isScrollableVertically;
		
		if(this.isScrollableHorizontally == true){
			this.html.style.overflowX = 'auto';
		}else{
			this.html.style.overflowX = 'hidden';
		}
		
		if(this.isScrollableVertically == true){
			this.html.style.overflowY = 'auto';
		}else{
			this.html.style.overflowY = 'hidden';
		}
		
	}//setScrollable
	
	
	View.prototype.setCursor = function(_cursor){
		
		this.cursor = _cursor;
	
		this.html.style.cursor = this.cursor.toCssString();
			
	}//setCursor
	
	
	View.prototype.setOpacity = function(_opacity){
			
		this.opacity = _opacity;
		
		this.html.style.opacity = this.opacity;
			
	}//setOpacity
	
	
	View.prototype.setShadow = function(_shadow){
		
		this.shadow = _shadow;
		
		if(_shadow == null){
			
			this.html.style.boxShadow = "";
			
		}else{
			
			this.html.style.boxShadow = this.shadow.toCssString();
			
		}
			
	}//setShadow
	
	
	View.prototype.setBorderRadius = function(_borderRadius){
			
		this.borderRadius = _borderRadius;
		
		if(_borderRadius == null){
			
			this.html.style.borderRadius = "";
			
		}else{
			
			this.html.style.borderRadius = this.borderRadius.toCssString();
			
		}
			
	}//setBorderRadius
	

})();