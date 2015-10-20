(function($){
	
	$.fn.scrollcallback = function(v){
		var options = {
				context:window
			};
		switch(typeof(v)){
			case 'function':
				options = $.extend(options,{inHandler:v});
				break;
			case 'object':
				if(v.inHandler || v.outHandler){
					options = $.extend(options,v);
					break;
				};
			default:
				return false;
		};
		return new scrollcallback(this,options.inHandler,options.outHandler,options.context);
	};
	
	function scrollcallback(element,inHandler,outHandler,context){
		var ar = []
			,$context = context ? $(context) : $(window)
			,lastScrollPos = {left:0,top:0}
			,direction = function(){
				var res
					,scrollLeft = $context.scrollLeft()
					,scrollTop = $context.scrollTop();
				switch(true){
					case scrollTop > lastScrollPos.top:
						res = 'down'; break;
					case scrollTop < lastScrollPos.top:
						res = 'up'; break;
					case scrollLeft > lastScrollPos.left:
						res = 'right'; break;
					case scrollLeft < lastScrollPos.left:
						res = 'left'; break;
				};
				lastScrollPos.left = scrollLeft;
				lastScrollPos.top = scrollTop;
				return res;
			};

		$(element).each(function(){
			ar.push(new spoint(this,inHandler,outHandler,context));
		});

		$context.scroll(function(){
			var d = direction();
			for(var i = 0,l = ar.length; i < l; i++)
				ar[i].handler(d);
		}).scroll();
	};
	
	function spoint(e,inHandler,outHandler,context){
		this.charged = false;
		this.$e = $(e);
		this.$context = context && !$.isWindow(context) ? this.$e.parents(context) : $(window)
		this.onIn = function(direction){
			if(!this.charged && typeof(inHandler) == 'function')
				inHandler(this.$e.get(0),direction);
			this.charged = true;
		};
		this.onOut = function(direction){
			if(this.charged && typeof(outHandler) == 'function')
				outHandler(this.$e.get(0),direction);
			this.charged = false;
		};
	};
	
	spoint.prototype.offset = function($e){
		var res = {left:0,top:0},offset;
		do{
			offset = $e.offset();
			res.left += offset.left;
			res.top += offset.top;
			$e = $e.offsetParent();
		}while(!$e.prop('tagName').toLowerCase() == 'body');
		return res;
	};
	
	spoint.prototype.visible = function(){
		var $c = this.$context,offset = this.offset(this.$e);
		if(!$.isWindow(this.$context.get(0))){
			var offsetContext = this.offset(this.$context);
			offset.left -= offsetContext.left - this.$context.scrollLeft();
			offset.top -= offsetContext.top - this.$context.scrollTop();
		};
		return ($c.scrollLeft() + $c.width() > offset.left && $c.scrollLeft() < offset.left + this.$e.width())
			&& ($c.scrollTop() + $c.height() > offset.top && $c.scrollTop() < offset.top + this.$e.height());
	};
	
	spoint.prototype.handler = function(direction){
		if(this.visible())
			this.onIn(direction);
		else this.onOut(direction);
	};

}(jQuery));