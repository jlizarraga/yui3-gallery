YUI.add("gallery-yui-tooltip",function(b){var a=function(c){a.superclass.constructor.apply(this,arguments);};a.NAME="Tooltip";a.ATTRS={hideTimer:{value:0.5},resetOnHover:{value:true},alignment:{value:"top"},distance:{value:10},move:{value:10},duration:{value:0.15},easing:{value:"ease-out"},visible:{value:false},zIndex:{value:30000},_timeoutID:{value:null},_tooltipID:{value:null},_alignmentMap:{value:{"top":[b.WidgetPositionAlign.BC,b.WidgetPositionAlign.TC],"right":[b.WidgetPositionAlign.LC,b.WidgetPositionAlign.RC],"bottom":[b.WidgetPositionAlign.TC,b.WidgetPositionAlign.BC],"left":[b.WidgetPositionAlign.RC,b.WidgetPositionAlign.LC]}},_currentAlignment:{value:null}};b.extend(a,b.Overlay,{hide:function(){this.fire("hide");return this;},reset:function(){this.fire("reset");return this;},show:function(c){this.fire("show",c);return this;},timeout:function(){this.fire("timeout");return this;},tip:function(c){var e=c.getAttribute("tooltip"),g=c.getAttribute("tooltip:alignment")||this.get("alignment"),d=this.get("_currentAlignment"),f=this.get("distance"),h=this.get("move"),i={"top":"auto","right":"auto","bottom":"auto","left":"auto"};i[g]="-"+(f+h)+"px";this.set("_tooltipID",c.get("id"));this.setStdModContent(b.WidgetStdMod.BODY,e);this.get("contentBox").setStyles(i);this.set("visible",true);this._setAlignment(c,g);this.show(true);},_handleMouseEnter:function(g){var c=g.target,h=this.get("contentBox"),f=false,d=this;if(c.ancestor("."+this.getClassName(),true)){this.reset();}else{c=c.ancestor("*[tooltip]",true);if(c.get("id")===this.get("_tooltipID")){this.set("visible",true);this._setAlignment(c,this.get("_currentAlignment"));this.show();}else{if(h.getStyle("opacity")>0){h.transition({duration:this.get("duration"),easing:this.get("easing"),opacity:0},function(){f=true;d.tip(c);});window.setTimeout(function(){if(!f){d.tip(c);}},(this.get("duration")*1000+50));}else{this.tip(c);}}}},_handleMouseLeave:function(c){this.timeout();},_hide:function(d){var c=this;this.reset();this.get("contentBox").transition({duration:this.get("duration"),easing:this.get("easing"),opacity:0},function(){c.set("visible",false);});},_reset:function(){window.clearTimeout(this.get("_timeoutID"));this.set("_timeoutID",null);},_setAlignment:function(c,d){this.get("contentBox").replaceClass(this.getClassName("align",this.get("_currentAlignment")),this.getClassName("align",d));this.set("_currentAlignment",d);this.set("align",{node:c,points:this.get("_alignmentMap")[d]});},_show:function(m,d){var l=this.get("_currentAlignment"),h=this.get("distance"),c=this.get("move"),j=this.get("contentBox"),f={duration:this.get("duration"),easing:this.get("easing"),opacity:1},k={"top":"auto","right":"auto","bottom":"auto","left":"auto"},g;this.reset();this.set("visible",true);if(d||j.getStyle("opacity")<0.1){k[l]="-"+(h+c)+"px";f[l]="-"+h+"px";j.setStyles(k);}j.transition(f);},_timeout:function(){var c=this;if(b.Lang.isNull(this.get("_timeoutID"))){this.set("_timeoutID",window.setTimeout(function(){c.hide();},parseInt(this.get("hideTimer")*1000,10)));}},renderUI:function(){this.setStdModContent(b.WidgetStdMod.BODY,"");this.setStdModContent(b.WidgetStdMod.FOOTER,"<div></div>");},bindUI:function(){var e=["hide","show","timeout","reset"],f=b.all("*[tooltip]"),c=this.get("resetOnHover"),d;for(d=0;d<e.length;d++){this.publish(e[d],{defaultFn:this["_"+e[d]]});}if(c){f=f.concat(this.get("contentBox"));}f.on("mouseenter",this._handleMouseEnter,this);if(!c){f=f.concat(this.get("contentBox"));}f.on("mouseleave",this._handleMouseLeave,this);},syncUI:function(){var c=this.get("_currentAlignment");this.get("contentBox").setStyle("opacity",0).addClass(this.getClassName("align",c)).setStyle(c,"-"+(this.get("distance")+this.get("move"))+"px");},initializer:function(){this.set("_currentAlignment",this.get("alignment"));}});b.Tooltip=a;},"gallery-2011.09.28-20-06",{requires:["selector-css3","overlay","transition","event-mouseenter"]});
