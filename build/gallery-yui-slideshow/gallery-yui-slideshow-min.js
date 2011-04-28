YUI.add("gallery-yui-slideshow",function(b){var a=function(c){a.superclass.constructor.apply(this,arguments);};a.NAME="Slideshow";a.PRESETS={fade:{slideIn:{before:{opacity:0},transition:{opacity:1}},slideOut:{before:{opacity:1},transition:{opacity:0}}},slideDown:{slideIn:{before:{bottom:"cH"},transition:{bottom:"0px"}},slideOut:{before:{bottom:"0px"},transition:{bottom:"-cH"}}},slideLeft:{slideIn:{before:{right:"-cW"},transition:{right:"0px"}},slideOut:{before:{right:"0px"},transition:{right:"cW"}}},slideUp:{slideIn:{before:{top:"cH"},transition:{top:"0px"}},slideOut:{before:{top:"0px"},transition:{top:"-cH"}}},slideRight:{slideIn:{before:{left:"-cW"},transition:{left:"0px"}},slideOut:{before:{left:"0px"},transition:{left:"cW"}}}};a.ATTRS={slides:{value:null},currentIndex:{value:0},previousButton:{value:null},nextButton:{value:null},pauseButton:{value:null},playButton:{value:null},pages:{value:null},interval:{value:4},autoplay:{value:true},pauseOnChange:{value:true},pauseOnHover:{value:true},duration:{value:0.5},easing:{value:"ease-out"},transition:{value:a.PRESETS.fade},transInBefore:{value:{visibility:"visible",zIndex:1}},transInAfter:{value:{zIndex:2}},transOutBefore:{value:{zIndex:2}},transOutAfter:{value:{visibility:"hidden",zIndex:-30000}},_timeoutID:{value:null},_isPaused:{value:true},_isHoverPaused:{value:false},_outgoingSlide:{value:null},_incomingSlide:{value:null}};b.extend(a,b.Widget,{next:function(){this.fire("next");return this;},pause:function(){this.fire("pause");return this;},play:function(){this.fire("play");return this;},previous:function(){this.fire("previous");return this;},slide:function(d){var c=this.get("currentIndex"),e=this.get("slides");this.set("_outgoingSlide",e.item(c));switch(d){case"next":if(c+1<e.size()){c++;}else{c=0;}break;case"previous":if(c-1>-1){c--;}else{c=e.size()-1;}break;default:if(d==c){return false;}else{c=parseInt(d,10);}break;}this.set("currentIndex",c);this.set("_incomingSlide",e.item(c));this.fire("slide");return this;},_checkCSSValue:function(c,d){switch(d){case"cW":case"containerWidth":return parseInt(this.get("contentBox").get("offsetWidth"),10)+"px";case"-cW":case"-containerWidth":return(parseInt(this.get("contentBox").get("offsetWidth"),10)*-1)+"px";case"cH":case"containerHeight":return parseInt(this.get("contentBox").get("offsetHeight"),10)+"px";case"-cH":case"-containerHeight":return(parseInt(this.get("contentBox").get("offsetHeight"),10)*-1)+"px";case"sW":case"slideWidth":return parseInt(c.get("offsetWidth"),10)+"px";case"-sW":case"-slideWidth":return(parseInt(c.get("offsetWidth"),10)*-1)+"px";case"sH":case"slideHeight":return parseInt(c.get("offsetHeight"),10)+"px";case"-sH":case"-slideHeight":return(parseInt(c.get("offsetHeight"),10)*-1)+"px";default:return d;}},_checkTransitionValues:function(c,f){var e={},d;for(d in f){if(d=="duration"||d=="easing"||d=="delay"){e[d]=f[d];}else{e[d]=this._checkCSSValue(c,f[d]);}}return e;},_handleMouseenter:function(c){if(!this.get("_isPaused")&&!this.get("_isHoverPaused")){this.fire("hoverpause");}},_handleMouseleave:function(c){if(this.get("_isHoverPaused")){this.fire("hoverplay");}},_handlePageClick:function(c){if(this.get("pauseOnChange")){this.pause();}c.target=c.target.ancestor("."+this.getClassName("page"));this.slide(this.get("pages").indexOf(c.target));},_hoverpause:function(c){if(!this.get("_isPaused")&&!this.get("_isHoverPaused")){this.pause();this.set("_isHoverPaused",true);}},_hoverplay:function(c){if(this.get("_isHoverPaused")){this.play();}},_next:function(c){if(this.get("pauseOnChange")){this.pause();}this.slide("next");},_pause:function(c){if(!this.get("_isPaused")){window.clearInterval(this.get("_timeoutID"));this.set("_isPaused",true);}},_play:function(c){if(this.get("_isPaused")){this.set("_isPaused",false);this.set("_isHoverPaused",false);this.fire("timeout");}},_previous:function(c){if(this.get("pauseOnChange")){this.pause();}this.slide("previous");},_setActivePage:function(){var c=this.get("pages");if(!b.Lang.isNull(c)){c.removeClass(this.getClassName("active"));c.item(this.get("currentIndex")).addClass(this.getClassName("active"));}},_setStyles:function(c,e){for(var d in e){if(e.hasOwnProperty(d)){c.setStyle(d,this._checkCSSValue(c,e[d]));}}},_slide:function(h){var d=this,g=this.get("transition"),c=this.get("_outgoingSlide"),f=this.get("_incomingSlide");if(b.Lang.isUndefined(g.slideOut.transition.duration)){g.slideOut.transition.duration=this.get("duration");}if(b.Lang.isUndefined(g.slideOut.transition.easing)){g.slideOut.transition.easing=this.get("easing");}if(b.Lang.isUndefined(g.slideIn.transition.duration)){g.slideIn.transition.duration=this.get("duration");}if(b.Lang.isUndefined(g.slideIn.transition.easing)){g.slideIn.transition.easing=this.get("easing");}this._setStyles(c,this.get("transOutBefore"));this._setStyles(f,this.get("transInBefore"));if(b.Lang.isObject(g.slideOut.before)){this._setStyles(c,g.slideOut.before);}if(b.Lang.isObject(g.slideIn.before)){this._setStyles(f,g.slideIn.before);}g.slideOut.transition=this._checkTransitionValues(c,g.slideOut.transition);g.slideIn.transition=this._checkTransitionValues(f,g.slideIn.transition);c.transition(g.slideOut.transition,function(){d._setStyles(c,d.get("transOutAfter"));if(b.Lang.isObject(g.slideOut.after)){d._setStyles(c,g.slideOut.after);}});f.transition(g.slideIn.transition,function(){d._setStyles(f,d.get("transInAfter"));if(b.Lang.isObject(g.slideIn.after)){d._setStyles(f,g.slideIn.after);}});this._setActivePage();},_timeout:function(d){var c=this,f=this.get("interval");if(b.Lang.isArray(f)){f=f[this.get("currentIndex")];}if(!this.get("_isPaused")&&!this.get("_isHoverPaused")){this.set("_timeoutID",window.setTimeout(function(){c.slide("next");c.fire("timeout");},parseInt(f*1000,10)));}},bindUI:function(){var d=["previous","next","pause","play"],f=this.get("pages"),c,e;this.publish("timeout",{defaultFn:this._timeout});this.publish("slide",{defaultFn:this._slide});this.publish("hoverpause",{defaultFn:this._hoverpause});
<<<<<<< HEAD
this.publish("hoverplay",{defaultFn:this._hoverplay});for(e=0;e<d.length;e++){this.publish(d[e],{defaultFn:this["_"+d[e]]});c=this.get(d[e]+"Button");if(!b.Lang.isNull(c)){b.on("click",this[d[e]],c,this);}}if(!b.Lang.isNull(f)){f.on("click",this._handlePageClick,this);}if(this.get("pauseOnHover")){this.get("contentBox").on("mouseenter",this._handleMouseenter,this);this.get("contentBox").on("mouseleave",this._handleMouseleave,this);}},syncUI:function(){var c=this,e=this.get("pages"),d=0;this.get("slides").each(function(f){d++;if(d>1){f.setStyles(c.get("transOutAfter"));}});if(!b.Lang.isNull(e)){e.addClass(this.getClassName("page"));}if(this.get("autoplay")){this.play();}},initializer:function(){this.set("slides",this.get("contentBox").get("children"));if(b.Lang.isString(this.get("pages"))){this.set("pages",b.all(this.get("pages")));}}});b.Slideshow=a;},"@VERSION@",{requires:["widget","transition","event-mouseenter"]});
=======
this.publish("hoverplay",{defaultFn:this._hoverplay});for(e=0;e<d.length;e++){this.publish(d[e],{defaultFn:this["_"+d[e]]});c=this.get(d[e]+"Button");if(!b.Lang.isNull(c)){b.on("click",this[d[e]],c,this);}}if(!b.Lang.isNull(f)){f.on("click",this._handlePageClick,this);}if(this.get("pauseOnHover")){this.get("contentBox").on("mouseenter",this._handleMouseenter,this);this.get("contentBox").on("mouseleave",this._handleMouseleave,this);}},syncUI:function(){var c=this,e=this.get("pages"),d=0;this.get("slides").each(function(f){d++;if(d>1){f.setStyles(c.get("transOutAfter"));}});if(!b.Lang.isNull(e)){e.addClass(this.getClassName("page"));}if(this.get("autoplay")){this.play();}},initializer:function(){this.set("slides",this.get("contentBox").get("children"));if(b.Lang.isString(this.get("pages"))){this.set("pages",b.all(this.get("pages")));}}});b.Slideshow=a;},"gallery-2011.04.20-13-04",{requires:["widget","transition","event-mouseenter"]});
>>>>>>> upstream/master
